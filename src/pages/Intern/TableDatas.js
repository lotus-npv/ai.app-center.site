import React, { useState, useEffect, useContext } from 'react';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import { Avatar } from 'primereact/avatar';

import {
  Nav,
  NavItem,
  NavLink,
  Spinner
} from "reactstrap";
import classnames from "classnames";

import { Badge } from "reactstrap";
import { Badge as BadgePrime } from 'primereact/badge';

import DataContext from 'data/DataContext';

import DeleteModal from "components/Common/DeleteModal";
import ModalDatas from './ModalDatas'
import ModalTop from './ModalTop';

import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getInternAllInfo, updateIntern, deleteIntern, setIntern, getStatusAll, getStatusDetailAll, getAddressAll, getAlienRegistrationCardAll } from "store/actions";

// The rule argument should be a string in the format "custom_[field]".
FilterService.register('custom_activity', (value, filters) => {
  const [from, to] = filters ?? [null, null];
  if (from === null && to === null) return true;
  if (from !== null && to === null) return from <= value;
  if (from === null && to !== null) return value <= to;
  return from <= value && value <= to;
});



const TableDatas = (props) => {

  // data context
  const { vh, tog_fullscreen, setIsEditIntern } = useContext(DataContext);

  // Global filter 
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedItems, setSelectedItems] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    full_name_jp: { value: null, matchMode: FilterMatchMode.CONTAINS },
    factory_name_jp: { value: null, matchMode: FilterMatchMode.CONTAINS },
    company_name_jp: { value: null, matchMode: FilterMatchMode.CONTAINS },
    residence: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Khai bao du lieu
  const dispatch = useDispatch();
  const { internDataAllInfo, statusData, statusDetailData, loading, dataUser,addressData, alienCardData } = useSelector(state => ({
    internDataAllInfo: state.Intern.datas,
    statusData: state.Status.datas,
    statusDetailData: state.StatusDetail.datas,
    loading: state.Intern.loading,
    addressData: state.Address.datas,
    alienCardData: state.AlienRegistrationCard.datas,
    // dataUser: state.login.user
  }), shallowEqual);



  // Get du lieu lan dau 
  useEffect(() => {
    dispatch(getInternAllInfo());
    dispatch(getStatusAll());
    dispatch(getStatusDetailAll());
    dispatch(getAlienRegistrationCardAll());
  }, [dispatch]);


  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getInternAllInfo());
    }, 60000);
    // Hàm dọn dẹp khi unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [modal_xlarge, setmodal_xlarge] = useState(false);
  function tog_xlarge() {
    setmodal_xlarge(!modal_xlarge);
    removeBodyCss();
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

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

  // Row selected edit
  const [rowSelect, setRowSelect] = useState(null)

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // render label tab
  const [activeIndex, setActiveIndex] = useState(0);

  const itemRenderer = (item, itemIndex, data) => (
    <a className="p-menuitem-link flex align-items-center gap-2" onClick={() => setActiveIndex(itemIndex)}>
      <BadgePrime value={data}></BadgePrime>
      <span className="font-bold">{props.t(item.name)}</span>
    </a>
  );

  // render data tab
  const rendLabel = () => {
    return [{ name: 'All', data: internDataAllInfo.length, template: (item) => itemRenderer(item, 0, internDataAllInfo.length) }, ...statusData.map((status, index) => {
      return { name: status.name, data: statusDetailData.filter(e => e.status_id == status.id).length, template: (item) => itemRenderer(item, index + 1, statusDetailData.filter(e => e.status_id == status.id).length) }
    })].filter(e => e.data >= 1)
  }

  // active tab
  const [customActiveTab, setcustomActiveTab] = useState({ index: "0", value: "All" });
  const toggleCustom = (tab, data) => {
    if (customActiveTab.index !== tab) {
      setcustomActiveTab({ index: tab, value: data });
    }
  };

  // goi ham render mang data
  const items = rendLabel();

  const renderHeader = () => {
    return (
      <div className=''>
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
                  toggleCustom(`${index}`, item.name);
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
    );
  };

  // quan ly trang thai du lieu table
  const [dataTable, setDataTable] = useState(internDataAllInfo)

  // Lay du lieu cua table phu thuoc vao tung tab khac nhau
  const getListInternStatus = (tab) => {
    const idStatus = statusData.find(item => item.name == tab).id;
    const arr = statusDetailData.filter(item => item.status_id == idStatus);
    const newList = internDataAllInfo.filter(intern => arr.some(item => item.intern_id === intern.id));
    setDataTable(newList);
  }

  useEffect(() => {
    if (customActiveTab.value === 'All') {
      setDataTable(internDataAllInfo);
    } else {
      getListInternStatus(customActiveTab.value);
    }
  }, [customActiveTab, internDataAllInfo])


  // render col name
  const nameBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <Avatar className="p-overlay-badge" image={`https://api.lotusocean-jp.com/uploads/${rowData.avata}`} size="large" shape="circle">
        </Avatar>
        <span>{!loading ? rowData.full_name_jp : '....'}</span>
      </div>
    );
  };

  // const colorList = (key) => {
  //   switch(key) {
  //     case 'success':
  //       return ''

  //   }
  // }

  // render status body
  const statusBody = (rowData) => {
    const arr = statusDetailData.filter(item => item.intern_id == rowData.id);
    // console.log(arr)
    return (
      <div className='d-flex gap-1'>
        {arr.map(s => (
          <Badge className={`p-2 font-size-12 badge-soft-${s.colors}`} key={s.id}>{s.name}</Badge>
        ))}
      </div>
    )
  }

  const actionBody = (rowData) => {
    return (
      <div className="d-flex gap-3">
        <Button icon="pi pi-pencil" rounded text severity="success" aria-label="Cancel" onClick={() => { setRowSelect(rowData); tog_fullscreen(); setIsEditIntern(true) }} />
        <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Cancel" onClick={() => { onClickDelete(rowData); }} />
      </div>
    )
  }

  const header = renderHeader();


  // console.log('dataTable:', dataTable)
  // console.log('internDataAllInfo:', internDataAllInfo)
  // console.log(dataUser)
  console.log('statusDetailData', statusDetailData)

  return (
    <div className="card" >
      <DataTable value={dataTable} paginator rows={15} stripedRows rowsPerPageOptions={[5, 10, 15, 20, 50]} dragSelection selectionMode={'multiple'} selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value)} dataKey="id" filters={filters}
        filterDisplay="row" globalFilterFields={['id', 'name', 'description']} header={header} emptyMessage="Không tìm thấy kết quả phù hợp." tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight={vh} size={'small'}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
      >
        <Column selectionMode="multiple" exportable={false} headerStyle={{ width: '3rem' }} ></Column>
        <Column field="full_name_jp" header="Tên thực tập sinh" body={nameBodyTemplate} filterField="full_name_jp" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="factory_name_jp" header="Xí nghiệp" filterField="factory_name_jp" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="company_name_jp" header="Phái cử" filterField="company_name_jp" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="sor_name" header="Tư cách lưu trú" filterField="sor_name" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column header="Trạng thái" body={statusBody} filterField="status" filterPlaceholder="tìm kiếm bằng mô tả" showFilterMenu={true} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} ></Column>
        <Column field="action" header="Action" style={{ minWidth: '10rem' }} body={actionBody} ></Column>
      </DataTable>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />

      <ModalDatas
        item={rowSelect}
        setApi={setIntern}
        updateApi={updateIntern}
        addressData={addressData}
        alienCardData={alienCardData}
        statusDetailData={statusDetailData}
      />

    </div>
  );
}

TableDatas.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(TableDatas);