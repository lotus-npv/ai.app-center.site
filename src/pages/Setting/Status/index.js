import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import PropTypes from 'prop-types';

import TableDatas from "./TableDatas";

import { withTranslation } from "react-i18next";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getStatusAll, updateStatus, deleteStatus, setStatus, getCareerId } from "store/actions";


const StatusPage = (props) => {
    document.title = "Status Page";

    const dispatch = useDispatch();

    const { dataId } = useSelector(state => ({
        dataId: state.Career.dataId
    }), shallowEqual);
    
      // Get du lieu lan dau 
    useEffect(() => {
        dispatch(getCareerId(1));
    }, [dispatch]);
    console.log(dataId)
    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <TableDatas />
                    <ToastContainer />

                    <div>
                        <button type="button" onClick={(e) => {
                            dispatch(getCareerId(1));
                        }}>
                            test
                        </button>
                        {/* <p>{dataId.name}</p> */}
                    </div>
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