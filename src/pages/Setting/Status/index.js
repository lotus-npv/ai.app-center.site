import React, {useEffect,useState} from "react";
import { Container } from "reactstrap";
import PropTypes from 'prop-types';

import TableDatas from "./TableDatas";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { withTranslation } from "react-i18next";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ProductService } from './ProductService';

const StatusPage = (props) => {
    document.title = "Status Page";
    const [products, setProducts] = useState([]);
    useEffect(() => {
        ProductService.getProductsMini().then(data => setProducts(data));
    }, []);

    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <TableDatas />
                    <ToastContainer />

                    <div className="card">
                        <DataTable value={products} tableStyle={{ minWidth: '50rem' }} showGridlines={true}>
                            <Column field="code" header="Code"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="category" header="Category"></Column>
                            <Column field="quantity" header="Quantity"></Column>
                        </DataTable>
                    </div>

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