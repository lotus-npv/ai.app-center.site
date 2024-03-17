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
      let wh = screenHeight - 245;
      setVh(`${wh}px`);
      // setWindowHeight(screenHeight);
    });
  
    useEffect(() => {
      let wh = screenAvailHeight - 245;
      setVh(`${wh}px`);
    }, [])





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
                vh
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;