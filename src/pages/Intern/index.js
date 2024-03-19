import React, { useMemo, useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, CardHeader, Input } from "reactstrap";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

// import context
import DataContext from "../../data/DataContext";

import { withTranslation } from "react-i18next";

import TableDatas from "./TableDatas";
import ModalTop from "./ModalTop";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { openModal } from "store/actions";


const InternPage = (props) => {
    document.title = "Thực tập sinh";
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // data context
    const { internDatas, updateInternDatas, statusData} = useContext(DataContext)

    //delete modal
    const [intern, setIntern] = useState(null);

    // Modal
    const [isUpdateStatus, setIsUpdateStatus] = useState(false);
    const [modal_standard, setmodal_standard] = useState(false);
    const [modal_xlarge, setmodal_xlarge] = useState(false);
    const [modal_fullscreen, setmodal_fullscreen] = useState(false);

    function tog_standard() {
        setmodal_standard(!modal_standard);
        removeBodyCss();
    }

    function tog_xlarge() {
        setmodal_xlarge(!modal_xlarge);
        removeBodyCss();
    }

    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen);
        removeBodyCss();
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    // move to edit form
    const addForm = () => {
        navigate('/input-intern');
    }

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
                                tog_standard={tog_standard}
                                modal_standard={modal_standard}
                                setmodal_standard={setmodal_standard}
                                setStatus={setStatus}
                                tog_xlarge={tog_xlarge}
                                setmodal_xlarge={setmodal_xlarge}
                                isUpdateStatus={isUpdateStatus}
                                optionGroup={optionGroup}
                                modal_xlarge={modal_xlarge}
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