import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { size, map } from "lodash";

const getColor = (status) => {
    switch (status) {
        case 'Sắp nhập cảnh':
            return "warning"
        case 'Đang xin Visa':
            return "info"
        case 'Đang làm việc':
            return "success"
    }
}

const Avata = (cell) => {
    const avata = cell.row.original.avata;
    return (<div className=" ">
                <img className="img-thumbnail rounded-circle avatar-sm" alt="100x100" src={avata} data-holder-rendered="true" />
            </div>)
};

const Name = (cell) => {
    return cell.value ? cell.value : "";
};

const Factory = (cell) => {
    return cell.value ? cell.value : "";
};

const Archival_Status = (cell) => {
    return cell.value ? cell.value : "";
};

const Status = (cell) => {
    return (
        <>
            {map(
                cell.value,
                (tag, index) =>
                    index < 2 && (
                        <Badge pill color={getColor(tag)} className="px-2 py-2 ms-1" key={"_skill_" + cell.value + index}>
                            {tag}
                        </Badge>

                    )
            )}
            {size(cell.value) > 2 && (
                <Badge pill color='primary-2' className="px-2 py-2 ms-1" key={"_skill_" + cell.value}>
                    {size(cell.value) - 1} + more
                </Badge>
            )}
        </>
    );
};



export { Avata, Name, Factory, Archival_Status, Status };