import React, { useState, useEffect, useContext, useRef } from "react"
import { FilterMatchMode, FilterService } from "primereact/api"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { TabMenu } from "primereact/tabmenu"
import { Avatar } from "primereact/avatar"
import { Tooltip } from "primereact/tooltip"

import { Nav, NavItem, NavLink } from "reactstrap"
import classnames from "classnames"

import { Badge } from "reactstrap"
import { Badge as BadgePrime } from "primereact/badge"

import DataContext from "data/DataContext"

import DeleteModal from "components/Common/DeleteModal"
import ModalDatas from "./ModalDatas"
import ModalTop from "./ModalTop"

import { useTranslation } from "react-i18next"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"

import { jsPDF } from "jspdf";

import { font } from "./Roboto-Medium-normal"
// import './Roboto-Medium-normal';
// import "./myFont"

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  getInternAllInfo,
  updateIntern,
  deleteIntern,
  setIntern,
  getStatusAll,
  getStatusDetailAll,
  getAddressAll,
  getAlienRegistrationCardAll,
  setStatus,
  getStatusOfResidenceAll,
  getViolateTypeAll,
  setStatusDetail,
} from "store/actions"

// The rule argument should be a string in the format "custom_[field]".
FilterService.register("custom_activity", (value, filters) => {
  const [from, to] = filters ?? [null, null]
  if (from === null && to === null) return true
  if (from !== null && to === null) return from <= value
  if (from === null && to !== null) return value <= to
  return from <= value && value <= to
})

//==================================================================================================================//

