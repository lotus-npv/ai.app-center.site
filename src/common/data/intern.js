import React from "react";

const columns = [
    {
        Header: () => <div className="form-check font-size-16" >
            <input className="form-check-input" type="checkbox" id="checkAll" />
            <label className="form-check-label" htmlFor="checkAll"></label>
        </div>,
        accessor: 'id',
        filterable: false,
    },
    {
        Header: 'Avata',
        accessor: 'avata',
    },
    {
        Header: 'Tên',
        accessor: 'name',
    },
    {
        Header: 'Xí nghiệp',
        accessor: 'factory'
    },
    {
        Header: 'Tư cách lưu trú',
        accessor: 'archival_status'
    },
    {
        Header: 'Trạng thái',
        accessor: 'status'
    },
    {
        Header: 'Thao tác',
        accessor: 'action'
    }
]

import avata from '../../assets/images/avata/avata-loading.png'

const data = [
    {
        name: "Phạm Nam",
        avata: avata,
        factory: "BigSun1",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh"],
    },
    {
        name: "Nguyễn Chung",
        avata: avata,
        factory: "BigSun2",
        archival_status: "TTS số 1",
        status: ["Sắp hết hạn visa"],
    },
    {
        name: "Hoang Minh",
        avata: avata,
        factory: "BigSun3",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh","Đang xin Visa"],
    },
    {
        name: "Jennifer Chang",
        avata: avata,
        factory: "BigSun4",
        archival_status: "TTS số 1",
        status: ["Đang làm việc"],
    },
    {
        name: "Pham Nam",
        avata: avata,
        factory: "BigSun1",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh"],
    },
    {
        name: "Nguyen Chung",
        avata: avata,
        factory: "BigSun2",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh"],
    },
    {
        name: "Hoang Minh",
        avata: avata,
        factory: "BigSun3",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh","Đang xin Visa","Đang làm việc"],
    },
    {
        name: "Jennifer Chang",
        avata: avata,
        factory: "BigSun4",
        archival_status: "TTS số 1",
        status: ["Đang làm việc"],
    },
    {
        name: "Pham Nam",
        avata: avata,
        factory: "BigSun1",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh"],
    },
    {
        name: "Nguyen Chung",
        avata: avata,
        factory: "BigSun2",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh"],
    },
    {
        name: "Hoang Minh",
        avata: avata,
        factory: "BigSun3",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh","Đang xin Visa"],
    },
    {
        name: "Jennifer Chang",
        avata: avata,
        factory: "BigSun4",
        archival_status: "TTS số 1",
        status: ["Đang làm việc"],
    },

];

export { columns, data }