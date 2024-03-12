import React, { useMemo, useState, useEffect } from "react";
import { Button, Card, CardBody, Row, Col, Container, Badge, UncontrolledTooltip, CardHeader, } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import { Link } from 'react-router-dom';
import { data } from '../../common/data/intern'
import Select from "react-select";
// import TableContainer from './TableContainer';
import TableContainer from "components/Common/TableContainer";

// import avata loading
import avata from '../../assets/images/avata/avata-loading.png'

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import { Avata, Name, Factory, Archival_Status, Status } from './InternColList';

import { withTranslation } from "react-i18next";

const optionGroup = [
    { label: "Mustard", value: "Mustard" },
    { label: "Ketchup", value: "Ketchup" },
    { label: "Relish", value: "Relish" }
];



const InternPage = (props) => {
    const [rows, setRows] = useState([]);
    document.title = "Intern Page";
    const navigate = useNavigate();
    const [selectedGroup, setselectedGroup] = useState(null);

    function handleSelectGroup(selectedGroup) {
        setselectedGroup(selectedGroup);
    }

    const addForm = () => {
        navigate('/input-intern');
    }

    const getColor = (status) => {
        switch (status) {
            case 'Sắp nhập cảnh':
                return "primary"
            case 'Đang xin Visa':
                return "info"
            case 'Đang làm việc':
                return "success"
        }
    }

    const columns = useMemo(() => [
        {
            Header: () => <div className="form-check font-size-16" >
                <input className="form-check-input" type="checkbox" id="checkAll" />
                <label className="form-check-label" htmlFor="checkAll"></label>
            </div>,
            accessor: '#',
            width: '20px',
            filterable: true,
            Cell: (cellProps) => (
                <div className="form-check font-size-16" >
                    <input className="form-check-input" type="checkbox" id="checkAll" />
                    <label className="form-check-label" htmlFor="checkAll"></label>
                </div>
            )
        },
        {
            Header: 'Avata',
            accessor: 'avata',
            Cell: (cellProps) => {
                return <Avata {...cellProps} />;
            }
        },
        {
            Header: 'Tên',
            accessor: 'name',
            Cell: (cellProps) => {
                return <Name {...cellProps} />;
            }
        },
        {
            Header: 'Xí nghiệp',
            accessor: 'factory',
            Cell: (cellProps) => {
                return <Factory {...cellProps} />;
            }
        },
        {
            Header: 'Tư cách lưu trú',
            accessor: 'archival_status',
            Cell: (cellProps) => {
                return <Archival_Status {...cellProps} />;
            }
        },
        {
            Header: 'Trạng thái',
            accessor: 'status',
            Cell: (cellProps) => {
                return <Status {...cellProps} />;
            }
        },
        {
            Header: 'Thao tác',
            accessor: 'action',
            Cell: (cellProps) => {
                return (
                    <div className="d-flex gap-3">
                        <Link
                            to="#"
                            className="text-success"
                            onClick={() => {
                                // const orderData = cellProps.row.original;
                                // handleOrderClick(orderData);
                            }}
                        >
                            <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                            <UncontrolledTooltip placement="top" target="edittooltip">
                                Edit
                            </UncontrolledTooltip>
                        </Link>
                        <Link
                            to="#"
                            className="text-danger"
                            onClick={() => {
                                // const orderData = cellProps.row.original;
                                // onClickDelete(orderData);
                            }}
                        >
                            <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                            <UncontrolledTooltip placement="top" target="deletetooltip">
                                Delete
                            </UncontrolledTooltip>
                        </Link>
                    </div>
                );
            }
        }
    ], []);

    const createTableData = (item) => {
        const id = (
            <div className="form-check font-size-16" >
                <input className="form-check-input" type="checkbox" id="checkAll" />
                <label className="form-check-label" htmlFor="checkAll"></label>
            </div>
        );
        const name = (
            <div>
                <img src={avata} width={'30px'} className="me-2" />
                {item.name}
            </div>
        );
        const factory = item.factory;
        const archival_status = item.archival_status;
        const status = (
            item.status.split(',').map(e => (
                <Badge pill color={getColor(e)} className="px-2 py-2 ms-1" key={e}>
                    {e}
                </Badge>
            ))
        );
        const action = (
            <div className="d-flex flex-wrap gap-2">
                <button
                    type="button"
                    className="btn btn-success  sm"
                    onClick={() => alert(`Edit item name: ${item.name}`)}
                >
                    <i className="mdi mdi-pencil d-block font-size-14"></i>{" "}
                </button>
                <button
                    type="button"
                    className="btn btn-danger  sm"
                    onClick={() => alert(`Delete item name: ${item.name}`)}
                >
                    <i className="mdi mdi-trash-can d-block font-size-14"></i>{" "}
                </button>
            </div>
        )

        return { id, name, factory, archival_status, status, action }
    }

    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    {/* <Breadcrumbs title="Intern" breadcrumbItem="Intern" /> */}
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col>
                                    <Breadcrumbs title="" breadcrumbItem="Thực tập sinh" />
                                </Col>
                                <Col>
                                    <div className="d-flex mb-3 justify-content-end">
                                        <Button color="primary" onClick={addForm}>
                                            Thêm mới
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <TableContainer
                                columns={columns}
                                data={data}
                                isGlobalFilter={true}
                                isInternGlobalFilter={true}
                                isAddOptions={false}
                                customPageSize={10}
                                isPagination={true}
                                iscustomPageSizeOptions={true}
                                isInternMenu={true}
                                tableClass="align-middle table-nowrap table-check table"
                                theadClass="table-dark"
                                paginationDiv="col-12"
                                pagination="justify-content-center pagination pagination-rounded"
                            />

                        </CardBody>
                    </Card>


                </Container>
            </div>
        </>
    );
}

InternPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

// export default withRouter(withTranslation()(StatusPage));
export default InternPage;