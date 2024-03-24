import React, { useMemo, useState, useEffect, useContext } from "react";
import { CardBody, CardHeader, Container, Card, Button, Row, Col, UncontrolledTooltip } from "reactstrap";
import PropTypes from 'prop-types';

import TableDatas from "./TableDatas";
import { ToastContainer } from 'react-toastify';

const ViolateListPage = (props) => {
    document.title = "Danh sách vi phạm";
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

ViolateListPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

// export default withRouter(withTranslation()(StatusPage));
export default ViolateListPage;