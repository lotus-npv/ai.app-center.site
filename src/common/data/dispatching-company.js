const columns = [
    {
        Header: 'Tên công ty',
        accessor: 'name',
    },
    {
        Header: 'Số điện thoại',
        accessor: 'phone'
    },
    {
        Header: 'Ngày gia nhập',
        accessor: 'date'
    },
    {
        Header: 'Ghi chú',
        accessor: 'note'
    },
    {
        Header: 'Thao tác',
        accessor: 'action'
    }
]


const data = [
{
    name: "Lotus Ocean",
    phone: "0888382699",
    date: "2010/11/14",
    note: "Singapore",
},
{
    name: "Lotus Japan",
    phone: "0888382699",
    date: "2010/11/14",
    note: "Singapore",
},
{
    name: "Jennifer Chang",
    phone: "0888382699",
    date: "2010/11/14",
    note: "Singapore",
},
{
    name: "Jennifer Chang",
    phone: "0888382699",
    date: "2010/11/14",
    note: "Singapore",
}
];

const listCountry = [
    {
        name: 'All',
        value: 20
    },
    {
        name: 'Việt Nam',
        value: 5
    },
    {
        name: 'Trung Quốc',
        value: 5
    },
    {
        name: 'Indonesia',
        value: 5
    },
    {
        name: 'Philippin',
        value: 5
    },
]

export {columns, data, listCountry}