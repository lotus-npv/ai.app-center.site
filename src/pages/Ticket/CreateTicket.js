import React, { useEffect } from "react";
import { Card, CardBody, Container, Button, CardHeader, Row, Col, UncontrolledTooltip } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

// actions
import { getDemoData } from "../../store/actions";

const CreateTicket = (props) => {
    const dispatch = useDispatch();
    const { demoData } = useSelector(state => ({
        demoData: state.Demo.demoData,
    }));

    /*
    get data
    */
    useEffect(() => {
        dispatch(getDemoData());
    }, [dispatch]);

    // your API's response data will be in events variable.
    console.log(demoData);

    return (
        <div className="page-content">
            <Container fluid={true}>
                <div>
                    {demoData.map(item => (
                        <p key={item.id}>{item.id} {' - '} {item.title}</p>
                    ))}
                </div>
            </Container>
        </div>

    );
};

export default CreateTicket;