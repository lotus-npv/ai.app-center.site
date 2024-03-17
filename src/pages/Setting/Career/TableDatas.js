import React, { useState, useEffect } from 'react';
import { Modal, Label, Input } from "reactstrap";
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

import DeleteModal from "components/Common/DeleteModal";
import ModalDatas from './ModalDatas'

import { useNavigate, Link } from "react-router-dom"; 1

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getCareerAll, updateCareer, deleteCareer, setCareer } from "store/actions";

// The rule argument should be a string in the format "custom_[field]".
FilterService.register('custom_activity', (value, filters) => {
  const [from, to] = filters ?? [null, null];
  if (from === null && to === null) return true;
  if (from !== null && to === null) return from <= value;
  if (from === null && to !== null) return value <= to;
  return from <= value && value <= to;
});

const TableDatas = () => {
  const navigate = useNavigate();

  var screenAvailHeight = window.screen.availHeight;
  function getScrollHeight() {
    let vh = '';
    if(screenAvailHeight < 1100) {
      vh ='vh70';
    } else {
      vh = 'vh75';
    }
    return vh;
  }

  console.log(screenAvailHeight);

  const [selectedItems, setSelectedItems] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const dispatch = useDispatch();

  const { datas } = useSelector(state => ({
    datas: state.Career.datas
  }), shallowEqual);

  // Get du lieu lan dau 
  useEffect(() => {
    dispatch(getCareerAll());
    setLoading(false);
  }, [dispatch]);

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getCareerAll());
    }, 10000);
    // Hàm dọn dẹp khi unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // modal edit or addnew
  const [isEdit , setIsEdit] = useState(false);
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

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nhập từ khoá tìm kiếm ..." />
        </span>

        <Button className='btn btn-primary' onClick={addForm}>
          Thêm mới - {screenAvailHeight}
        </Button>

      </div>
    );
  };

  const addForm = () => {
    // navigate('/input-career');
    setRowSelect(null);
    setIsEdit(false);
    tog_xlarge();
  }



  const actionBody = (rowData) => {
    return (
      <div className="d-flex gap-3">
        <Button icon="pi pi-pencil" rounded text severity="success" aria-label="Cancel" onClick={() => { setRowSelect(rowData); tog_xlarge(); setIsEdit(true)}} />
        <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Cancel" onClick={() => { onClickDelete(rowData); }} />
      </div>
    )
  }

  const header = renderHeader();

  // console.log(rowSelect)

  return (
    <div className="card" >
      <DataTable value={datas} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} sortField="id" sortOrder={-1} selectionMode={'checkbox'} selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value)} dataKey="id" filters={filters} 
      filterDisplay="row" loading={false} globalFilterFields={['id', 'name', 'description']} header={header} emptyMessage="Không tìm thấy kết quả phù hợp." tableStyle={{ minWidth: '50rem', height: '10rem'}} scrollable scrollHeight={getScrollHeight}>
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
        <Column field="id" header="ID" filter filterPlaceholder="Tìm kiếm bằng id" sortable  style={{ width: '15rem' }} />
        <Column field="name" header="Name" filterField="name" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} />
        <Column field="description" header="Description" filter filterField="description" filterPlaceholder="tìm kiếm bằng mô tả" showFilterMenu={true} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} />
        <Column field="action" header="Action" style={{ minWidth: '14rem' }} body={actionBody} />
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
        setApi={setCareer}
        updateApi={updateCareer}
      />

    </div>
  );
}

export default TableDatas;