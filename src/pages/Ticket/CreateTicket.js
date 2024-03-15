import React, { useEffect } from "react";
import { Card, CardBody, Container, Button, CardHeader, Row, Col, UncontrolledTooltip } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

// actions
import { getDemoData, getCareerAll } from "../../store/actions";

const CreateTicket = (props) => {

    const dispatch = useDispatch();
    const { demoData, careerData } = useSelector(state => ({
        demoData: state.Demo.demoData,
        careerData: state.Career.datas
    }));

    /*
    get data
    */
    useEffect(() => {
        dispatch(getDemoData());
        dispatch(getCareerAll());
    }, [dispatch]);

    // your API's response data will be in events variable.
    console.log(demoData);

    return (
        <div className="page-content">
            <Container fluid={true}>
                <div>
                    <p>Career data</p>
                    {careerData.map(item => (
                        <p key={item.name}>{item.id} {' - '} {item.name}</p>
                    ))}
                </div>
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