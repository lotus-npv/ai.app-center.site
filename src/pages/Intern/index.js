import React, { useMemo, useState, useEffect } from "react";
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, InputGroup, Label, Row, Badge } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from './TableContainer';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import { columns, data } from '../../common/data/intern'
import Select from "react-select";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

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
        switch(status) {
            case 'Sắp nhập cảnh':
                return "primary"
            case 'Đang xin Visa':
                return "info"
            case 'Đang làm việc':
                return "success"

        }
    }

    const createTableData = (item) => {
        const name = item.name;
        const factory = item.factory;
        const archival_status = item.archival_status;
        const status = (
            item.status.map(e => (
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

        return { name, factory, archival_status, status, action }
    }

    useEffect(() => {
        let arr = [];
        const fetchAllData = () => {
            arr = data.map((e) => createTableData(e));
        };
        fetchAllData();
        setRows(arr);
    }, []);



    return (
        <>
            <div className="page-content">

                <Container fluid={true}>
                    <Breadcrumbs title="Intern" breadcrumbItem="Intern" />
                    <div className="d-flex mb-3 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-success  w-sm"
                            onClick={addForm}
                        >
                            <i className="bx bx-add-to-queue d-block font-size-24"></i>{" "}
                        </button>
                    </div>

                    <Card>
                        <CardBody>
                            <form>
                                <Row>
                                    <Col lg={2}>
                                        <Select
                                            placeholder='Quốc gia'
                                            value={selectedGroup}
                                            onChange={() => {
                                                handleSelectGroup();
                                            }}
                                            options={optionGroup}
                                            className="select2-selection"
                                        />
                                    </Col>
                                    <Col lg={2}>
                                        <div>
                                            <Select
                                                placeholder='Xí nghiệp'
                                                value={selectedGroup}
                                                onChange={() => {
                                                    handleSelectGroup();
                                                }}
                                                options={optionGroup}
                                                className="select3-selection"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={2}>
                                        <div>
                                            {/* <Label>Single Select</Label> */}
                                            <Select
                                                placeholder='Phái cử'
                                                value={selectedGroup}
                                                onChange={() => {
                                                    handleSelectGroup();
                                                }}
                                                options={optionGroup}
                                                className="select4-selection"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={2}>
                                        <div>
                                            {/* <Label>Single Select</Label> */}
                                            <Select
                                                placeholder='Tư cách lưu trú'
                                                value={selectedGroup}
                                                onChange={() => {
                                                    handleSelectGroup();
                                                }}
                                                options={optionGroup}
                                                className="select5-selection"
                                            />
                                        </div>
                                    </Col>

                                    <Col lg={3}>
                                        <FormGroup >
                                            <InputGroup>
                                                <Flatpickr
                                                    className="form-control d-block"
                                                    placeholder="dd/mm/yyyy ~ dd/mm/yyyy"
                                                    options={{
                                                        mode: "range",
                                                        dateFormat: "Y-m-d"
                                                    }}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={1} >
                                        <Button className="w-100">Lọc</Button>
                                    </Col>
                                </Row>
                            </form>

                            <TableContainer
                                columns={columns}
                                data={rows}
                                isGlobalFilter={true}
                                isAddOptions={false}
                                customPageSize={10}
                                isPagination={true}
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