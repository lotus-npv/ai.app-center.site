import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import PropTypes from 'prop-types';

import TableDatas from "./TableDatas";

import { withTranslation } from "react-i18next";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getCareerId , getCareerAll , getStatusAll} from "store/actions";


const StatusPage = (props) => {
    document.title = "Status Page";

    const dispatch = useDispatch();

    const { dataId, datass, dataStatus } = useSelector(state => ({
        dataId: state.Career.dataId,
        datass: state.Career.datas,
        dataStatus: state.Status.datas
    }), shallowEqual);
    
      // Get du lieu lan dau 
    useEffect(() => {
        dispatch(getCareerAll());
        dispatch(getCareerId(2));
    }, [dispatch]);

    const handleGetDataId = () => {
        dispatch(getCareerId(2));
        dispatch(getCareerAll());
        dispatch(getStatusAll());
        console.log(dataId)
        console.log(datass)
        console.log(dataStatus)
    }



    
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
                        <p> aa {}</p>
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