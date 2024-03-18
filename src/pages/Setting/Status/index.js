import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import PropTypes from 'prop-types';

import TableDatas from "./TableDatas";

import { withTranslation } from "react-i18next";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getCareerId , getCareerAll } from "store/career/actions";


const StatusPage = (props) => {
    document.title = "Status Page";

    const dispatch = useDispatch();

    const { dataId, datas } = useSelector(state => ({
        dataId: state.Career.dataId,
        datas: state.Career.datas,
    }), shallowEqual);
    
      // Get du lieu lan dau 
    useEffect(() => {
        dispatch(getCareerAll());
    }, [dispatch]);

    const handleGetDataId = () => {
        dispatch(getCareerAll());
        dispatch(getCareerId(1));
        console.log(dataId)
    }

    console.log(datas)

    
    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <TableDatas />
                    <ToastContainer />

                    <div>
                        <button onClick={handleGetDataId}>
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