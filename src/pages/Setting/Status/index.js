import React, { useMemo, useState, useEffect, useContext } from "react";
import { Container, Card, CardHeader, CardBody, Row, Col, Button, UncontrolledTooltip, Label, Input, Modal } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Name, Type, Note } from './StatusColList';
import DataContext from "data/DataContext";

import DeleteModal from "components/Common/DeleteModal";

import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getStatusAll, updateStatus, deleteStatus } from "store/actions";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StatusPage = (props) => {
    document.title = "Status Page";
    const navigate = useNavigate();
    const { statusData, updateStatusData } = useContext(DataContext);

    // Row selected edit
    const [rowSelect, setRowSelect] = useState(null)

    const dispatch = useDispatch();
    const { datas } = useSelector(state => ({
        datas: state.Status.datas
    }), shallowEqual);

    useEffect(() => {
        dispatch(getStatusAll());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getStatusAll());
    }, [datas]);

    console.log(datas)

    // modal edit
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
            dispatch(deleteStatus(item.id));

            setDeleteModal(false);
        }
    };

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
            Header: 'Tên trạng thái',
            accessor: 'name',
            Cell: (cellProps) => {
                return <Name {...cellProps} />;
            }
        },
        {
            Header: 'Loại',
            accessor: 'status_type',
            Cell: (cellProps) => {
                return <Type {...cellProps} />;
            }
        },
        {
            Header: 'Ghi chú',
            accessor: 'description',
            Cell: (cellProps) => {
                return <Note {...cellProps} />;
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
                                // tog_xlarge();
                                // setRowSelect(cellProps.row.original);
                                const rowData = cellProps.row.original;
                                navigate('/input-status', { state: { data: rowData, isEdit: true } });
                                // goForm(rowData);
                            }}
                        >
                            <i className="mdi mdi-pencil font-size-24" id="edittooltip" />
                            <UncontrolledTooltip placement="top" target="edittooltip">
                                Edit
                            </UncontrolledTooltip>
                        </Link>
                        <Button onClick={() => {
                            const rowData = cellProps.row.original;
                            navigate('/input-status', { state: { data: rowData, isEdit: true } });
                        }}>
                            GO
                        </Button>
                        <Link
                            to="#"
                            className="text-danger"
                            onClick={() => {
                                const data = cellProps.row.original;
                                onClickDelete(data);
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

    const goForm = (rowData) => {
        navigate('/input-status', { state: { data: rowData, isEdit: true } });
    }

    const addForm = () => {
        navigate('/input-status', {
            state: {
                data: {
                    name: null,
                    note: null,
                    auto: 'manual',
                    condition: null,
                    condition_date: null,
                    number: null,
                }, isEdit: false
            }
        });
    }

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
                            <Row>
                                <Col>
                                    <Breadcrumbs title="" breadcrumbItem="Mẫu Trạng thái" />
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
                                data={datas}
                                isGlobalFilter={true}
                                isInternGlobalFilter={false}
                                isAddOptions={false}
                                customPageSize={10}
                                isPagination={true}
                                iscustomPageSizeOptions={true}
                                isInternMenu={false}
                                tableClass="align-middle table-nowrap table-check table"
                                theadClass="table-dark"
                                paginationDiv="col-12"
                                pagination="justify-content-center pagination pagination-rounded"
                            />

                        </CardBody>
                    </Card>
                    <Modal
                        size="xl"
                        isOpen={modal_xlarge}
                        toggle={() => {
                            tog_xlarge();
                        }}
                    >
                        <div className="modal-header">
                            <h5
                                className="modal-title mt-0"
                                id="myExtraLargeModalLabel"
                            >
                                Extra large modal
                            </h5>
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
                            <div className="mb-4">
                                <Label htmlFor="name">Tên ngành nghề</Label>
                                <Input
                                    id='name'
                                    name="name"
                                    type="text"
                                    value={rowSelect != null ? rowSelect.name : ''}
                                    onChange={(e) => {
                                        setRowSelect({ ...rowSelect, name: e.target.value });
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="note">Ghi chú</Label>
                                <Input
                                    id='note'
                                    name="note"
                                    type="text"
                                    value={rowSelect != null ? rowSelect.description : ''}
                                    onChange={(e) => {
                                        setRowSelect({ ...rowSelect, description: e.target.value });
                                    }}
                                />
                            </div>
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
                                onClick={() => {
                                    dispatch(updateCareer(rowSelect));
                                    tog_xlarge();
                                }}
                            >
                                Save changes
                            </button>
                        </div>
                    </Modal>
                    <ToastContainer />
                </Container>
            </div>
        </>
    );
}

StatusPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

// export default withRouter(withTranslation()(StatusPage));
export default StatusPage;