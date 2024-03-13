import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { size, map } from "lodash";



const ViolateDate = (cell) => {
    return cell.value ? cell.value : "";
};

const ViolateType = (cell) => {
    return cell.value ? cell.value : "";
};

const NumberOfViolator = (cell) => {
    return cell.value ? cell.value : "";
};

const Description = (cell) => {
    return cell.value ? cell.value : "";
};


export { ViolateDate, ViolateType, NumberOfViolator, Description };