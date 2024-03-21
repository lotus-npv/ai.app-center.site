import React, { useState, useEffect, useContext } from 'react';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
// import { TabMenu } from 'primereact/tabmenu';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';

import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button as ButtonRS
} from "reactstrap";
import classnames from "classnames";

import { Badge } from "reactstrap";
import { Badge as BadgePrime } from 'primereact/badge';

import DataContext from 'data/DataContext';

import DeleteModal from "components/Common/DeleteModal";
import ModalDatas from './ModalDatas'

import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getDispatchingCompanyAll, getAddressAll, getNationAll, getEmployeeAll } from "store/actions";

// The rule argument should be a string in the format "custom_[field]".
FilterService.register('custom_activity', (value, filters) => {
  const [from, to] = filters ?? [null, null];
  if (from === null && to === null) return true;
  if (from !== null && to === null) return from <= value;
  if (from === null && to !== null) return value <= to;
  return from <= value && value <= to;
});

const options = ['syndication','receiving_factory','dispatching_company'];
 
const TableDatas = (props) => {
  // data context
  const { vh, tog_fullscreen, isEdit, setIsEdit } = useContext(DataContext);

  // Khai bao du lieu
  const dispatch = useDispatch();

  const {  employeeData, loading, nationData } = useSelector(state => ({
    employeeData: state.Employee.datas,
    loading: state.Employee.loading
  }), shallowEqual);

  // Get du lieu lan dau 
  useEffect(() => {
    dispatch(getEmployeeAll());
    dispatch(getDispatchingCompanyAll());
  }, [dispatch]);

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getEmployeeAll());
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // //delete modal
  const [item, setItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (data) => {
    setItem(data);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (item && item.id) {
      console.log('delete id :' + item.id);
      dispatch(deleteCareer(item.id));

      setDeleteModal(false);
    }
  };

  // TABLE 
  // render label tab
  const [activeIndex, setActiveIndex] = useState(0);

  const itemRenderer = (item, itemIndex, data) => (
    <a className="p-menuitem-link flex align-items-center gap-2" onClick={() => setActiveIndex(itemIndex)}>
      <BadgePrime value={data}></BadgePrime>
      <span className="font-bold">{props.t(item.name)}</span>
    </a>
  );

  const rendLabel = () => {
    // tạo danh sách địa
    const number_of_contacts = employeeData.length;

    return [{ name: 'All', data: number_of_contacts, type_id: 0 }, ...options.map((type, index) => {
      return { name: type, data: employeeData.filter(employee => employee.user_type == type).length, type_id: index }
    })].filter(item => item.data > 0)
  }

  // acctive tab
  const [customActiveTab, setcustomActiveTab] = useState({ index: "0", value: "All", id: 0 });
  const toggleCustom = (tab, data, id) => {
    if (customActiveTab.index !== tab) {
      setcustomActiveTab({ index: tab, value: data, id: id });
    }
  };

  // Global filter 

  const [selectedItems, setSelectedItems] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nam_jp: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date_of_joining_syndication: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Row selected edit
  const [rowSelect, setRowSelect] = useState(null)

  // Global search
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // goi ham render mang data
  const items = rendLabel();

  // console.log('items', items)

  const renderHeader = () => {
    return (
      <>
        <Row className='mb-2'>
          <div className='d-flex justify-content-between'>
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nhập từ khoá tìm kiếm ..." />
            </span>
            <ButtonRS color="primary" onClick={() => {
              setIsEdit(false);
              tog_fullscreen();
            }}>
              Thêm mới
            </ButtonRS>
          </div>
        </Row>
        <Row>
          <div className='d-flex justify-content-between'>
            {/* <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} /> */}
            <Nav tabs className="nav-tabs-custom">
              {items.map((item, index) => (
                <NavItem key={index} style={{ minWidth: '100px' }}>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab.index === (`${index}`),
                    })}
                    onClick={() => {
                      toggleCustom(`${index}`, item.name, item.nationId);
                    }}
                  >
                    <div className='d-flex gap-2 justify-content-center'>
                      <span className="d-none d-sm-block">{item.name}</span>
                      <Badge pill className={"p-2 font-size-12 badge-soft-primary"}>{item.data}</Badge>
                    </div>
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </div>
        </Row>
      </>
    );
  };


  const [dataTable, setDataTable] = useState(employeeData)

  const getListInternStatus = (key) => {
    console.log('key ', key)
    // const idStatus = statusData.find(item => item.name == key).id;
    const arr = addressData.filter(item => item.nation_id == key);
    console.log('arr:', arr)
    const newList = employeeData.filter(company => arr.some(item => item.object_id == company.id && item.user_type == 'dispatching_company'));
    setDataTable(newList);
  }

  useEffect(() => {
    if (customActiveTab.value === 'All') {
      setDataTable(employeeData);
    } else {
      getListInternStatus(customActiveTab.id);
    }
  }, [customActiveTab, employeeData])

  console.log('customActiveTab:', customActiveTab)

  // render col name
  const nameBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <Avatar className="p-overlay-badge" image={`https://api.lotusocean-jp.com/uploads/${rowData.originalname}`} size="large" shape="circle">
        </Avatar>
        <span>{rowData.name_jp}</span>
      </div>
    );
  };


  const actionBody = (rowData) => {
    return (
      <div className="d-flex gap-3">
        <Button icon="pi pi-pencil" rounded text severity="success" aria-label="Cancel" onClick={() => { setRowSelect(rowData); tog_fullscreen(); setIsEdit(true) }} />
        <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Cancel" onClick={() => { onClickDelete(rowData); }} />
      </div>
    )
  }

  const header = renderHeader();




  // console.log('loading:', loading)
  // console.log('nation:', nationData)
  // console.log('provinceById:', provinceById)
  // console.log('provinceData:', provinceData)
  // console.log(provinceById[0].StateName_ja);
  console.log('employeeData:', employeeData);

  return (
    <div className="card" >
      <DataTable value={dataTable} paginator rows={15} stripedRows rowsPerPageOptions={[5, 10, 15, 20, 50]} dragSelection selectionMode={'multiple'} selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value)} dataKey="id" filters={filters}
        filterDisplay="row" globalFilterFields={['id', 'nam_jp', 'phone_number']} header={header} emptyMessage="Không tìm thấy kết quả phù hợp." tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight={vh} size={'small'}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
      >
        <Column selectionMode="multiple" exportable={false} headerStyle={{ width: '3rem' }} ></Column>
        <Column field="nam_jp" header="Tên xí nghiệp" body={nameBodyTemplate} filterField="nam_jp" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="phone_number" header="Số điện thoại" filterField="factory_name_jp" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="date_of_joining_syndication" header="Ngày gia nhập" filterField="date_of_joining_syndication" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="description" header="Ghi chú" style={{ minWidth: '12rem' }} ></Column>
        <Column field="action" header="Action" style={{ minWidth: '10rem' }} body={actionBody} ></Column>
      </DataTable>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />

      <ModalDatas
        item={rowSelect}
        dispatch={dispatch}
      // setApi={setIntern}
      // updateApi={updateIntern}
      />

    </div>
  );
}

TableDatas.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(TableDatas);