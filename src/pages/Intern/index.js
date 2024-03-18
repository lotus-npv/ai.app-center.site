import React, { useMemo, useState, useEffect, useContext } from "react";
import { Button, Card, CardBody, Row, Col, Container, UncontrolledTooltip, CardHeader, Modal, Label, Input, FormGroup, InputGroup } from "reactstrap";
import DeleteModal from '../../components/Common/DeleteModal';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Select from "react-select";

// import TableContainer from './TableContainer';
// import TableContainer from "components/Common/TableContainer";

//Import Flatepicker
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

// import context
import DataContext from "../../data/DataContext";

import { Avata, Name, Factory, Archival_Status, Status } from './InternColList';

import { withTranslation } from "react-i18next";

import TableDatas from "./TableDatas";


const InternPage = (props) => {
    document.title = "Thực tập sinh";
    const navigate = useNavigate();

    // data context
    const { internDatas, updateInternDatas, statusData } = useContext(DataContext)

    //delete modal
    const [intern, setIntern] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (internData) => {
        setIntern(internData);
        console.log(internData)
        setDeleteModal(true);
    };

    const handleDeleteOrder = () => {
        if (intern && intern.id) {
            console.log('delete id :' + intern.id);
            const arr = [...internDatas];
            const updateArr = arr.filter(item => item.id !== intern.id);
            updateInternDatas(updateArr);
            setDeleteModal(false);
        }
    };

    // Modal
    const [isUpdateStatus, setIsUpdateStatus] = useState(false);
    const [modal_standard, setmodal_standard] = useState(false);
    const [modal_xlarge, setmodal_xlarge] = useState(false);

    function tog_standard() {
        setmodal_standard(!modal_standard);
        removeBodyCss();
    }

    function tog_xlarge() {
        setmodal_xlarge(!modal_xlarge);
        removeBodyCss();
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    // move to edit form
    const addForm = () => {
        navigate('/input-intern');
    }

    // edit status
    const [status, setStatus] = useState('')

    // column table
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
                            <i className="mdi mdi-pencil font-size-24" id="edittooltip" />
                            <UncontrolledTooltip placement="top" target="edittooltip">
                                Edit
                            </UncontrolledTooltip>
                        </Link>
                        <Link
                            to="#"
                            className="text-danger"
                            onClick={() => {
                                const internData = cellProps.row.original;
                                onClickDelete(internData);
                            }}
                        >
                            <i className="mdi mdi-delete font-size-24" id="deletetooltip" />
                            <UncontrolledTooltip placement="top" target="deletetooltip">
                                Delete
                            </UncontrolledTooltip>
                        </Link>
                    </div>
                );
            }
        }
    ], []);

    const columnsOfViolateTable = useMemo(() => [
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
            Header: 'Số điện thoại',
            accessor: 'phone',
            Cell: (cellProps) => {
                return <Factory {...cellProps} />;
            }
        },
        {
            Header: 'Xí nghiệp',
            accessor: 'factory',
            Cell: (cellProps) => {
                return <Archival_Status {...cellProps} />;
            }
        },
        {
            Header: 'Ghi chú',
            accessor: 'note',
            Cell: (cellProps) => {
                return <Status {...cellProps} />;
            }
        },
        {
            Header: 'Thao tác',
            accessor: 'action',
            Cell: (cellProps) => {
                return (
                    <div className="
                    ">
                        <Link
                            to="#"
                            className="text-danger"
                            onClick={() => {
                                const internData = cellProps.row.original;
                                onClickDelete(internData);
                            }}
                        >
                            <i className="mdi mdi-delete font-size-24" id="deletetooltip" />
                            <UncontrolledTooltip placement="top" target="deletetooltip">
                                Delete
                            </UncontrolledTooltip>
                        </Link>
                    </div>
                );
            }
        }
    ], []);

    const [optionGroup, setOptionGroup] = useState([])
    useEffect(() => {
        let arr = statusData.map((item) => {
            return { label: item['name'], value: item['name'] }
        });
        setOptionGroup(arr);
    }, [])

    console.log(optionGroup)

    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <DeleteModal
                        show={deleteModal}
                        onDeleteClick={handleDeleteOrder}
                        onCloseClick={() => setDeleteModal(false)}
                    />
                    <Card>
                        <CardHeader>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex gap-3">
                                    <Button
                                        onClick={() => {
                                            tog_standard();
                                            setIsUpdateStatus(true);
                                        }}>
                                        <i className="fas fa-info-circle"></i>{' '}
                                        Cập nhật trạng thái
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            tog_standard();
                                            setIsUpdateStatus(false);
                                        }}>
                                        <i className="fas fa-user-shield"></i>{' '}
                                        Cập nhật lưu trú
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            tog_xlarge();
                                        }}>
                                        <i className="fas fa-ban"></i>{' '}
                                        Thêm vi phạm
                                    </Button>
                                </div>
                                <div>
                                    <Button color="primary" onClick={addForm}>
                                        Thêm mới
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>

                        <CardBody>

                            <TableDatas/>            
                        </CardBody>
                    </Card>

                    <Modal
                        isOpen={modal_standard}
                        toggle={() => {
                            tog_standard();
                        }}
                    >
                        <div className="modal-header bg-primary">
                            <h4 className="modal-title mt-0 text-light" id="myModalLabel">
                                {isUpdateStatus ? 'Cập nhật trạng thái' : 'Cập nhật tư cách lưu trú'}
                            </h4>
                            <button
                                type="button"
                                onClick={() => {
                                    setmodal_standard(false);
                                }}
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <Card>
                            <CardBody >
                                {isUpdateStatus && <div className="modal-body">
                                    <Label htmlFor="edit-status">Trạng thái</Label>
                                    <Select
                                        name='status'
                                        placeholder='Chọn trạng thái'
                                        value={status}
                                        onChange={(item) => {
                                            setStatus(item['name']);
                                        }}
                                        options={optionGroup}
                                    />
                                </div>}
                                {!isUpdateStatus && <div className="modal-body">
                                    <Label htmlFor="edit-status">Tư cách lưu trú</Label>
                                    <Select
                                        name='status'
                                        placeholder='Chọn tư cách lưu trú'
                                        value={status}
                                        onChange={(item) => {
                                            setStatus(item['name']);
                                        }}
                                        options={optionGroup}
                                    />
                                </div>}
                            </CardBody>
                        </Card>
                        <div className="modal-footer">
                            <button
                                type="button"
                                onClick={() => {
                                    tog_standard();
                                }}
                                className="btn btn-secondary "
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary "
                            >
                                Save changes
                            </button>
                        </div>
                    </Modal>

                    <Modal
                        size="xl"
                        isOpen={modal_xlarge}
                        toggle={() => {
                            tog_xlarge();
                        }}
                    >
                        <div className="modal-header bg-primary">
                            <h4
                                className="modal-title mt-0 text-light"
                                id="myExtraLargeModalLabel"
                            >
                                Thêm vi phạm
                            </h4>
                            <button
                                onClick={() => {
                                    setmodal_xlarge(false);
                                }}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Card>
                                <CardBody >
                                    <Row className="mb-4">
                                        <Col lg={3}>
                                            <div className="mb-4">
                                                <Label>Default Functionality</Label>
                                                <Flatpickr
                                                    className="form-control d-block"
                                                    placeholder="yyyy-MM-dd"
                                                    options={{
                                                        altInput: true,
                                                        altFormat: "Y-m-d",
                                                        dateFormat: "Y-m-d"
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="mb-4">
                                                <Label htmlFor="edit-status">Loại vi phạm</Label>
                                                <Select
                                                    id='edit-status'
                                                    name='status'
                                                    placeholder='Chọn tư cách lưu trú'
                                                    value={status}
                                                    onChange={(item) => {
                                                        setStatus(item['name']);
                                                    }}
                                                    options={optionGroup}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-4">
                                                <Label htmlFor="note">Ghi chú</Label>
                                                <Input
                                                    id='note'
                                                    name="note"
                                                    type="text"
                                                    onChange={(e) => Ơ
                                                    }
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="pb-3">
                                        <Col lg={3}>
                                            <h5>Hình ảnh vi phạm</h5>
                                            <Button><i className="fas fa-plus"></i></Button>
                                        </Col>
                                        <Col>

                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={12}>
                                            <div className="mb-3">
                                                <Label>Danh sách TTS vi phạm</Label>
                                                <Select
                                                    id="search"
                                                    name="search_intern"
                                                    value={status}
                                                    onChange={() => {
                                                        // handleSelectGroup();
                                                    }}
                                                    options={optionGroup}
                                                // className="select2-selection"
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row >
                                        {/* <TableContainer
                                                    columns={columnsOfViolateTable}
                                                    data={internDatas}
                                                    isGlobalFilter={false}
                                                    isAddOptions={false}
                                                    customPageSize={5}
                                                    isPagination={true}
                                                    iscustomPageSizeOptions={false}
                                                    isInternMenu={false}
                                                    tableClass="align-middle table-nowrap table-check table"
                                                    theadClass="table-dark"
                                                    paginationDiv="col-12"
                                                    pagination="justify-content-center pagination pagination-rounded"
                                                /> */}
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                onClick={() => {
                                    tog_xlarge();
                                }}
                                className="btn btn-secondary "
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary "
                            >
                                Save changes
                            </button>
                        </div>
                    </Modal>
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