const TableDatas = props => {
  const { t } = useTranslation()

  // data context
  const {
    vh,
    tog_fullscreen,
    setIsEditIntern,
    rowsSelectedInternData,
    setRowSelectedInternData,
  } = useContext(DataContext)

  // Global filter
  const [globalFilterValue, setGlobalFilterValue] = useState("")

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    full_name_jp: { value: null, matchMode: FilterMatchMode.CONTAINS },
    factory_name_jp: { value: null, matchMode: FilterMatchMode.CONTAINS },
    company_name_jp: { value: null, matchMode: FilterMatchMode.CONTAINS },
    residence: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  // Khai bao du lieu
  const dispatch = useDispatch()
  const {
    internDataAllInfo,
    statusData,
    statusDetailData,
    loading,
    dataUser,
    addressData,
    alienCardData,
    statusOfResidenceData,
    violateTypeData,
  } = useSelector(
    state => ({
      internDataAllInfo: state.Intern.datas,
      statusData: state.Status.datas,
      statusDetailData: state.StatusDetail.datas,
      loading: state.Intern.loading,
      addressData: state.Address.datas,
      alienCardData: state.AlienRegistrationCard.datas,
      statusOfResidenceData: state.StatusOfResidence.datas,
      violateTypeData: state.ViolateType.datas,
      // dataUser: state.login.user
    }),
    shallowEqual
  )

  // Get du lieu lan dau
  useEffect(() => {
    dispatch(getInternAllInfo())
    dispatch(getStatusAll())
    dispatch(getStatusDetailAll())
    dispatch(getAlienRegistrationCardAll())
    dispatch(getStatusOfResidenceAll())
    dispatch(getViolateTypeAll())
  }, [dispatch])

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getInternAllInfo())
    }, 10000)
    // Hàm dọn dẹp khi unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  // quan ly trang thai du lieu table
  const [dataTable, setDataTable] = useState(internDataAllInfo)

  // export file
  const dt = useRef(null)

  const cols = [
    { field: "full_name_jp", header: "Intern name" },
    { field: "factory_name_jp", header: "Receiving Factory" },
    { field: "company_name_jp", header: "Dispatching Company" },
    { field: "sor_name", header: "Status of residence" },
    { field: "status", header: "Status" },
  ]

  const exportColumns = cols.map(col => ({
    title: col.header,
    dataKey: col.field,
  }))

  const exportCSV = selectionOnly => {
    dt.current.exportCSV({ selectionOnly })
  }

  const exportPdf = () => {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0)

        // doc.addFileToVFS("BeVietnamPro-Medium-normal.ttf", font2)
        // doc.addFont('BeVietnamPro-Medium-normal.ttf', 'BeVietnamPro-Medium', 'normal');
        // doc.setFont("BeVietnamPro-Medium-normal")

        doc.addFileToVFS("Roboto-Medium-normal.ttf", font)
        doc.addFont("Roboto-Medium-normal.ttf", "Roboto-Medium", "normal")
        doc.setFont("Roboto-Medium")

        doc.autoTable({
          columns: exportColumns,
          body: dataTable
        });

        // doc.addFileToVFS("Roboto-Medium-normal.ttf", myFont);
        // doc.addFont("Roboto-Medium-normal.ttf", "Roboto-Medium", "normal")
        // doc.setFont("Roboto-Medium")

        // doc.autoTable(exportColumns, dataTable)
        doc.save("datatable.pdf")
      })
    })
  }

  const printPdf = () => {
    const doc = new jsPDF();
    doc.addFileToVFS("Roboto-Medium-normal.ttf", font)
    doc.addFont("Roboto-Medium-normal.ttf", "Roboto-Medium", "normal")
    doc.setFont("Roboto-Medium")
    doc.autoTable({
      columns: exportColumns,
      body: dataTable
    });
    doc.save("datatable.pdf")
  }

  const exportExcel = () => {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(dataTable)
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] }
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      })

      saveAsExcelFile(excelBuffer, "datatable")
    })
  }

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then(module => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        let EXCEL_EXTENSION = ".xlsx"
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        })

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        )
      }
    })
  }

  // //delete modal
  const [item, setItem] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = data => {
    setItem(data)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (item && item.id) {
      console.log("delete id :" + item.id)
      dispatch(deleteIntern(item.id))

      setDeleteModal(false)
    }
  }

  // Row selected edit
  const [rowSelect, setRowSelect] = useState(null)

  const onGlobalFilterChange = e => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters["global"].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  // render label tab
  const [activeIndex, setActiveIndex] = useState(0)

  const itemRenderer = (item, itemIndex, data) => (
    <a
      className="p-menuitem-link flex align-items-center gap-2"
      onClick={() => setActiveIndex(itemIndex)}
    >
      <BadgePrime value={data}></BadgePrime>
      <span className="font-bold">{props.t(item.name)}</span>
    </a>
  )

  // render data tab
  const rendLabel = () => {
    return [
      {
        name: "All",
        data: internDataAllInfo.length,
        template: item => itemRenderer(item, 0, internDataAllInfo.length),
      },
      ...statusData.map((status, index) => {
        return {
          name: status.name,
          data: statusDetailData.filter(e => e.status_id == status.id).length,
          template: item =>
            itemRenderer(
              item,
              index + 1,
              statusDetailData.filter(e => e.status_id == status.id).length
            ),
        }
      }),
    ].filter(e => e.data >= 1)
  }

  // active tab
  const [customActiveTab, setcustomActiveTab] = useState({
    index: "0",
    value: "All",
  })
  const toggleCustom = (tab, data) => {
    if (customActiveTab.index !== tab) {
      setcustomActiveTab({ index: tab, value: data })
    }
  }

  // goi ham render mang data
  const items = rendLabel()

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between">
        {/* <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} /> */}
        <Nav tabs className="nav-tabs-custom">
          {items.map((item, index) => (
            <NavItem key={index} style={{ minWidth: "100px" }}>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({
                  active: customActiveTab.index === `${index}`,
                })}
                onClick={() => {
                  toggleCustom(`${index}`, item.name)
                }}
              >
                <div className="d-flex gap-2 justify-content-center">
                  <span className="d-none d-sm-block">
                    {props.t(item.name)}
                  </span>
                  <Badge pill className={"p-2 font-size-12 badge-soft-primary"}>
                    {item.data}
                  </Badge>
                </div>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <div className="flex align-items-center justify-content-end gap-2">
          <Button
            type="button"
            icon="pi pi-file"
            rounded
            onClick={() => exportCSV(false)}
            data-pr-tooltip="CSV"
          />
          <Button
            type="button"
            icon="pi pi-file-excel"
            severity="success"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="XLS"
          />
          <Button
            type="button"
            icon="pi pi-file-pdf"
            severity="warning"
            rounded
            onClick={printPdf}
            data-pr-tooltip="PDF"
          />
        </div>
      </div>
    )
  }

  // Lay du lieu cua table phu thuoc vao tung tab khac nhau
  const getListInternStatus = tab => {
    const idStatus = statusData.find(item => item.name == tab).id
    const arr = statusDetailData.filter(item => item.status_id == idStatus)
    const newList = internDataAllInfo.filter(intern =>
      arr.some(item => item.intern_id === intern.id)
    )
    setDataTable(newList)
  }

  useEffect(() => {
    if (customActiveTab.value === "All") {
      setDataTable(internDataAllInfo)
    } else {
      getListInternStatus(customActiveTab.value)
    }
  }, [customActiveTab, internDataAllInfo])

  // render col name
  const nameBodyTemplate = rowData => {
    return (
      <div className="flex align-items-center gap-2">
        <Avatar
          className="p-overlay-badge"
          image={`https://api.lotusocean-jp.com/uploads/${rowData.avata}`}
          size="large"
          shape="circle"
        ></Avatar>
        <span>{rowData.full_name_jp}</span>
      </div>
    )
  }

  // render status body
  const statusBody = rowData => {
    const arr = statusDetailData.filter(item => item.intern_id == rowData.id)
    // console.log(arr)
    return (
      <div className="d-flex gap-1">
        {arr.map(s => (
          <Badge
            className={`p-2 font-size-12 badge-soft-${s.colors}`}
            key={s.id}
          >
            {s.name}
          </Badge>
        ))}
      </div>
    )
  }

  const actionBody = rowData => {
    return (
      <div className="d-flex gap-3">
        <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="success"
          aria-label="Cancel"
          onClick={() => {
            setRowSelect(rowData)
            tog_fullscreen()
            setIsEditIntern(true)
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          aria-label="Cancel"
          onClick={() => {
            onClickDelete(rowData)
          }}
        />
      </div>
    )
  }

  const header = renderHeader()

  // console.log('dataTable:', dataTable)
  // console.log('internDataAllInfo:', internDataAllInfo)
  // console.log(dataUser)
  // console.log('statusDetailData', statusDetailData)
  // console.log('rowsSelectedInternData', rowsSelectedInternData)

  return (
    <div className="card">
      <ModalTop
        optionGroup={statusData}
        statusApidata={statusData}
        statusOfResidenceApiData={statusOfResidenceData}
        violateTypeApiData={violateTypeData}
        statusDetailApiData={statusDetailData}
        alienCardApiData={alienCardData}
        setStatusDetailApi={setStatusDetail}
      />
      <Tooltip target=".export-buttons>button" position="bottom" />

      <DataTable
        ref={dt}
        value={dataTable}
        paginator
        rows={15}
        stripedRows
        rowsPerPageOptions={[5, 10, 15, 20, 50]}
        dragSelection
        selectionMode={"multiple"}
        selection={rowsSelectedInternData}
        onSelectionChange={e => setRowSelectedInternData(e.value)}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["id", "name", "description"]}
        header={header}
        emptyMessage="Không tìm thấy kết quả phù hợp."
        tableStyle={{ minWidth: "50rem" }}
        scrollable
        scrollHeight={vh}
        size={"small"}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate={`${t("Showing")} {first} ${t(
          "to"
        )} {last} ${t("of")} {totalRecords} ${t("items")}`}
      >
        <Column
          selectionMode="multiple"
          exportable={false}
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="full_name_jp"
          header={props.t("Intern name")}
          body={nameBodyTemplate}
          filterField="full_name_jp"
          filter
          filterPlaceholder="Tìm kiếm bằng tên"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="factory_name_jp"
          header={props.t("Receiving Factory")}
          filterField="factory_name_jp"
          filter
          filterPlaceholder="Tìm kiếm bằng tên"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="company_name_jp"
          header={props.t("Dispatching Company")}
          filterField="company_name_jp"
          filter
          filterPlaceholder="Tìm kiếm bằng tên"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="sor_name"
          header={props.t("Status of residence")}
          filterField="sor_name"
          filter
          filterPlaceholder="Tìm kiếm bằng tên"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
         <Column
          header={props.t("Status")}
          body={statusBody}
          filterField="status"
          filterPlaceholder="tìm kiếm bằng mô tả"
          showFilterMenu={true}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "14rem" }}
        ></Column>
        <Column
          field="action"
          header={props.t("Action")}
          style={{ minWidth: "10rem" }}
          body={actionBody}
        ></Column>
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
  )
}

TableDatas.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(TableDatas)
