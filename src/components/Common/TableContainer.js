import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useExpanded,
  usePagination,
} from "react-table"
import { Link } from "react-router-dom"

import { Table, Row, Col, Button, Badge } from "reactstrap"
import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter"
import InternSearchFilter from "../../components/Common/InternSearchFilter"
import FactorySearchFilter from "./FactorySearchFilter"

// import data
import { listCompany } from '../../common/data/receiving-factory'
import { listCountry } from '../../common/data/dispatching-company'


// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
  isInternGlobalFilter,
  isFactoryGlobalFilter
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <React.Fragment>
      <Row >
        <Col md={12} xl={2} className="mb-1">
          <input type="search" className="form-control " id="search-bar-0" value={value || ""} placeholder={`${count} records...`} onChange={e => { setValue(e.target.value); onChange(e.target.value) }} />
        </Col>
        {isJobListGlobalFilter && <JobListGlobalFilter setGlobalFilter={setGlobalFilter} />}
        <Col md={12} xl={10} className="mb-1">
          {isInternGlobalFilter && <InternSearchFilter setGlobalFilter={setGlobalFilter} />}
          {isFactoryGlobalFilter && <FactorySearchFilter setGlobalFilter={setGlobalFilter} />}
        </Col>
      </Row>
    </React.Fragment>
  )
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isJobListGlobalFilter,
  isInternGlobalFilter,
  isFactoryGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  customPageSizeOptions,
  iscustomPageSizeOptions,
  isPagination,
  isShowingPageLength,
  paginationDiv,
  pagination,
  tableClass,
  theadClass,
  isInternMenu,
  isFactoryMenu,
  isDepatchingCompanyMenu
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      // defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    // useFilters,
    useSortBy,
    useExpanded,
    usePagination
  )

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value))
  }

  return (
    <Fragment>
      <Row className="">
        {iscustomPageSizeOptions &&
          <Col md={12} xl={1} className="mb-1">
            <select
              className="form-select"
              value={pageSize}
              onChange={onChangeInSelect}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  P {pageSize}
                </option>
              ))}
            </select>
          </Col>
        }

        {isGlobalFilter && (
          <Col md={12} xl={11} className="mb-1">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
              isJobListGlobalFilter={isJobListGlobalFilter}
              isInternGlobalFilter={isInternGlobalFilter}
              isFactoryGlobalFilter={isFactoryGlobalFilter}
            />
          </Col>
        )}
      </Row>

      {/* <div className="d-flex flex-wrap gap-2">
        <button type="button" className="border btn" onClick={() => console.log('all')}>
          Tất cả <Badge className="bg-success ms-1">13</Badge>
        </button>
        <button type="button" className="border" >
          Sắp nhập cảnh <span className="badge bg-success ms-1">2</span>
        </button>
        <button type="button" className="border" >
          Sắp hết hạn visa <span className="badge bg-success ms-1">2</span>
        </button>
        <button type="button" className="border" >
          Đang làm việc  <span className="badge bg-success ms-1">5</span>
        </button>
        <button type="button" className="border" >
          Về nước tạm thời <span className="badge bg-success ms-1">5</span>
        </button>
      </div> */}

      {isInternMenu && (
        <div
          className="btn-group me-2"
          role="group"
          aria-label="First group"
        >
          <Button color="primary" className="btn btn-light" onClick={() => {

            setGlobalFilter('');
          }}>
            Tất cả <Badge className="bg-success ms-1">13</Badge>
          </Button>

          <Button color="primary" className="btn btn-light" onClick={() => {
            setGlobalFilter('Sắp nhập cảnh');
          }}>
            Sắp nhập cảnh <span className="badge bg-success ms-1">2</span>
          </Button>

          <Button color="primary" className="btn btn-light" onClick={() => {
            setGlobalFilter('Sắp hết hạn visa');
          }}>
            Sắp hết hạn visa <span className="badge bg-success ms-1">2</span>
          </Button>

          <Button color="primary" className="btn btn-light" onClick={() => {
            setGlobalFilter('Đang làm việc');
          }}>
            Đang làm việc  <span className="badge bg-success ms-1">5</span>
          </Button>
        </div>
      )}

      {isFactoryMenu &&
        <div
          className="btn-group me-2"
          role="group"
          aria-label="First group"
        >
          {listCompany.map(item => {
            return (
              <Button color="primary" className="btn btn-light" key={item.name} onClick={() => {
                item.name == 'All' ? setGlobalFilter('') : setGlobalFilter(item.value);
              }}>
                {item.name} <Badge className="bg-success ms-1">{item.value}</Badge>
              </Button>
            )
          })}
        </div>
      }
      
      {isDepatchingCompanyMenu &&
        <div
          className="btn-group me-2"
          role="group"
          aria-label="First group"
        >
          {listCountry.map(item => {
            return (
              <Button color="primary" className="btn btn-light" key={item.name} onClick={() => {
                item.name == 'All' ? setGlobalFilter('') : setGlobalFilter(item.value);
              }}>
                {item.name} <Badge className="bg-success ms-1">{item.value}</Badge>
              </Button>
            )
          })}
        </div>
      }

      <div className="table-responsive">
        <Table {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th key={column.id} className={column.isSort ? "sorting" : ''}>
                    <div className="m-0" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                    </div>
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map(cell => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      )
                    })}
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </Table>
      </div>

      {
        isPagination && (
          <Row className="justify-content-between align-items-center">
            {isShowingPageLength && <div className="col-sm">
              <div className="text-muted">Showing <span className="fw-semibold">{page.length}</span> of <span className="fw-semibold">{data.length}</span> entries</div>
            </div>}
            <div className={paginationDiv}>
              <ul className={pagination}>
                <li className={`page-item ${!canPreviousPage ? "disabled" : ''}`}>
                  <Link to="#" className="page-link" onClick={previousPage}>
                    <i className="mdi mdi-chevron-left"></i>
                  </Link>
                </li>
                {pageOptions.map((item, key) => (
                  <React.Fragment key={key}>
                    <li className={pageIndex === item ? "page-item active" : "page-item"}>
                      <Link to="#" className="page-link" onClick={() => gotoPage(item)}>{item + 1}</Link>
                    </li>
                  </React.Fragment>
                ))}
                <li className={`page-item ${!canNextPage ? "disabled" : ''}`}>
                  <Link to="#" className="page-link" onClick={nextPage}>
                    <i className="mdi mdi-chevron-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </Row>
        )
      }
    </Fragment>
  )
}

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default TableContainer
