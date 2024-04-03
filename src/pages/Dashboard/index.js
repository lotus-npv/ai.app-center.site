import PropTypes from "prop-types"
import React, { useContext, useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledTooltip,
  Spinner,
} from "reactstrap"
import { Link, json } from "react-router-dom"

import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor"

import classNames from "classnames"

//import Charts
import StackedColumnChart from "./StackedColumnChart"

//import action
import {
  getAddressAll,
  getDispatchingCompanyAll,
  getInternKeyId,
  getStatusDetailAll,
  getTicketAll,
  getViolateAll,
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
import { createSelector } from "reselect"

import DataContext from "data/DataContext"

const Dashboard = props => {
  const user = JSON.parse(localStorage.getItem("authUser"))[0]

  const { NationList, loadData, setLoadData } = useContext(DataContext)
  const navigator = useNavigate()
  const selectDashboardState = state => state.Dashboard
  const DashboardProperties = createSelector(
    selectDashboardState,
    dashboard => ({
      chartsData: dashboard.chartsData,
    })
  )

  const { chartsData } = useSelector(DashboardProperties)
  const [periodData, setPeriodData] = useState([])
  const [periodType, setPeriodType] = useState("yearly")

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
  const {
    dataIntern,
    dataStatusDetail,
    dataAddress,
    dataViolate,
    dataTicket,
    dataCompany,
  } = useSelector(
    state => ({
      dataTicket: state.Ticket.datas,
      dataIntern: state.Intern.dataKeyId,
      dataStatusDetail: state.StatusDetail.datas,
      dataAddress: state.Address.datas,
      dataViolate: state.Violate.datas,
      dataCompany: state.DispatchingCompany.datas,
    }),
    shallowEqual
  )

  useEffect(() => {
    if (user) {
      dispatch(getInternKeyId(user.key_license_id))
      dispatch(getStatusDetailAll())
      dispatch(getAddressAll(user.key_license_id))
      dispatch(getViolateAll())
      dispatch(getTicketAll())
      dispatch(getDispatchingCompanyAll())
    }
  }, [dispatch])

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (user) {
        dispatch(getInternKeyId(user.key_license_id))
        dispatch(getStatusDetailAll())
        dispatch(getAddressAll(user.key_license_id))
        dispatch(getViolateAll())
        dispatch(getTicketAll())
        dispatch(getDispatchingCompanyAll())
      }
    }, 15000)
    // Hàm dọn dẹp khi unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoadData(false)
    }, 2000)
  }, [])

  //--------------------------------------------------------------------

  const [ticketItem, setTicketItem] = useState()
  useEffect(() => {
    if (user && dataTicket) {
      const count = dataTicket.filter(
        ticket => ticket.sender_id == user.id || ticket.receiver_id == user.id
      ).length
      setTicketItem(count)
    }
  }, [])

  // console.log('chartsData', chartsData)

  //=====================================================================

  // get thong tin thuc tap sinh theo trang thai
  // The intern's visa is about to expire

  const reports = [
    {
      title: "The item needing support",
      iconClass: "bx-support",
      description: "0",
      value: 1,
    },
    {
      title: "The intern's visa is about to expire",
      iconClass: "bx-user",
      description: "0",
      value: 2,
    },
    {
      title: "Interns are about to enter the country",
      iconClass: "bx-user",
      description: "0",
      value: 3,
    },
  ]

  const [reportss, setReportss] = useState(reports)
  // console.log("reportss", reportss)

  const [visaExpire, setVisaExpire] = useState(null)
  const [prepareEntry, setPrepareEntry] = useState(null)
  useEffect(() => {
    if (dataIntern && user && dataTicket) {
      const ticketNotSupport = dataTicket.filter(
        ticket =>
          (ticket.sender_id == user.id || ticket.receiver_id == user.id) &&
          ticket.ticket_status === "new"
      )

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
        if (newReport.value == 1) {
          newReport.description = `${ticketNotSupport.length}`
        }
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
  }, [dataIntern, dataStatusDetail])
  //=====================================================================

  // Charst
  const dataColors =
    '["--bs-primary", "--bs-primary-2", "--bs-info", "--bs-secondary"]'
  const apexsalesAnalyticsChartColors = getChartColorsArray(dataColors)
  const iconColors = ["primary", "primary-2", "info", "secondary"]

  const [dataCharst, setDataCharst] = useState([])
  const [charstByCompany, setCharstByCompany] = useState()

  // danh sach intern => link bảng address
  useEffect(() => {
    if (dataIntern) {
      const newarr = NationList.map(nation => {
        const newData = { ...nation }
        const idIntern = []
        dataIntern.forEach(intern => {
          if (intern.country == newData.country) {
            newData.data++
            idIntern.push(intern.id)
          }
        })

        const numberViolate = dataViolate.filter(violate =>
          idIntern.some(id => id == violate.intern_id)
        )
        newData.violate = numberViolate.length

        return newData
      })

      // console.log("newarr", newarr)

      setDataCharst(newarr)
      setPeriodData(chartsData)
    }
  }, [dataIntern, dataAddress])

  // lay danh sach tts theo phai cu
  useEffect(() => {
    // lay danh sach phai cu
    const arr = dataCompany.filter(company => company.key_license_id == user.key_license_id);
    console.log(arr);
  }, [dataCompany])

  const handleLink = value => {
    if (value == 1) {
      return "/ticket"
    } else if (value == 2) {
      return {
        pathname: "/intern",
        state: { tab: "het han visa" },
      }
    } else {
      return {
        pathname: "/intern",
        state: { tab: "sap nhap canh" },
      }
    }
  }
  //=====================================================================

  // console.log(dataCompany);
  // console.log("dataIntern", dataIntern)
  // console.log('user', user);

  //meta title
  document.title = "Dashboard"
  const date = new Date()

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div>
            {loadData && (
              <div className="d-flex gap-3 mt-1 ">
                <h4 className="fw-bold text-success">analyzing data</h4>{" "}
                <Spinner
                  type="grow"
                  size="sm"
                  className="ms-2"
                  color="primary"
                />{" "}
              </div>
            )}
            {!loadData && (
              <h4 className="fw-bold mt-1">{props.t("Need attention")}</h4>
            )}
          </div>
          <Row>
            <Col xl="12">
              <Row>
                {/* Reports Render */}
                {reportss.map((report, key) => (
                  <Col md="4" key={"_col_" + key} className="mb-2 cursor">
                    <Card
                      className="mini-stats-wid h-100"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigator("/intern")}
                    >
                      <CardBody className="d-flex justify-content-between">
                        <div className="d-flex gap-4 justify-content-start ">
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-20"
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
                        <Col
                          xl={4}
                          className="d-flex justify-content-end"
                        ></Col>
                      </Row>

                      <div>
                        <div id="donut-chart">
                          <ReactApexChart
                            options={{
                              labels: dataCharst
                                ? dataCharst.map(item => item.country)
                                : null,
                              colors: apexsalesAnalyticsChartColors,
                              legend: { show: !1 },
                              plotOptions: {
                                pie: {
                                  donut: {
                                    size: "70%",
                                  },
                                },
                              },
                            }}
                            series={dataCharst.map(item => item.data)}
                            type="donut"
                            height={300}
                            className="apex-charts"
                          />
                        </div>
                      </div>

                      <div className="text-center text-muted d-flex justify-content-around">
                        {dataCharst.map((option, index) => (
                          <div className="mt-4" key={option.country}>
                            <p className="mb-2 text-truncate">
                              <i
                                className={`mdi mdi-circle text-${iconColors[index]} me-1`}
                              />{" "}
                              {option.country}
                            </p>
                            <h5>{option.data}</h5>
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
                dataIntern={dataIntern}
                dataCharst={dataCharst}
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
