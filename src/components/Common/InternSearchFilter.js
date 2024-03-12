import React, { useState } from 'react';
import { Col, Row, FormGroup, Input, InputGroup } from 'reactstrap';

//flatpickr
import "flatpickr/dist/themes/material_blue.css";
import FlatPickr from "react-flatpickr";
import Select from "react-select";

const optionFactory = [
    { label: "BigSun1", value: "BigSun1" },
    { label: "BigSun2", value: "BigSun2" },
    { label: "BigSun3", value: "BigSun3" }
];

const optionName = [
    { label: "Nam", value: "Nam" },
    { label: "Chang", value: "Chang" },
    { label: "Chung", value: "Chung" }
];

const InternSearchFilter = ({ setGlobalFilter }) => {
    const [selectDate, setSelectDate] = useState();

    const [selectedMulti, setselectedMulti] = useState([]);
    const [selectedMulti1, setselectedMulti1] = useState([]);
    const [selectedMulti2, setselectedMulti2] = useState([]);
    const [selectedMulti3, setselectedMulti3] = useState([]);

    const [selectDateRange, setSelectDateRange] = useState([null, null]);

    function handleMulti(items) {
        console.log('items:' + items.length)
        setselectedMulti(items);
        if (items.length > 0) {
            setGlobalFilter(items[0]['value'])
        } else {
            setGlobalFilter('')
        }
    }
    function handleMulti1(items) {
        console.log('items:' + items.length)
        setselectedMulti1(items);
        if (items.length > 0) {
            setGlobalFilter(items[0]['value'])
        } else {
            setGlobalFilter('')
        }
    }
    function handleMulti2(items) {
        console.log('items:' + items.length)
        setselectedMulti2(items);
        if (items.length > 0) {
            setGlobalFilter(items[0]['value'])
        } else {
            setGlobalFilter('')
        }
    }
    function handleMulti3(items) {
        console.log('items:' + items.length)
        setselectedMulti3(items);
        if (items.length > 0) {
            setGlobalFilter(items[0]['value'])
        } else {
            setGlobalFilter('')
        }
    }

    function handleSelectDate(items) {
        setSelectDateRange(items);
    }

    function handleClear() {
        setselectedMulti([]);
        setselectedMulti1([]);
        setselectedMulti2([]);
        setselectedMulti3([]);
        setSelectDateRange([null, null]);
        setGlobalFilter('');
    }

    console.log(selectDateRange)
    return (
        <React.Fragment>
            <Row>

                <Col xl={2} lg={3} className='mb-1'>
                    <Select
                        value={selectedMulti}
                        placeholder={'Xi nghiep'}
                        isMulti={true}
                        onChange={(items) => {
                            if (selectedMulti.length > 0) {
                                const arr = items.filter(item => item !== selectedMulti[0]);
                                handleMulti(arr);
                            } else {
                                handleMulti(items);
                            }
                        }}
                        options={optionFactory}
                        className="select2-selection"
                        isClearable={false}
                    />
                </Col>
                <Col xl={2} lg={3} className='mb-1'>
                    <Select
                        value={selectedMulti1}
                        placeholder={'Name'}
                        isMulti={true}
                        onChange={(items) => {
                            if (selectedMulti1.length > 0) {
                                const arr = items.filter(item => item !== selectedMulti1[0]);
                                handleMulti1(arr);
                            } else {
                                handleMulti1(items);
                            }
                        }}
                        options={optionName}
                        className="select2-selection"
                        isClearable={false}
                    />
                </Col>
                <Col xl={2} lg={3} className='mb-1'>
                    <Select
                        value={selectedMulti2}
                        placeholder={'Name'}
                        isMulti={true}
                        onChange={(items) => {
                            if (selectedMulti2.length > 0) {
                                const arr = items.filter(item => item !== selectedMulti2[0]);
                                handleMulti2(arr);
                            } else {
                                handleMulti2(items);
                            }
                        }}
                        options={optionName}
                        className="select2-selection"
                        isClearable={false}
                    />
                </Col>
                <Col xl={2} lg={3} className='mb-1'>
                    <Select
                        value={selectedMulti3}
                        placeholder={'Name'}
                        isMulti={true}
                        onChange={(items) => {
                            if (selectedMulti3.length > 0) {
                                const arr = items.filter(item => item !== selectedMulti3[0]);
                                handleMulti3(arr);
                            } else {
                                handleMulti3(items);
                            }
                        }}
                        options={optionName}
                        className="select2-selection"
                        isClearable={false}
                    />
                </Col>
                <Col xl={3} lg={3} className='mb-1'>
                    <FormGroup >
                        <InputGroup>
                            <FlatPickr
                                value={selectDateRange}
                                className="form-control d-block"
                                placeholder="dd/mm/yyyy ~ dd/mm/yyyy"
                                options={{
                                    mode: "range",
                                    dateFormat: "Y-m-d"
                                }}
                                onChange={(e) => {
                                    handleSelectDate(e);
                                }}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col md={1} xl={1} className='mb-1'>
                    <div className='mb-3 mb-xxl-0'>
                        <button type="button" className="btn btn-primary-2 w-100"  onClick={handleClear}>
                            <i className="mdi mdi-close-thick align-middle"></i></button>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
};
export default InternSearchFilter;

