import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import PropTypes from 'prop-types';

import TableDatas from "./TableDatas";

import { withTranslation } from "react-i18next";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageUploadForm from "./ImageUploadForm";
import { Button } from "primereact/button";

const StatusPage = (props) => {
    const colorOptions = [
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' }
    ];
    const [isUpload, setIsUpload] = useState(false);
    document.title = "Status Page";
    const getFiles = (files) => {
        console.log('files', files);
    }
    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <TableDatas />
                    <ToastContainer />
                    {/* <ImageUploadForm getFiles={getFiles} isUpload={isUpload} /> */}
                </Container>
            </div>
        </>
    );
}

StatusPage.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

export default StatusPage;