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

import avata from '../../assets/images/avata/avata-loading.png'

const dataDispatchingCompany = [
{
    id: 1,
    avata: avata,
    name: "Lotus Ocean",
    phone: "0888382699",
    date: "2010/11/14",
    note: "Singapore",
},
{
    id: 2,
    avata: avata,
    name: "Lotus Japan",
    phone: "0888382699",
    date: "2010/11/14",
    note: "Singapore",
},
{
    id: 3,
    avata: avata,
    name: "Jennifer Chang",
    phone: "0888382699",
    date: "2010/11/14",
    note: "Singapore",
},
{
    id: 4,
    avata: avata,
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

export {columns, dataDispatchingCompany, listCountry}