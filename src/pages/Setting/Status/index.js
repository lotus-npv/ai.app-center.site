import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import PropTypes from 'prop-types';

import TableDatas from "./TableDatas";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { withTranslation } from "react-i18next";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ProductService } from './ProductService';

import { PrimeReactContext } from 'primereact/api';

import Select from "react-select"

const themes = [
    { label: "Bootstrap 4 Light Blue", value: "primereact/resources/themes/bootstrap4-light-blue/theme.css" },
    { label: "Bootstrap 4 Light Purple", value: "primereact/resources/themes/bootstrap4-light-purple/theme.css" },
    { label: "Bootstrap 4 Dark Blue", value: "primereact/resources/themes/bootstrap4-dark-blue/theme.css" },
    { label: "Bootstrap 4 Dark Purple", value: "primereact/resources/themes/bootstrap4-dark-purple/theme.css" },
    { label: "Material Design Light Indigo", value: "primereact/resources/themes/md-light-indigo/theme.css" },
    { label: "Material Design Light Deep Purple", value: "primereact/resources/themes/md-light-deeppurple/theme.css" },
    { label: "Material Design Dark Indigo", value: "primereact/resources/themes/md-dark-indigo/theme.css" },
    { label: "Material Design Dark Deep Purple", value: "primereact/resources/themes/md-dark-deeppurple/theme.css" },
    { label: "Material Design Compact Light Indigo", value: "primereact/resources/themes/mdc-light-indigo/theme.css" },
    { label: "Material Design Compact Light Deep Purple", value: "primereact/resources/themes/mdc-light-deeppurple/theme.css" },
    { label: "Material Design Compact Dark Indigo", value: "primereact/resources/themes/mdc-dark-indigo/theme.css" },
    { label: "Material Design Compact Dark Deep Purple", value: "primereact/resources/themes/mdc-dark-deeppurple/theme.css" },
    { label: "Tailwind Light", value: "primereact/resources/themes/tailwind-light/theme.css" },
    { label: "Fluent Light", value: "primereact/resources/themes/fluent-light/theme.css" },
    { label: "Lara Light Blue", value: "primereact/resources/themes/lara-light-blue/theme.css" },
    { label: "Lara Light Indigo", value: "primereact/resources/themes/lara-light-indigo/theme.css" },
    { label: "Lara Light Purple", value: "primereact/resources/themes/lara-light-purple/theme.css" },
    { label: "Lara Light Teal", value: "primereact/resources/themes/lara-light-teal/theme.css" },
    { label: "Lara Dark Blue", value: "primereact/resources/themes/lara-dark-blue/theme.css" },
    { label: "Lara Dark Indigo", value: "primereact/resources/themes/lara-dark-indigo/theme.css" },
    { label: "Lara Dark Purple", value: "primereact/resources/themes/lara-dark-purple/theme.css" },
    { label: "Lara Dark Teal", value: "primereact/resources/themes/lara-dark-teal/theme.css" },
    { label: "Soho Light", value: "primereact/resources/themes/soho-light/theme.css" },
    { label: "Soho Dark", value: "primereact/resources/themes/soho-dark/theme.css" },
    { label: "Viva Light", value: "primereact/resources/themes/viva-light/theme.css" },
    { label: "Viva Dark", value: "primereact/resources/themes/viva-dark/theme.css" },
    { label: "Mira", value: "primereact/resources/themes/mira/theme.css" },
    { label: "Nano", value: "primereact/resources/themes/nano/theme.css" },
    { label: "Saga Blue", value: "primereact/resources/themes/saga-blue/theme.css" },
    { label: "Saga Green", value: "primereact/resources/themes/saga-green/theme.css" },
    { label: "Saga Orange", value: "primereact/resources/themes/saga-orange/theme.css" },
    { label: "Saga Purple", value: "primereact/resources/themes/saga-purple/theme.css" },
    { label: "Vela Blue", value: "primereact/resources/themes/vela-blue/theme.css" },
    { label: "Vela Green", value: "primereact/resources/themes/vela-green/theme.css" },
    { label: "Vela Orange", value: "primereact/resources/themes/vela-orange/theme.css" },
    { label: "Vela Purple", value: "primereact/resources/themes/vela-purple/theme.css" },
    { label: "Arya Blue", value: "primereact/resources/themes/arya-blue/theme.css" },
    { label: "Arya Green", value: "primereact/resources/themes/arya-green/theme.css" },
    { label: "Arya Orange", value: "primereact/resources/themes/arya-orange/theme.css" },
    { label: "Arya Purple", value: "primereact/resources/themes/arya-purple/theme.css" }
];

const StatusPage = (props) => {
    document.title = "Status Page";
    const [products, setProducts] = useState([]);
    useEffect(() => {
        ProductService.getProductsMini().then(data => setProducts(data));
    }, []);

    const { changeTheme } = useContext(PrimeReactContext);
    const [theme, setTheme] = useState('primereact/resources/themes/bootstrap4-light-blue/theme.css');

    const handleChange = (item) => {
        const newTheme = item.value;
        console.log(newTheme);
        changeTheme(theme, newTheme);
        setTheme(newTheme);
    };

    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <TableDatas />
                    <ToastContainer />

                    {/* <div className="card">
                        <DataTable value={products} tableStyle={{ minWidth: '50rem' }} showGridlines={true}>
                            <Column field="code" header="Code"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="category" header="Category"></Column>
                            <Column field="quantity" header="Quantity"></Column>
                        </DataTable>
                    </div> */}

                    <Select
                        value={theme}
                        onChange={(item) => {
                            
                            handleChange(item);
                        }}
                        options={themes}
                        className="select2-selection"
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