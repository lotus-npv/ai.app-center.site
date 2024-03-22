import React from "react";
import { CardBody, Container, Card } from "reactstrap";
import PropTypes from 'prop-types';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TableDatas from "./TableDatas";

const DispatchingCompanyPage = (props) => {
    document.title = "Dispatching Company Page";
    return (
        <>
            <div className="page-content">

                <Container fluid={true}>
                    <Card>
                        <CardBody>
                            <TableDatas />
                        </CardBody>
                    </Card>
                    <ToastContainer />
                </Container>
            </div>
        </>
    );
}

DispatchingCompanyPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

// export default withRouter(withTranslation()(StatusPage));
export default DispatchingCompanyPage;