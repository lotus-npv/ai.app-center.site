import React  from "react";
import { Card, CardBody, Container, CardHeader } from "reactstrap";
import PropTypes from 'prop-types';

import TableDatas from "./TableDatas";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const InternPage = () => {
    document.title = "Thực tập sinh";

    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <Card>
                        <ToastContainer />
                        <CardBody>
                            <TableDatas />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
}

InternPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

// export default withRouter(withTranslation()(StatusPage));
export default InternPage;