import React, { useState, useEffect, useContext } from 'react';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import { TabMenu } from 'primereact/tabmenu';
import { Avatar } from 'primereact/avatar';

import {
  Nav,
  NavItem,
  NavLink,
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
import { getReceivingFactoryAll, updateReceivingFactory, deleteReceivingFactory, setReceivingFactory, getAddressAll } from "store/actions";

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
  const { vh, tog_fullscreen, isEditIntern, setIsEditIntern } = useContext(DataContext);

  // Khai bao du lieu
  const dispatch = useDispatch();

  const { factoryData, addressData } = useSelector(state => ({
    factoryData: state.ReceivingFactory.datas,
    addressData: state.Address.datas
  }), shallowEqual);

  // Get du lieu lan dau 
  useEffect(() => {
    dispatch(getReceivingFactoryAll());
    dispatch(getAddressAll());
  }, [dispatch]);

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getReceivingFactoryAll());
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

  const rendLabel = () => {
    const array = addressData.filter(address => address.user_type === 'receiving_factory');
    

    let map = new Map();
    array.forEach(obj => {
      if (!map.has(obj.province_id)) {
        map.set(obj.province_id, {data: 1, obj});
      } else {
        map.get(obj.province_id).data += 1;
      }
    });

    // console.log('map', Array.from(map.values()))

    // let uniqueArray = Array.from(map.values()).map(({ data, obj }) => ({ ...obj.province_id, data }));
    let uniqueArray = Array.from(map.values()).map(item => {
      return {name: item.obj.province_id, data: item.data}
    });

    // console.log('uniqueArray', uniqueArray)

    return [{ name: 'All', data: array.length }, ...uniqueArray.map((address) => {
      return { name: address.name, data: address.data }
    })].filter(e => e.data >= 1)
  }

  // goi ham render mang data
  const items = rendLabel();
  console.log('items', items)
  const renderHeader = () => {
    return (
      <div className=''>
        {/* <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} /> */}
        <Nav tabs className="nav-tabs-custom">
          {items.map((item, index) => (
            <NavItem key={index} style={{ minWidth: '100px'}}>
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

  const [customActiveTab, setcustomActiveTab] = useState({ index: "0", value: "All" });
  const toggleCustom = (tab, data) => {
    if (customActiveTab.index !== tab) {
      setcustomActiveTab({ index: tab, value: data });
    }
  };

  // const [dataTable, setDataTable] = useState(factoryData)

  // const getListInternStatus = (key) => {
  //   console.log('key ', key)
  //   const idStatus = statusData.find(item => item.name == key).id;
  //   const arr = statusDetailData.filter(item => item.status_id == idStatus);
  //   const newList = internDataAllInfo.filter(intern => arr.some(item => item.intern_id === intern.id));
  //   setDataTable(newList);
  // }

  // useEffect(() => {
  //   if (customActiveTab.value === 'All') {
  //     setDataTable(factoryData);
  //   } else {
  //     getListInternStatus(customActiveTab.value);
  //   }
  // }, [customActiveTab, factoryData])


  // render col name
  const nameBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <Avatar className="p-overlay-badge" image={`https://api.lotusocean-jp.com/uploads/${rowData.avata_name}`} size="large" shape="circle">
        </Avatar>
        <span>{rowData.name_jp}</span>
      </div>
    );
  };

  // render status body
  // const statusBody = (rowData) => {
  //   const arr = statusDetailData.filter(item => item.intern_id == rowData.id);
  //   // console.log('intern id',rowData.id,'have status id:', arr[0].description)
  //   return (
  //     <div className='d-flex gap-1'>
  //       {arr.map(s => (
  //         <Badge className={"p-2 font-size-12 badge-soft-primary"} key={s.id}>{s.description}</Badge>
  //       ))}
  //     </div>
  //   )
  // }

  const actionBody = (rowData) => {
    return (
      <div className="d-flex gap-3">
        <Button icon="pi pi-pencil" rounded text severity="success" aria-label="Cancel" onClick={() => { setRowSelect(rowData); tog_fullscreen(); setIsEditIntern(true) }} />
        <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Cancel" onClick={() => { onClickDelete(rowData); }} />
      </div>
    )
  }

  const header = renderHeader();


  // console.log(addressData)

  return (
    <div className="card" >
      <DataTable value={factoryData} paginator rows={15} stripedRows rowsPerPageOptions={[5, 10, 15, 20, 50]} dragSelection selectionMode={'multiple'} selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value)} dataKey="id" filters={filters}
        filterDisplay="row" globalFilterFields={['id', 'name', 'description']} header={header} emptyMessage="Không tìm thấy kết quả phù hợp." tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight={vh} size={'small'}>
        <Column selectionMode="multiple" exportable={false} headerStyle={{ width: '3rem' }} ></Column>
        <Column field="nam_jp" header="Tên xí nghiệp" body={nameBodyTemplate} filterField="nam_jp" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="phone" header="Số điện thoại" filterField="factory_name_jp" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
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
        isEdit={isEditIntern}
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