import React, { useMemo, useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, Button, CardHeader, Row, Col, UncontrolledTooltip } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from '../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import DataContext from "../../data/DataContext";

import DeleteModal from '../../components/Common/DeleteModal';

import { withTranslation } from "react-i18next";

const schedule = require('node-schedule');
// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getInternAllInfo, updateIntern, deleteIntern, setIntern, getStatusAll, getStatusDetailAll, getAddressAll, getAlienRegistrationCardAll } from "store/actions";

import { Avata, Name, Phone, JontDate, Note } from './TicketColList'

const TicketPage = (props) => {
    document.title = "Ticket Page";
    const navigate = useNavigate();


    const dispatch = useDispatch();


    const [count , setCount] = useState(1)

    const crontab = () => {
        console.log('start job');
        const job = schedule.scheduleJob('1 * * * * *', function(){
            dispatch(getStatusAll());
            setCount(count + 1);
            console.log('The answer to life, the universe, and everything!');
          });
    }

    const cancelJob = () => {
        console.log('start job 2');

        const date = new Date(2024, 3,  23, 17, 10, 0);
        const job3 = schedule.scheduleJob(date, function(){
            dispatch(getStatusAll());
            console.log('The world is going to end today.');
          });
    }












    const {receivingFactoryDatas , updateReceivingFactoryDatas} = useContext(DataContext);

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
            const arr = [...receivingFactoryDatas];
            const updateArr = arr.filter(e => e.id !== item.id);
            updateReceivingFactoryDatas(updateArr);
            setDeleteModal(false);
        }
    };

    const addForm = () => {
        navigate('/create-ticket');
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
            Header: 'Tiêu đề',
            accessor: 'name',
            Cell: (cellProps) => {
                return <Name {...cellProps} />;
            }
        },
        {
            Header: 'Nộ dung',
            accessor: 'phone',
            Cell: (cellProps) => {
                return <Phone {...cellProps} />;
            }
        },
        {
            Header: 'Ngày gửi',
            accessor: 'date',
            Cell: (cellProps) => {
                return <JontDate {...cellProps} />;
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
                            <i className="mdi mdi-eye font-size-24" id="edittooltip" />
                            <UncontrolledTooltip placement="top" target="edittooltip">
                                View Detail
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
                            <h3>Count: {count}</h3>
                            <Button onClick={() => {
                                crontab();
                            }}>
                                JOB1
                            </Button>
                            <Button onClick={() => {
                                cancelJob();
                            }}>
                                JOB2
                            </Button>
                            <Row>
                                <Col>
                                    <Breadcrumbs title="" breadcrumbItem="Hỗ trợ" />
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
                                data={receivingFactoryDatas}
                                isGlobalFilter={true}
                                isAddOptions={false}
                                customPageSize={10}
                                isPagination={true}
                                iscustomPageSizeOptions={true}
                                isFactoryMenu={true}
                                isFactoryGlobalFilter={false}
                                isInternGlobalFilter={true}
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

TicketPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

// export default withRouter(withTranslation()(StatusPage));
export default TicketPage;