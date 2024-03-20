import React, { useMemo, useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, Button, CardHeader, Row, Col, UncontrolledTooltip } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PropTypes from 'prop-types';

import DataContext from "../../data/DataContext";
import TableDatas from "./TableDatas";


const ReceivingFactoryPage = (props) => {
    document.title = "Receiving Factory Page";
    const { modal_fullscreen, setmodal_fullscreen, tog_fullscreen } = useContext(DataContext)

    return (
        <>
            <div className="page-content">

                <Container fluid={true}>
                    <Card>
                        <CardHeader>
                            <div className="d-flex mb-3 justify-content-end">
                                <Button color="primary" onClick={() => {
                                    // setIsEditIntern(false);
                                    tog_fullscreen();
                                }}>
                                    Thêm mới
                                </Button>
                            </div>
                        </CardHeader>
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