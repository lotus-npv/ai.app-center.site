import React, { useState, useEffect, useContext } from 'react';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';

import DataContext from 'data/DataContext';

import DeleteModal from "components/Common/DeleteModal";
import ModalDatas from './ModalDatas'

import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getInternAllInfo, updateIntern, deleteIntern, setIntern, getStatusAll, getStatusDetailAll } from "store/actions";

// The rule argument should be a string in the format "custom_[field]".
FilterService.register('custom_activity', (value, filters) => {
  const [from, to] = filters ?? [null, null];
  if (from === null && to === null) return true;
  if (from !== null && to === null) return from <= value;
  if (from === null && to !== null) return value <= to;
  return from <= value && value <= to;
});



const TableDatas = (props) => {

  const { vh } = useContext(DataContext);

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
  const { internDataAllInfo, statusData, statusDetailData,} = useSelector(state => ({
    internDataAllInfo: state.Intern.datas,
    statusData: state.Status.datas,
    statusDetailData: state.StatusDetail.datas,
  }), shallowEqual);



  // Get du lieu lan dau 
  useEffect(() => {
    dispatch(getInternAllInfo());
    dispatch(getStatusAll());
    dispatch(getStatusDetailAll());
  }, [dispatch]);


  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getInternAllInfo());
    }, 10000);
    // Hàm dọn dẹp khi unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // render data intern
  // const [dataRender, setDataRender] = useState([])
  // useEffect(() => {
  //   setDataRender(internDataAll.map(intern => {
  //     return { ...intern, 
  //       full_name: `${intern.last_name_jp} ${intern.middle_name_jp} ${intern.first_name_jp}`, 
  //       factory_name: factoryData.find(item => item.id == intern.receiving_factory_id).name_jp,
  //       company_name:  companyData.find(item => item.id == intern.dispatching_company_id).name_jp,
  //     }
  //   }))
  // }, [internDataAll])

  // modal edit or addnew
  const [isEdit, setIsEdit] = useState(false);
  const [modal_xlarge, setmodal_xlarge] = useState(false);
  function tog_xlarge() {
    setmodal_xlarge(!modal_xlarge);
    removeBodyCss();
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  // add new
  const addForm = () => {
    setRowSelect(null);
    setIsEdit(false);
    tog_xlarge();
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
      <Badge value={data}></Badge>
      <span className="font-bold">{props.t(item.name)}</span>
    </a>
  );

  const rendLabel = () => {
    return [{ name: 'All', data: 1, template: (item) => itemRenderer(item, 0, internDataAllInfo.length) }, ...statusData.map((status, index) => {
      return { name: status.name, data: statusDetailData.filter(e => e.status_id == status.id).length, template: (item) => itemRenderer(item, index + 1, statusDetailData.filter(e => e.status_id == status.id).length) }
    })].filter(e => e.data == 1)
  }

  const items = rendLabel();
  const renderHeader = () => {
    return (
      <div className=''>
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
      </div>
    );
  };


  // render col name
  const nameBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <Avatar className="p-overlay-badge" image={`https://api.lotusocean-jp.com/uploads/${rowData.avata_name}`} size="large" shape="circle">
        </Avatar>
        <span>{rowData.full_name_jp}</span>
      </div>
    );
  };

  // render status body
  const statusBody = (rowData) => {
    const arr = statusDetailData.filter(item => item.intern_id == rowData.id);
    console.log('intern id',rowData.id,'have status id:', arr[0].description)
    return arr.map(status => (
      <Badge className={"p-2 font-size-12 badge-soft-succes"} key={status.id}>{status.description}</Badge>
    ))
  }

  const actionBody = (rowData) => {
    return (
      <div className="d-flex gap-3">
        <Button icon="pi pi-pencil" rounded text severity="success" aria-label="Cancel" onClick={() => { setRowSelect(rowData); tog_xlarge(); setIsEdit(true) }} />
        <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Cancel" onClick={() => { onClickDelete(rowData); }} />
      </div>
    )
  }

  const header = renderHeader();


  console.log(internDataAllInfo)

  return (
    <div className="card" >
      <DataTable value={internDataAllInfo} paginator rows={15} stripedRows rowsPerPageOptions={[5, 10, 15, 20, 50]} dragSelection selectionMode={'multiple'} selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value)} dataKey="id" filters={filters}
        filterDisplay="row" globalFilterFields={['id', 'name', 'description']} header={header} emptyMessage="Không tìm thấy kết quả phù hợp." tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight={vh} size={'small'}>
        <Column selectionMode="multiple" exportable={false} headerStyle={{ width: '3rem' }} ></Column>
        <Column field="full_name_jp" header="Tên thực tập sinh" body={nameBodyTemplate} filterField="full_name_jp"  filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="factory_name_jp" header="Xí nghiệp" filterField="factory_name_jp" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="company_name_jp" header="Phái cử" filterField="company_name_jp" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="sor_name" header="Tư cách lưu trú" filterField="sor_name" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="status" header="Trạng thái" body={statusBody} filter filterField="status" filterPlaceholder="tìm kiếm bằng mô tả" showFilterMenu={true} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} ></Column>
        <Column field="action" header="Action" style={{ minWidth: '14rem' }} body={actionBody} ></Column>
      </DataTable>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />

      <ModalDatas
        item={rowSelect}
        isEdit={isEdit}
        modal_xlarge={modal_xlarge}
        setmodal_xlarge={setmodal_xlarge}
        tog_xlarge={tog_xlarge}
        dispatch={dispatch}
        setApi={setIntern}
        updateApi={updateIntern}
      />

    </div>
  );
}

TableDatas.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(TableDatas);