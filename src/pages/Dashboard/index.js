import PropTypes from "prop-types"
import React, { useContext, useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledTooltip,
} from "reactstrap"
import { Link } from "react-router-dom"

import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor"

import classNames from "classnames"

//import Charts
import StackedColumnChart from "./StackedColumnChart"

//import action
import {
  getStatusDetailAll,
  getChartsData as onGetChartsData,
} from "../../store/actions"

// Pages Components
import Transactions from "./transactions"
import Notifications from "./notifications"

//i18n
import { withTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

//redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { getInternAllInfo } from "../../store/actions"
import { createSelector } from "reselect"

import DataContext from "data/DataContext"

const Dashboard = props => {
  const navigate = useNavigate()
  const [modal, setmodal] = useState(false)
  // const [subscribemodal, setSubscribemodal] = useState(false);

  const {NationList} = useContext(DataContext);

  const selectDashboardState = state => state.Dashboard
  const DashboardProperties = createSelector(
    selectDashboardState,
    dashboard => ({
      chartsData: dashboard.chartsData,
    })
  )

  const { chartsData } = useSelector(DashboardProperties)

  // The intern's visa is about to expire

  const reports = [
    {
      title: "The item needing support has not been processed yet",
      iconClass: "bx bx-support",
      description: "0",
      value: 1,
    },
    {
      title: "The intern's visa is about to expire",
      iconClass: "bx bx-user",
      description: "0",
      value: 2,
    },
    {
      title: "Interns are about to enter the country",
      iconClass: "bx bx-user",
      description: "0",
      value: 3,
    },
  ]

  const [periodData, setPeriodData] = useState([])
  const [periodType, setPeriodType] = useState("yearly")

  useEffect(() => {
    setPeriodData(chartsData)
  }, [chartsData])

  const [isMonth, setIsMonth] = useState(
    "btn-group btn-group-sm  d-flex justify-center  d-none"
  )

  const onChangeChartPeriod = pType => {
    setPeriodType(pType)
    dispatch(onGetChartsData(pType))
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onGetChartsData("yearly"))
  }, [dispatch])

  // get intern data
  const { dataIntern, dataStatusDetail } = useSelector(
    state => ({
      dataIntern: state.Intern.datas,
      dataStatusDetail: state.StatusDetail.datas,
    }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(getInternAllInfo())
    dispatch(getStatusDetailAll())
  }, [dispatch])

  const [reportss, setReportss] = useState(reports)

  // get thong tin thuc tap sinh theo trang thai
  const [visaExpire, setVisaExpire] = useState(null)
  const [prepareEntry, setPrepareEntry] = useState(null)
  useEffect(() => {
    if (dataIntern) {
      console.log(dataIntern)

      const internPrepareEntry = dataStatusDetail.filter(st => {
        return st.status_id == 10
      })
      // setPrepareEntry(internPrepareEntry);

      const internVisaExpire = dataStatusDetail.filter(st => {
        return st.status_id == 11
      })
      // setVisaExpire(internVisaExpire);

      const arr = [...reports]
      const newArr = arr.map(report => {
        const newReport = { ...report }
        if (newReport.value == 2) {
          newReport.description = `${internVisaExpire.length}`
        }
        if (newReport.value == 3) {
          newReport.description = `${internPrepareEntry.length}`
        }

        return newReport
      })

      setReportss(newArr)
    }
  }, [dataIntern])

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getInternAllInfo())
    }, 10000)
    // Hàm dọn dẹp khi unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  // console.log(dataIntern)


  // Charst
  const dataColors = '["--bs-primary", "--bs-success", "--bs-danger"]'
  const apexsalesAnalyticsChartColors = getChartColorsArray(dataColors)
  const series = [56, 38, 26]
  const dataCharst = [
    { country: "VietNam", value: 56 },
    { country: "Japan", value: 38 },
    { country: "Korean", value: 26 },
  ]
  const options = {
    labels: dataCharst.map(item => item.country),
    colors: apexsalesAnalyticsChartColors,
    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  }

  // danh sach intern => link bảng address lấy 

  const handleLink = value => {
    if (value == 1) {
      return "/ticket"
    } else if (value == 2) {
      return "/intern"
    } else {
      return "/intern"
    }
  }

  //meta title
  document.title = "Dashboard"
  const date = new Date()

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          /> */}
          <h4 className="fw-bold mt-1">{props.t("Need attention")}</h4>
          <Row>
            {/* <Col xl="4">
              <WelcomeComp />
              <MonthlyEarning />
            </Col> */}
            <Col xl="12">
              <Row>
                {/* Reports Render */}
                {reportss.map((report, key) => (
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
                            <h3 className="mb-0 fw-bold">
                              {report.description}
                            </h3>
                            <div className="d-flex">
                              <p className="">{props.t(report.title)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex align-items-center">
                          <Link
                            to={handleLink(report.value)}
                            className="text-danger "
                          >
                            <i
                              className="bx bx-chevrons-right font-size-24 fw-bold"
                              id="deletetooltip"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="deletetooltip"
                            >
                              {props.t("Detail")}
                            </UncontrolledTooltip>
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <h4 className="mt-3 fw-bold">{props.t("Detail")}</h4>
              <Row className="mb-3">
                <Col xl={4}>
                  <Card className="h-100">
                    <CardBody>
                      <Row>
                        <Col xl={8}>
                          <h4 className="card-title mb-2">
                            {props.t("Current intern ratio")}
                          </h4>
                          <p>
                            {props.t("Total:")}
                            <span className="text-primary fw-bold">
                              {dataIntern.length}
                            </span>{" "}
                            {props.t("people")}
                          </p>
                        </Col>
                        <Col xl={4} className="d-flex justify-content-end">
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

                      <div className="text-center text-muted d-flex justify-content-around">
                          {dataCharst.map(option => (
                            <div className="mt-4" key={option.country}>
                              <p className="mb-2 text-truncate">
                                <i className="mdi mdi-circle text-primary me-1" />{" "}
                                {option.country}
                              </p>
                              <h5>{option.value}</h5>
                            </div>
                          ))}
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <Col xl={8}>
                  <Card className="h-100">
                    <CardBody>
                      <div className="d-sm-flex flex-wrap">
                        <h4 className="card-title mb-4">
                          {props.t(
                            "Number of interns entering the country by country"
                          )}
                        </h4>
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
                                  onChangeChartPeriod("monthly")
                                  setIsMonth(
                                    "btn-group btn-group-sm  d-flex justify-center "
                                  )
                                }}
                                id="one_month"
                              >
                                {props.t("Month")}
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
                                  onChangeChartPeriod("yearly")
                                  setIsMonth(
                                    "btn-group btn-group-sm  d-flex justify-center  d-none"
                                  )
                                }}
                                id="one_month"
                              >
                                {props.t("Year")}
                              </Link>
                            </li>
                          </ul>
                          <div className="mt-1" style={{ height: "40px" }}>
                            <div className={isMonth} role="group">
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                              >
                                Năm :
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                              >
                                {date.getFullYear()}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="clearfix"></div> */}
                      <StackedColumnChart
                        periodData={periodData}
                        dataColors='["--bs-primary", "--bs-warning", "--bs-success"]'
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col xl="4">
              <Transactions
                title={props.t("Top 5 countries by number of interns")}
              />
            </Col>
            <Col xl="4">
              <Transactions
                title={props.t("Top 5 nominated by number of interns")}
              />
            </Col>

            <Col xl="4">
              {/* <Transactions title={'Top 5 xí nghiệp theo số lượng TTS'} /> */}
              <Notifications title={props.t("Latest announcement")} />
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
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
