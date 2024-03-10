const columns = [
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


const data = [
{
    name: "Jennifer Chang",
    factory: "BigSun",
    archival_status: "TTS số 1",
    status: ["Sắp nhập cảnh"],
},
{
    name: "Jennifer Chang",
    factory: "BigSun",
    archival_status: "TTS số 1",
    status: ["Sắp nhập cảnh"],
},
{
    name: "Jennifer Chang",
    factory: "BigSun",
    archival_status: "TTS số 1",
    status: ["Sắp nhập cảnh", "Đang xin Visa"],
},
{
    name: "Jennifer Chang",
    factory: "BigSun",
    archival_status: "TTS số 1",
    status: ["Đang làm việc"],
},

];

export {columns, data}