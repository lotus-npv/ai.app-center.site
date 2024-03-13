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

import avata from '../../assets/images/avata/avata-loading.png'

const dataReceivingFactory = [
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

export {columns, dataReceivingFactory, listCompany}