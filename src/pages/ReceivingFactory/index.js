import React, { useMemo, useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, Button, CardHeader, Row, Col, UncontrolledTooltip } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PropTypes from 'prop-types';

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