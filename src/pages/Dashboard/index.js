import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  UncontrolledTooltip
} from "reactstrap";
import { Link } from "react-router-dom";

import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

import classNames from "classnames";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

//import action
import { getChartsData as onGetChartsData } from "../../store/actions";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import Transactions from "./transactions";
import Notifications from "./notifications";


//i18n
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Dashboard = props => {
  const navigate = useNavigate();
  const [modal, setmodal] = useState(false);
  const [subscribemodal, setSubscribemodal] = useState(false);

  const selectDashboardState = (state) => state.Dashboard;
  const DashboardProperties = createSelector(
    selectDashboardState,
    (dashboard) => ({
      chartsData: dashboard.chartsData
    })
  );

  const {
    chartsData
  } = useSelector(DashboardProperties);

  const reports = [
    { title: "The item needing support has not been processed yet", iconClass: "bx bx-support", description: "3" , value: 1},
    { title: "The intern's visa is about to expire", iconClass: "bx bx-user", description: "12" , value: 2},
    {
      title: "Interns are about to enter the country",
      iconClass: "bx bx-user",
      description: "5", value: 3
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setSubscribemodal(true);
    }, 2000);
  }, []);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");

  useEffect(() => {
    setPeriodData(chartsData);
  }, [chartsData]);

  const [isMonth, setIsMonth] = useState("btn-group btn-group-sm  d-flex justify-center  d-none")

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
    dispatch(onGetChartsData(pType));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetChartsData("yearly"));
  }, [dispatch]);

  // Charst
  const dataColors = '["--bs-primary", "--bs-success", "--bs-danger"]'
  const apexsalesAnalyticsChartColors = getChartColorsArray(dataColors);
  const series = [56, 38, 26];
  const options = {
    labels: ["Series A", "Series B", "Series C"],
    colors: apexsalesAnalyticsChartColors,
    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };

  const handleLink = (value) => {
    if(value == 1) {
      return '/ticket'
    } else if(value == 2) {
      return '/intern'
    } else {
      return '/intern'
    }
  }

  //meta title
  document.title = "Dashboard";
  const date = new Date();
  console.log(date.getFullYear())

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          /> */}
          <h4 className="fw-bold mt-1">{props.t('Need attention')}</h4>
          <Row>
            {/* <Col xl="4">
              <WelcomeComp />
              <MonthlyEarning />
            </Col> */}
            <Col xl="12">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key} className="mb-2">
                    <Card className="mini-stats-wid h-100">
                      <CardBody className="d-flex justify-content-between">
                        <div className="d-flex gap-4 justify-content-start ">
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                          {/* flex-grow-1 */}
                          <div className="d-flex flex-column gap-2">
                            <h3 className="mb-0 fw-bold">{report.description}</h3>
                            <div className="d-flex">
                              <p className="">
                                {props.t(report.title)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex align-items-center">
                          <Link
                            to={handleLink(report.value)}
                            className="text-danger "
                          >
                            <i className="bx bx-chevrons-right font-size-24 fw-bold" id="deletetooltip" />
                            <UncontrolledTooltip placement="top" target="deletetooltip">
                              {props.t('Detail')}
                            </UncontrolledTooltip>
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <h4 className="mt-3 fw-bold">{props.t('Detail')}</h4>
              <Row className="mb-3">
                <Col xl={4}>
                  <Card className="h-100">
                    <CardBody>
                      <Row>
                        <Col xl={8}>
                          <h4 className="card-title mb-2">{props.t('Current intern ratio')}</h4>
                          <p>{props.t('Total:')}<span className="text-primary fw-bold">5000</span> {props.t('people')}</p>
                        </Col>
                        <Col xl={4} className="d-flex justify-content-end">
                          {/* <div className="w-75">
                            <Button className="btn btn-sm w-100 mb-1">{props.t('Country')}</Button>
                            <Button className="btn btn-sm w-100">Tư cách</Button>
                          </div> */}
                        </Col>
                      </Row>

                      <div>
                        <div id="donut-chart">
                          <ReactApexChart
                            options={options}
                            series={series}
                            type="donut"
                            height={300}
                            className="apex-charts"
                          />
                        </div>
                      </div>

                      <div className="text-center text-muted">
                        <Row>
                          <Col xs="4">
                            <div className="mt-4">
                              <p className="mb-2 text-truncate">
                                <i className="mdi mdi-circle text-primary me-1" /> Viet Nam
                              </p>
                              <h5>3,132</h5>
                            </div>
                          </Col>
                          <Col xs="4">
                            <div className="mt-4">
                              <p className="mb-2 text-truncate">
                                <i className="mdi mdi-circle text-success me-1" /> Japan
                              </p>
                              <h5>1,763</h5>
                            </div>
                          </Col>
                          <Col xs="4">
                            <div className="mt-4">
                              <p className="mb-2 text-truncate">
                                <i className="mdi mdi-circle text-danger me-1" /> Korean
                              </p>
                              <h5>105</h5>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <Col xl={8}>
                  <Card className="h-100">
                    <CardBody>
                      <div className="d-sm-flex flex-wrap">
                        <h4 className="card-title mb-4">{props.t('Number of interns entering the country by country')}</h4>
                        <div className="ms-auto">
                          <ul className="nav nav-pills">
                            {/* <li className="nav-item">
                              <Link
                                to="#"
                                className={classNames(
                                  { active: periodType === "weekly" },
                                  "nav-link"
                                )}
                                onClick={() => {
                                  onChangeChartPeriod("weekly");
                                }}
                                id="one_month"
                              >
                                Week
                              </Link>{" "}
                            </li> */}
                            <li className="nav-item">
                              <Link
                                to="#"
                                className={classNames(
                                  { active: periodType === "monthly" },
                                  "nav-link"
                                )}
                                onClick={() => {
                                  onChangeChartPeriod("monthly");
                                  setIsMonth("btn-group btn-group-sm  d-flex justify-center ")
                                }}
                                id="one_month"
                              >
                                {props.t('Month')}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="#"
                                className={classNames(
                                  { active: periodType === "yearly" },
                                  "nav-link"
                                )}
                                onClick={() => {
                                  onChangeChartPeriod("yearly");
                                  setIsMonth("btn-group btn-group-sm  d-flex justify-center  d-none")
                                }}
                                id="one_month"
                              >
                                {props.t('Year')}
                              </Link>
                            </li>
                          </ul>
                          <div className="mt-1" style={{height: '40px'}}>
                            <div className={isMonth} role="group">
                              <button type="button" className="btn btn-outline-secondary">Năm :</button>
                              <button type="button" className="btn btn-outline-secondary">{date.getFullYear()}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="clearfix"></div> */}
                      <StackedColumnChart periodData={periodData} dataColors='["--bs-primary", "--bs-warning", "--bs-success"]' />
                    </CardBody>
                  </Card>
                </Col>
              </Row>


            </Col>
          </Row>

          <Row>
            <Col xl="4">
              <Transactions title={props.t('Top 5 countries by number of interns')} />
            </Col>
            <Col xl="4">
              <Transactions title={props.t('Top 5 nominated by number of interns')} />
            </Col>

            <Col xl="4" >
              {/* <Transactions title={'Top 5 xí nghiệp theo số lượng TTS'} /> */}
              <Notifications title={props.t('Latest announcement')} />
            </Col>
          </Row>

          {/* <Row>
            <Col lg="12">
              <LatestTranaction />
            </Col>
          </Row> */}
        </Container>
      </div>


    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
