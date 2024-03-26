import React, { useState, useEffect, useContext } from "react"
import withRouter from "components/Common/withRouter"
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Nav,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NavItem,
  NavLink,
  CardBody,
} from "reactstrap"
import "./table.scss"
import TableDatas from "./TableDatas"
import classnames from "classnames"
import { Link } from "react-router-dom"
// Import Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
//Import Email Topbar
import EmailToolbar from "./email-toolbar"
//redux
import Spinners from "components/Common/Spinner"
import moment from "moment"

import DataContext from "data/DataContext"

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  deleteTicket,
  getCareerAll,
  getDispatchingCompanyAll,
  getInternAllInfo,
  getReceivingFactoryAll,
  getSyndicationAll,
  getTicketAll,
  getTicketAllInfo,
  getTicketDetailAll,
  getUsersAll,
} from "store/actions"
import ChatBox from "./ChatBox"

const TicketInbox = props => {
  //meta title
  document.title = "Inbox | Skote - React Admin & Dashboard Template"

  const { isReponse, setIsReponse } = useContext(DataContext)

  const dispatch = useDispatch()
  const {
    ticketData,
    ticketDetailData,
    usersData,
    companyData,
    factoryData,
    syndicationData,
    internData,
  } = useSelector(
    state => ({
      ticketData: state.Ticket.datas,
      ticketDetailData: state.TicketDetail.datas,
      usersData: state.Users.datas,
      companyData: state.DispatchingCompany.datas,
      factoryData: state.ReceivingFactory.datas,
      syndicationData: state.Syndication.datas,
      internData: state.Intern.datas,
    }),
    shallowEqual
  )

  // Get du lieu lan dau
  useEffect(() => {
    dispatch(getTicketAll())
    dispatch(getTicketDetailAll())
    // dispatch(getTicketAllInfo());
    // dispatch(getUsersAll())
    // dispatch(getDispatchingCompanyAll())
    // dispatch(getReceivingFactoryAll())
    // dispatch(getSyndicationAll())
    // dispatch(getInternAllInfo())
  }, [dispatch])

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getTicketAll())
    }, 10000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const types = ["All", "new", "processing", "done"]
  const [counters, setCounters] = useState([])
  const [dataTable, setDataTable] = useState(ticketData)

  const [isLoading, setLoading] = useState(true)
  const [activeTab, setactiveTab] = useState(0)
  const [modal, setmodal] = useState(false)

  const getListInternStatus = index => {
    if (index == 0) {
      const newArr = ticketData.map(item => {
        return {
          ...item,
          send_date: moment(item.send_date).format("YYYY-MM-DD"),
        }
      })
      setDataTable(newArr)
    } else {
      const arr = ticketData.filter(item => item.ticket_status == types[index])
      const newArr = arr.map(item => {
        return {
          ...item,
          send_date: moment(item.send_date).format("YYYY-MM-DD"),
        }
      })
      setDataTable(newArr)
    }
    // console.log('arr:', newArr)
  }

  useEffect(() => {
    getListInternStatus(activeTab)
  }, [activeTab, ticketData])

  useEffect(() => {
    if (ticketData) {
      const arr = types.map((type, index) => {
        if (type === "All") {
          return ticketData.length
        } else {
          return ticketData.filter(item => item.ticket_status === type).length
        }
      })
      setCounters(arr)
    }
  }, [ticketData, activeTab])

  console.log(counters)
  return (
    <React.Fragment>
      <div className="bg-light">
        <Row>
          <Col lg="2">
            <div className="d-flex justify-content-center">
            <Card className="w-100">
              <Button
                type="button"
                color="danger"
                onClick={() => {
                  setmodal(!modal)
                }}
                block
              >
                New Ticket
              </Button>
              <div className="mail-list mt-4">
                <Nav tabs className="nav-tabs-custom" vertical role="tablist">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === 0,
                      })}
                      onClick={() => {
                        setactiveTab(0)
                      }}
                    >
                      <i className="mdi mdi-email-outline me-2"></i> Inbox{" "}
                      <span className="ml-1 float-end">({counters[0]})</span>
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === 1,
                      })}
                      onClick={() => {
                        setactiveTab(1)
                      }}
                    >
                      <i className="mdi mdi-star-outline me-2"></i>New
                      <span className="ml-1 float-end">({counters[1]})</span>
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === 2,
                      })}
                      onClick={() => {
                        setactiveTab(2)
                      }}
                    >
                      <i className="mdi mdi-diamond-stone me-2"></i>Processing
                      <span className="ml-1 float-end">({counters[2]})</span>
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === 3,
                      })}
                      onClick={() => {
                        setactiveTab(3)
                      }}
                    >
                      <i className="mdi mdi-file-outline me-2"></i>Done
                      <span className="ml-1 float-end">({counters[3]})</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Card>
            </div>
          </Col>

          <Col lg="10">
            <div className="d-fex justify-content-center">
              {isLoading ? (
                <Spinners setLoading={setLoading} />
              ) : (
                <Card>
                  <TableDatas dataTable={dataTable} />
                </Card>
              )}
            </div>
          </Col>

          <Modal
            size="xl"
            isOpen={modal}
            autoFocus={true}
            centered={true}
            toggle={() => {
              setmodal(!modal)
            }}
          >
            <div className="modal-content">
              <ModalHeader
                toggle={() => {
                  setmodal(!modal)
                }}
              >
                View Message
              </ModalHeader>
              <ModalBody>
                <form>
                  <div className="mb-3">
                    <Input
                      type="email"
                      className="form-control"
                      placeholder="To"
                    />
                  </div>

                  <div className="mb-3">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                    />
                  </div>
                  <Card>
                    <CardBody className="bg-light">
                      <ChatBox />
                    </CardBody>
                  </Card>
                  {isReponse && (
                    <Editor
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                    />
                  )}
                </form>
              </ModalBody>

              <ModalFooter>
                {isReponse ? (
                  <div className="d-flex gap-2">
                    <Button
                      type="button"
                      color="secondary"
                      onClick={() => {
                        setIsReponse(!isReponse)
                        setmodal(!modal)
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => {
                        setIsReponse(!isReponse)
                        setmodal(!modal)
                      }}
                    >
                      Send <i className="fab fa-telegram-plane ms-1"></i>
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => setIsReponse(!isReponse)}
                  >
                    Repply <i className="fab fa-telegram-plane ms-1"></i>
                  </Button>
                )}
              </ModalFooter>
            </div>
          </Modal>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default withRouter(TicketInbox)
