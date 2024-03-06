import React, { useMemo, useState, useEffect } from "react";
import {Container} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import withRouter from "components/Common/withRouter";

import { withTranslation } from "react-i18next";

const StatusPage = (props) => {
    const [rows, setRows] = useState([]);
    document.title = "Status Page";
    const navigate = useNavigate();

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Type',
                accessor: 'position'
            },
            {
                Header: 'Note',
                accessor: 'office'
            },
            {
                Header: 'Age',
                accessor: 'age'
            },
            {
                Header: 'Start date',
                accessor: 'startDate'
            },
            {
                Header: 'Salary',
                accessor: 'salary'
            },
            {
                Header: 'Action',
                accessor: 'action'
            }
        ],
        []
    );

    const data = [
        {
            name: "Jennifer Chang",
            position: "Regional Director",
            age: 28,
            office: "Singapore",
            startDate: "2010/11/14",
            salary: "$357,650"
        },
        {
            name: "Gavin Joyce",
            position: "Developer",
            age: 42,
            office: "Edinburgh",
            startDate: "2010/12/22",
            salary: "$92,575"
        },
        {
            name: "Angelica Ramos",
            position: "Chief Executive Officer (CEO)",
            age: 47,
            office: "London",
            startDate: "2009/10/09",
            salary: "$1,200,000"
        },
        {
            name: "Doris Wilder",
            position: "Sales Assistant",
            age: 23,
            office: "Sidney",
            startDate: "2010/09/20",
            salary: "$85,600"
        },
        {
            name: "Caesar Vance",
            position: "Pre-Sales Support",
            age: 21,
            office: "New York",
            startDate: "2011/12/12",
            salary: "$106,450"
        },
        {
            name: "Yuri Berry",
            position: "Chief Marketing Officer (CMO)",
            age: 40,
            office: "New York",
            startDate: "2009/06/25",
            salary: "$675,000"
        },
        {
            name: "Jenette Caldwell",
            position: "Development Lead",
            age: 30,
            office: "New York",
            startDate: "2011/09/03",
            salary: "$345,000"
        },
        {
            name: "Dai Rios",
            position: "Personnel Lead",
            age: 35,
            office: "Edinburgh",
            startDate: "2012/09/26",
            salary: "$217,500"
        },
        {
            name: "Bradley Greer",
            position: "Software Engineer",
            age: 41,
            office: "London",
            startDate: "2012/10/13",
            salary: "$132,000"
        },
        {
            name: "Gloria Little",
            position: "Systems Administrator",
            age: 59,
            office: "New York",
            startDate: "2009/04/10",
            salary: "$237,500"
        },
        {
            name: "Paul Byrd",
            position: "Chief Financial Officer (CFO)",
            age: 64,
            office: "New York",
            startDate: "2010/06/09",
            salary: "$725,000"
        },
        {
            name: "Michael Silva",
            position: "Marketing Designer",
            age: 66,
            office: "London",
            startDate: "2012/11/27",
            salary: "$198,500"
        },
        {
            name: "Tatyana Fitzpatrick",
            position: "Regional Director",
            age: 19,
            office: "London",
            startDate: "2010/03/17",
            salary: "$385,750"
        },
        {
            name: "Haley Kennedy",
            position: "Senior Marketing Designer",
            age: 43,
            office: "London",
            startDate: "2012/12/18",
            salary: "$313,500"
        },
        {
            name: "Charde Marshall",
            position: "SRegional Director",
            age: 36,
            office: "San Francisco",
            startDate: "2008/10/16",
            salary: "$470,600"
        },
        {
            name: "Quinn Flynn",
            position: "Support Lead",
            age: 22,
            office: "Edinburgh",
            startDate: "2013/03/03",
            salary: "$342,000"
        },
        {
            name: "Jena Gaines",
            position: "Office Manager",
            age: 30,
            office: "London",
            startDate: "2008/12/19",
            salary: "$90,560"
        },
        {
            name: "Sonya Frost",
            position: "Software Engineer",
            age: 23,
            office: "Edinburgh",
            startDate: "2008/12/13",
            salary: "$103,600"
        }
    ];

    const addForm = () => {
        navigate('/input-status');
    }

    const createTableData = (item) => {
        const name = item.name;
        const position = item.position;
        const age = item.age;
        const office = item.office;
        const startDate = item.startDate;
        const salary = item.salary;
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

        return {name, position, age, office, startDate, salary, action}
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
                    <Breadcrumbs title="Status Form" breadcrumbItem="Status Form" />
                    <div className="d-flex mb-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-success  w-sm"
                            onClick={addForm}
                        >
                            <i className="bx bx-add-to-queue d-block font-size-24"></i>{" "}
                        </button>
                    </div>

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