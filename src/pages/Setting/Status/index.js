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
                Header: 'Tên trạng thái',
                accessor: 'name',
            },
            {
                Header: 'Loại',
                accessor: 'type'
            },
            {
                Header: 'Ghi chú',
                accessor: 'note'
            },
            {
                Header: 'Thao tác',
                accessor: 'action'
            }
        ],
        []
    );

    const data = [
        {
            name: "Đỗ đơn hàng",
            type: "Thủ công",
            note: 'Các bạn thực tập sinh đang ở Việt Nam mới đỗ đơn hàng',
        },
        {
            name: "Đang xin visa",
            type: "Thủ công",
            note: 'Các bạn đang xin visa',
        },
        {
            name: "Sắp nhập cảnh",
            type: "Tự động",
            note: 'TTS sắp nhập cảnh',
        }
    ];

    const addForm = () => {
        navigate('/input-status');
    }

    const createTableData = (item) => {
        const name = item.name;
        const type = item.type;
        const note = item.note;
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

        return {name, type, note, action}
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