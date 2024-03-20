import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, CardHeader } from "reactstrap";
import PropTypes from 'prop-types';

// import context
import DataContext from "../../data/DataContext";

import { withTranslation } from "react-i18next";

import TableDatas from "./TableDatas";
import ModalTop from "./ModalTop";


const InternPage = (props) => {
    document.title = "Thực tập sinh";
    // data context
    const {statusData, modal_fullscreen, setmodal_fullscreen, tog_fullscreen} = useContext(DataContext)

    // Modal
    const [isUpdateStatus, setIsUpdateStatus] = useState(false);

    // edit status
    const [status, setStatus] = useState('')

    const [optionGroup, setOptionGroup] = useState([])
    useEffect(() => {
        let arr = statusData.map((item) => {
            return { label: item['name'], value: item['name'] }
        });
        setOptionGroup(arr);
    }, [])

    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <Card>
                        <CardHeader>
                            <ModalTop
                                setStatus={setStatus}
                                isUpdateStatus={isUpdateStatus}
                                optionGroup={optionGroup}
                                setIsUpdateStatus={setIsUpdateStatus}
                            />
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

InternPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

// export default withRouter(withTranslation()(StatusPage));
export default InternPage;