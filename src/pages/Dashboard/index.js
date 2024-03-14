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
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";
import Transactions from "./transactions";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Dashboard = props => {
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
    { title: "Mục cần hỗ trợ chưa xử lý", iconClass: "bx bx-support", description: "3" },
    { title: "Thực tập sinh sắp hết hạn visa", iconClass: "bx bx-user", description: "12" },
    {
      title: "Thực tập sinh sắp nhập cảnh",
      iconClass: "bx bx-user",
      description: "5",
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

  //meta title
  document.title = "Dashboard";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          /> */}
          <h4 className="fw-bold mt-1">Cần chú ý</h4>
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
                                {report.title}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="text-danger "
                            onClick={() => {
                            }}
                          >
                            <i className="bx bx-chevrons-right font-size-24" id="deletetooltip" />
                            <UncontrolledTooltip placement="top" target="deletetooltip">
                              Detail
                            </UncontrolledTooltip>
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <h4 className="mt-3 fw-bold">Thống kê</h4>
              <Row className="mb-3">
                <Col xl={4}>
                  <Card className="h-100">
                    <CardBody>
                      <Row>
                        <Col xl={8}>
                          <h4 className="card-title mb-2">Tỷ lệ thực tập sinh hiện tại</h4>
                          <p>Tổng số lượng: <span className="text-primary fw-bold">5000</span> người</p>
                        </Col>
                        <Col xl={4} className="d-flex justify-content-end">
                          <div className="w-75">
                            <Button className="btn btn-sm w-100 mb-1">Quốc gia</Button>
                            <Button className="btn btn-sm w-100">Tư cách</Button>
                          </div>
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
                        <h4 className="card-title mb-4">Số lượng thực tập sinh nhập cảnh theo quốc gia</h4>
                        <div className="ms-auto">
                          <ul className="nav nav-pills">
                            <li className="nav-item">
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
                            </li>
                            <li className="nav-item">
                              <Link
                                to="#"
                                className={classNames(
                                  { active: periodType === "monthly" },
                                  "nav-link"
                                )}
                                onClick={() => {
                                  onChangeChartPeriod("monthly");
                                }}
                                id="one_month"
                              >
                                Month
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
                                }}
                                id="one_month"
                              >
                                Year
                              </Link>
                            </li>
                          </ul>
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
              <Transactions title={'Top 5 quốc gia theo số lượng TTS'} />
            </Col>
            <Col xl="4">
              <Transactions title={'Top 5 phái cử theo số lượng TTS'}/>
            </Col>

            <Col xl="4">
              <Transactions title={'Top 5 xí nghiệp theo số lượng TTS'}/>
            </Col>
          </Row>

          {/* <Row>
            <Col lg="12">
              <LatestTranaction />
            </Col>
          </Row> */}
        </Container>
      </div>

      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal);
        }}
      >
        <div>
          <ModalHeader
            toggle={() => {
              setmodal(!modal);
            }}
          >
            Order Details
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>

            <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Wireless Headphone (Black)
                        </h5>
                        <p className="text-muted mb-0">$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Hoodie (Blue)
                        </h5>
                        <p className="text-muted mb-0">$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
