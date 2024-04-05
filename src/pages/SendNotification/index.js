import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import PropTypes from 'prop-types';


import { withTranslation } from "react-i18next";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormData from "./FormData";

const SendNotificationPage = (props) => {
    const [save, setSave] = useState(false);
    const colorOptions = [
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' }
    ];

    const handChangeSave = () => {
        setSave(!save);
    }

    document.title = "Status Page";
    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <FormData />
                    <ToastContainer />
                </Container>
            </div>
        </>
    );
}

SendNotificationPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

// export default withRouter(withTranslation()(StatusPage));
export default SendNotificationPage;