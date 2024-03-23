import React, { useMemo, useState, useEffect, useContext } from "react";
import { Button, Card, CardBody, Row, Col, Container, UncontrolledTooltip, CardHeader, Modal, Label, Input, FormGroup, InputGroup } from "reactstrap";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Select from "react-select";
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

import { useTranslation } from "react-i18next";

// import context
import DataContext from "../../data/DataContext";

const ModalTop = ({  setStatus,  isUpdateStatus, setIsUpdateStatus, optionGroup }) => {
    const { t } = useTranslation();
    // data context
    const { tog_fullscreen, setIsEditIntern, tog_standard, modal_standard, setmodal_standard,modal_xlarge,tog_xlarge, setmodal_xlarge } = useContext(DataContext)

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <div className="d-flex gap-3">
                    <Button
                        color="gray-soft"
                        onClick={() => {
                            tog_standard();
                            setIsUpdateStatus(true);
                        }}>
                        <i className="fas fa-info-circle text-secondary"></i>{' '}
                        {t('Update Status')}
                    </Button>
                    <Button
                        color="gray-soft"
                        onClick={() => {
                            tog_standard();
                            setIsUpdateStatus(false);
                        }}>
                        <i className="fas fa-user-shield text-secondary"></i>{' '}
                        {t('Residence update')}
                    </Button>
                    <Button
                        color="gray-soft"
                        onClick={() => {
                            tog_xlarge();
                        }}>
                        <i className="fas fa-ban text-secondary" ></i>{' '}
                        {t('Add violations')}
                    </Button>
                </div>
                <div>
                    <Button color="primary" onClick={() => {
                        setIsEditIntern(false);
                        tog_fullscreen();
                    }}>
                        {t('Add Intern')}
                    </Button>
                </div>
            </div>
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
                            <Label htmlFor="edit-status">{t('Status')}</Label>
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
                            <Label htmlFor="edit-status">{t('Residence Status')}</Label>
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
                        {t('Cancel')}
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary "
                    >
                        {t('Save')}
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
        </>
    )
}

export default ModalTop;