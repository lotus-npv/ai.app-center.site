import React, { useState } from 'react';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {

    const address = [{ name: 'Ha Noi', phone: '1234' }]
    const [data, setData] = useState(address);

    const updateData = newData => {
        setData(newData);
    };

    return (
        <DataContext.Provider value={{ data, updateData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;