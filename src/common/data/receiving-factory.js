const columns = [
    {
        Header: 'Tên xí nghiệp',
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

const listCompany = [
    {
        name: 'All',
        value: 20
    },
    {
        name: 'Tokio',
        value: 5
    },
    {
        name: 'Oasaka',
        value: 5
    },
    {
        name: 'Okayama',
        value: 5
    },
    {
        name: 'Hokkaido',
        value: 5
    },
]

export {columns, data, listCompany}