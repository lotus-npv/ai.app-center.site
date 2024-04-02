import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';

//import images
import wechat from "../../assets/images/icon/office.png";


const DetailsSection = ({userInfo}) => {


    console.log(userInfo);
    return (
        <React.Fragment>
            <Col xl={9}>
                <Card>
                    <CardBody className="border-bottom">
                        <div className="d-flex">
                            <img src={wechat} alt="" height="50" />
                            <div className="flex-grow-1 ms-3">
                                <h5 className="fw-semibold">{userInfo ? userInfo[0].label : 'Name'}</h5>
                                <ul className="list-unstyled hstack gap-2 mb-0">
                                    <li>
                                        <i className="bx bx-building-house"></i> <span className="text-muted">Themesbrand</span>
                                    </li>
                                    <li>
                                        <i className="bx bx-map"></i> <span className="text-muted">Japan</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardBody>
                    <CardBody>
                        <h5 className="fw-semibold mb-3">Description</h5>
                        <p className="text-muted">We are looking to hire a skilled Magento developer to build and maintain eCommerce websites for our clients. As a Magento developer, you will be responsible for liaising with the design team, setting up Magento 1x and 2x sites, building modules and customizing extensions, testing the performance of each site, and maintaining security and feature updates after the installation is complete.</p>
                        
                        <h5 className="fw-semibold mb-3">Responsibilities:</h5>


                        <div className="mt-4">
                            <span className="badge badge-soft-warning me-1">PHP</span>
                            <span className="badge badge-soft-warning me-1">Magento</span>
                            <span className="badge badge-soft-warning me-1">Marketing</span>
                            <span className="badge badge-soft-warning me-1">WordPress</span>
                            <span className="badge badge-soft-warning">Bootstrap</span>
                        </div>

                        <div className="mt-4">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item mt-1">
                                    Share this job:
                                </li>
                                <li className="list-inline-item mt-1">
                                    <Link to="#" className="btn btn-outline-primary btn-hover"><i className="uil uil-facebook-f"></i> Facebook</Link>
                                </li>
                                <li className="list-inline-item mt-1">
                                    <Link to="#" className="btn btn-outline-danger btn-hover"><i className="uil uil-google"></i> Google+</Link>
                                </li>
                                <li className="list-inline-item mt-1">
                                    <Link to="#" className="btn btn-outline-success btn-hover"><i className="uil uil-linkedin-alt"></i> linkedin</Link>
                                </li>
                            </ul>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default DetailsSection;