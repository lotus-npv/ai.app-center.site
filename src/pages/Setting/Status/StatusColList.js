import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { size, map } from "lodash";

const Name = (cell) => {
    return cell.value ? cell.value : "";
};

const Type = (cell) => {
    return cell.value ? cell.value : "";
};

const Note = (cell) => {
    return cell.value ? cell.value : "";
};


export { Name, Type, Note };