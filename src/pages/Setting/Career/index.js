import React, { useMemo, useState, useEffect, useContext } from "react";
import { Container, Row, Col, CardHeader, Button, CardBody, Card, UncontrolledTooltip } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import { useNavigate, Link } from "react-router-dom";

import DataContext from "data/DataContext";
import { Name, Note } from './CareerColList';

import DeleteModal from "components/Common/DeleteModal";

import { withTranslation } from "react-i18next";

const CareerPage = (props) => {
    document.title = "Nhập ngành nghề";
    const navigate = useNavigate();
    const { careerData, updateCareerData } = useContext(DataContext);

    //delete modal
    const [item, setItem] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (data) => {
        setItem(data);
        setDeleteModal(true);
    };

    const handleDeleteOrder = () => {
        if (item && item.id) {
            console.log('delete id :' + item.id);
            const arr = [...careerData];
            const updateArr = arr.filter(e => e.id !== item.id);
            updateCareerData(updateArr);
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
            Header: 'Ghi chú',
            accessor: 'note',
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

    const addForm = () => {
        navigate('/input-career');
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
                                    <Breadcrumbs title="Ngành nghề" breadcrumbItem="Mẫu ngành nghề" />
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
                                data={careerData}
                                isGlobalFilter={true}
                                isAddOptions={false}
                                customPageSize={10}
                                isPagination={true}
                                iscustomPageSizeOptions={true}
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

CareerPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

// export default withRouter(withTranslation()(StatusPage));
export default CareerPage;