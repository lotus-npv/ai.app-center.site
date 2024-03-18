import React, { useState, useEffect, useContext } from 'react';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';

import DataContext from 'data/DataContext';

import DeleteModal from "components/Common/DeleteModal";
import ModalDatas from './ModalDatas'

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getInternAll, updateIntern, deleteIntern, setIntern } from "store/actions";

// The rule argument should be a string in the format "custom_[field]".
FilterService.register('custom_activity', (value, filters) => {
  const [from, to] = filters ?? [null, null];
  if (from === null && to === null) return true;
  if (from !== null && to === null) return from <= value;
  if (from === null && to !== null) return value <= to;
  return from <= value && value <= to;
});

const TableDatas = () => {

  const { vh } = useContext(DataContext);

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
    datas: state.Intern.datas
  }), shallowEqual);

  // Get du lieu lan dau 
  useEffect(() => {
    dispatch(getInternAll());
    setLoading(false);
  }, [dispatch]);

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getInternAll());
    }, 10000);
    // Hàm dọn dẹp khi unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

  const [activeIndex, setActiveIndex] = useState(0);
  const renderHeader = () => {
    return (
      <div className="card">
        {/* <div className="flex mb-2 gap-2 justify-content-end">
          <Button onClick={() => setActiveIndex(0)} className="w-2rem h-2rem p-0" rounded outlined={activeIndex !== 0} label="1" />
          <Button onClick={() => setActiveIndex(1)} className="w-2rem h-2rem p-0" rounded outlined={activeIndex !== 1} label="2" />
          <Button onClick={() => setActiveIndex(2)} className="w-2rem h-2rem p-0" rounded outlined={activeIndex !== 2} label="3" />
        </div> */}
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Header I" contentStyle={{display: 'none', height: '1px'}}><p>sâsa</p>
          </TabPanel>
          <TabPanel header="Header II" contentStyle={{display: 'none', height: '1px'}}>
          </TabPanel>
          <TabPanel header="Header III" contentStyle={{display: 'none', height: '1px'}}>
          </TabPanel>
        </TabView>
        {/* <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nhập từ khoá tìm kiếm ..." />
        </span> */}
      </div>
    );
  };

  const addForm = () => {
    setRowSelect(null);
    setIsEdit(false);
    tog_xlarge();
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

  return (
    <div className="card" >
      <DataTable value={datas} paginator rows={15} stripedRows rowsPerPageOptions={[5, 10, 15, 20, 50]} dragSelection selectionMode={'multiple'} selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value)} dataKey="id" filters={filters}
        filterDisplay="row" loading={false} globalFilterFields={['id', 'name', 'description']} header={header} emptyMessage="Không tìm thấy kết quả phù hợp." tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight={vh} size={'small'} s>
        <Column selectionMode="multiple" exportable={false} headerStyle={{ width: '3rem' }} ></Column>
        <Column field="name" header="Tên thực tập sinh" filterField="name" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="factory" header="Xí nghiệp" filterField="factory" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="company" header="Phái cử" filterField="company" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="residence" header="Tư cách lưu trú" filterField="residence" filter filterPlaceholder="Tìm kiếm bằng tên" sortable style={{ minWidth: '12rem' }} ></Column>
        <Column field="status" header="Trạng thái" filter filterField="status" filterPlaceholder="tìm kiếm bằng mô tả" showFilterMenu={true} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} ></Column>
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

export default TableDatas;