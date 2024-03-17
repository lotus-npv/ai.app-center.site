import React from "react";
import { Container, CardBody, Card } from "reactstrap";
import PropTypes from 'prop-types';

import { withTranslation } from "react-i18next";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TableDatas from "./TableDatas";

const CareerPage = () => {
    document.title = "Nhập ngành nghề";
    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    {/* <Card>
                        <CardBody>
                           
                        </CardBody>
                    </Card> */}
                    <TableDatas />
                    <ToastContainer />
                </Container>
            </div>
        </>
    );

}

CareerPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

// export default withRouter(withTranslation()(StatusPage));
export default CareerPage;
