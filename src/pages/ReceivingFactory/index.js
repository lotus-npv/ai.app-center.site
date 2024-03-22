import React from "react";
import { Card, CardBody, Container} from "reactstrap";
import PropTypes from 'prop-types';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TableDatas from "./TableDatas";


const ReceivingFactoryPage = (props) => {
    document.title = "Receiving Factory Page";
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

ReceivingFactoryPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

// export default withRouter(withTranslation()(StatusPage));
export default ReceivingFactoryPage;