import React, { useMemo, useState, useEffect, useContext } from "react";
import { Button, Card, CardBody, Row, Col, Container, UncontrolledTooltip, CardHeader, Modal, Label, Input, FormGroup, InputGroup } from "reactstrap";
import DeleteModal from '../../components/Common/DeleteModal';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Select from "react-select";

//Import Flatepicker
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

// import context
import DataContext from "../../data/DataContext";

import { withTranslation } from "react-i18next";

import ModalTop from './ModalTop';
import ModalDatas from "./ModalDatas";
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
    const [modal_fullscreen, setmodal_fullscreen] = useState(false);

    function tog_standard() {
        setmodal_standard(!modal_standard);
        removeBodyCss();
    }

    function tog_xlarge() {
        setmodal_xlarge(!modal_xlarge);
        removeBodyCss();
    }

    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen);
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

    const [optionGroup, setOptionGroup] = useState([])
    useEffect(() => {
        let arr = statusData.map((item) => {
            return { label: item['name'], value: item['name'] }
        });
        setOptionGroup(arr);
    }, [])

    // console.log(optionGroup)

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
                                        color="gray-soft"
                                        onClick={() => {
                                            tog_standard();
                                            setIsUpdateStatus(true);
                                        }}>
                                        <i className="fas fa-info-circle text-secondary"></i>{' '}
                                        Cập nhật trạng thái
                                    </Button>
                                    <Button
                                        color="gray-soft"
                                        onClick={() => {
                                            tog_standard();
                                            setIsUpdateStatus(false);
                                        }}>
                                        <i className="fas fa-user-shield text-secondary"></i>{' '}
                                        Cập nhật lưu trú
                                    </Button>
                                    <Button
                                        color="gray-soft"
                                        onClick={() => {
                                            tog_xlarge();
                                        }}>
                                        <i className="fas fa-ban text-secondary" ></i>{' '}
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
                            <TableDatas />
                        </CardBody>

                        <ModalTop
                            tog_standard={tog_standard}
                            modal_standard={modal_standard}
                            setmodal_standard={setmodal_standard}
                            setStatus={setStatus}
                            tog_xlarge={tog_xlarge}
                            setmodal_xlarge={setmodal_xlarge}
                            isUpdateStatus={isUpdateStatus}
                            optionGroup={optionGroup}
                            modal_xlarge={modal_xlarge}
                        />

                        <ModalDatas />
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