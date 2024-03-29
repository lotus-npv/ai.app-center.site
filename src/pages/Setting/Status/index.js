import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import PropTypes from 'prop-types';

import TableDatas from "./TableDatas";

import { withTranslation } from "react-i18next";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageUploadForm from "./ImageUploadForm";

const StatusPage = (props) => {
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
                    <TableDatas />
                    <ToastContainer />
                    {/* <ImageUploadForm save={save} /> */}
                    {/* <button onClick={handChangeSave}>save</button> */}
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