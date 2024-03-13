import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { size, map } from "lodash";


const Avata = (cell) => {
    const avata = cell.row.original.avata;
    return (<div className=" ">
                <img className="img-thumbnail rounded-circle avatar-sm" alt="100x100" src={avata} data-holder-rendered="true" />
            </div>)
};

const Name = (cell) => {
    return cell.value ? cell.value : "";
};

const Phone = (cell) => {
    return cell.value ? cell.value : "";
};

const JontDate = (cell) => {
    return cell.value ? cell.value : "";
};

const Note = (cell) => {
    return cell.value ? cell.value : "";
};


export { Avata, Name, Phone, JontDate, Note };