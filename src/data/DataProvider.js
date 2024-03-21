import React, { useState, useEffect } from 'react';
import DataContext from './DataContext';

import { dataIntern } from '../common/data/intern'
import { dataReceivingFactory } from '../common/data/receiving-factory';
import { dataDispatchingCompany } from '../common/data/dispatching-company';
import { dataViolate } from 'common/data/violate';
import { dataStatus } from 'common/data/status';
import { dataCareer } from 'common/data/career';

const DataProvider = ({ children }) => {

    // Intern
    const [internDatas, setInternDatas] = useState(dataIntern);

    const updateInternDatas = newData => {
        setInternDatas(newData);
    };

    // Receiving Factory
    const [receivingFactoryDatas, setReceivingFactoryDatas] = useState(dataReceivingFactory);

    const updateReceivingFactoryDatas = newData => {
        setReceivingFactoryDatas(newData);
    };

    // Dispatching Company
    const [dispatchingCompanyDatas, setDispatchingCompanyDatas] = useState(dataDispatchingCompany);

    const updateDispatchingCompanyDatas = newData => {
        setDispatchingCompanyDatas(newData);
    };

    // Violate
    const [violateDatas, setViolateDatas] = useState(dataViolate);

    const updateViolateDatas = newData => {
        setViolateDatas(newData);
    };

    // address intern
    const address = {name: 0, phone: ''}
    const [addressData, setAddressData] = useState([address])

    const updateAddressData = newData => {
        setAddressData(newData);
    };

    //Status
    const [statusData, setStatusData] = useState(dataStatus)

    const updateStatusData = newData => {
        setStatusData(newData);
    };

    // Career
    const [careerData, setCareerData] = useState(dataCareer)

    const updateCareerData = newData => {
        setCareerData(newData);
    };

    // get screen
    const screenAvailHeight = window.innerHeight;
    const [vh, setVh] = useState('')
  
    window.addEventListener('resize', function() {
      var screenHeight = window.innerHeight;
      let wh = screenHeight - 250;
      setVh(`${wh}px`);
      // setWindowHeight(screenHeight);
    });
  
    useEffect(() => {
      let wh = screenAvailHeight - 250;
      setVh(`${wh}px`);
    }, [])

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

    // edit intern
    const [isEdit, setIsEdit] = useState(false);



    return (
        <DataContext.Provider
            value={{
                internDatas,
                updateInternDatas,
                receivingFactoryDatas,
                updateReceivingFactoryDatas,
                dispatchingCompanyDatas,
                updateDispatchingCompanyDatas,
                violateDatas,
                updateViolateDatas,
                address,
                addressData,
                updateAddressData,
                statusData,
                updateStatusData,
                careerData,
                updateCareerData,
                vh,
                modal_standard, setmodal_standard,tog_standard,
                modal_xlarge, setmodal_xlarge,tog_xlarge,
                modal_fullscreen,setmodal_fullscreen,tog_fullscreen,
                isEdit,
                setIsEdit,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;