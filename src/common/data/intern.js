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

const dataIntern = [
    {
        id: 1,
        name: "Phạm Nam",
        avata: avata,
        factory: "BigSun1",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh"],
    },
    {
        id: 2,
        name: "Nguyễn Chung",
        avata: avata,
        factory: "BigSun2",
        archival_status: "TTS số 1",
        status: ["Sắp hết hạn visa"],
    },
    {
        id: 3,
        name: "Hoang Minh",
        avata: avata,
        factory: "BigSun3",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh","Đang xin Visa"],
    },
    {
        id: 4,
        name: "Jennifer Chang",
        avata: avata,
        factory: "BigSun4",
        archival_status: "TTS số 1",
        status: ["Đang làm việc"],
    },
    {
        id: 5,
        name: "Pham Nam",
        avata: avata,
        factory: "BigSun1",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh"],
    },
    {
        id: 6,
        name: "Nguyen Chung",
        avata: avata,
        factory: "BigSun2",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh"],
    },
    {
        id: 7,
        name: "Hoang Minh",
        avata: avata,
        factory: "BigSun3",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh","Đang xin Visa","Đang làm việc"],
    },
    {
        id: 8,
        name: "Jennifer Chang",
        avata: avata,
        factory: "BigSun4",
        archival_status: "TTS số 1",
        status: ["Đang làm việc"],
    },
    {
        id: 9,
        name: "Pham Nam",
        avata: avata,
        factory: "BigSun1",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh"],
    },
    {
        id: 10,
        name: "Nguyen Chung",
        avata: avata,
        factory: "BigSun2",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh"],
    },
    {
        id: 11,
        name: "Hoang Minh",
        avata: avata,
        factory: "BigSun3",
        archival_status: "TTS số 1",
        status: ["Sắp nhập cảnh","Đang xin Visa"],
    },
    {
        id: 12,
        name: "Jennifer Chang",
        avata: avata,
        factory: "BigSun4",
        archival_status: "TTS số 1",
        status: ["Đang làm việc"],
    },

];

export { columns, dataIntern }