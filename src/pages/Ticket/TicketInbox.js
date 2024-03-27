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
import TableDatas from "./TableDatas"
import classnames from "classnames"
import Select from "react-select"
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

  const {
    isReponse,
    setIsReponse,
    modal,
    setmodal,
    ticketRowData,
    setTicketRowData,
    user,
    isEditTicket,
    setIsEditTicket,
    UserTypeList,
  } = useContext(DataContext)

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
    dispatch(getDispatchingCompanyAll())
    dispatch(getReceivingFactoryAll())
    dispatch(getSyndicationAll())
    dispatch(getInternAllInfo())
    // dispatch(getTicketAllInfo());
    // dispatch(getUsersAll())
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

  const types = ["Inbox", "new", "processing", "done", "Outbox"]
  const [counters, setCounters] = useState([])
  const [dataTable, setDataTable] = useState(ticketData)

  const [isLoading, setLoading] = useState(true)
  const [activeTab, setactiveTab] = useState(0)
  // const [modal, setmodal] = useState(false)

  // -----------------------------------------------------------------
  const getListInternStatus = index => {
    if (user) {
      if (index == 0) {
        const newArr = ticketData
          .filter(
            ticket =>
              ticket.receiver_id == user.id &&
              ticket.receiver_type == user.user_type
          )
          .map(item => {
            return {
              ...item,
              send_date: moment(item.send_date).format("YYYY-MM-DD"),
            }
          })
        setDataTable(newArr)
      } else if (index == 4) {
        const newArr = ticketData
          .filter(
            ticket =>
              ticket.sender_id == user.id &&
              ticket.sender_type == user.user_type
          )
          .map(item => {
            return {
              ...item,
              send_date: moment(item.send_date).format("YYYY-MM-DD"),
            }
          })
        setDataTable(newArr)
      } else {
        const arr = ticketData.filter(
          item =>
            item.ticket_status == types[index] &&
            item.receiver_type == user.user_type
        )
        const newArr = arr.map(item => {
          return {
            ...item,
            send_date: moment(item.send_date).format("YYYY-MM-DD"),
          }
        })
        setDataTable(newArr)
      }
    }
  }

  useEffect(() => {
    getListInternStatus(activeTab)
  }, [activeTab, ticketData])

  useEffect(() => {
    if (ticketData && user) {
      const arr = types.map((type, index) => {
        if (type === "Inbox") {
          return ticketData.filter(
            ticket =>
              ticket.receiver_id == user.id &&
              ticket.receiver_type == user.user_type
          ).length
        } else if (type === "Outbox") {
          return ticketData.filter(
            ticket =>
              ticket.sender_id == user.id &&
              ticket.sender_type == user.user_type
          ).length
        } else {
          return ticketData.filter(
            item =>
              item.ticket_status == type && item.receiver_type == user.user_type
          ).length
        }
      })
      setCounters(arr)
    }
  }, [ticketData, activeTab])

  // -----------------------------------------------------------------
  // -----------------------------------------------------------------

  // show list data
  const [userType, setUserType] = useState(UserTypeList[0])
  const [dataOptions, setDataOptions] = useState([])
  const [selectOption, setSelectOption] = useState()

  // useEffect(() => {
  //     if(userType === )
  // }, [userType])


  // console.log('ticketData', ticketData)
  // console.log('user', user)

  return (
    <React.Fragment>
      <div className="bg-light" onClick={() => {setIsReponse(false);}}>
        <Row>
          <Col lg="2">
            <div className="d-flex justify-content-center">
              <Card className="w-100" style={{ margin: "10px 10px 10px 10px" }}>
                <Button
                  type="button"
                  color="danger"
                  onClick={() => {
                    setIsEditTicket(false)
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
                          active: activeTab === 4,
                        })}
                        onClick={() => {
                          setactiveTab(4)
                        }}
                      >
                        <i className="mdi mdi-email-outline me-2"></i> Outbox{" "}
                        <span className="ml-1 float-end">({counters[4]})</span>
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
            <div className="d-flex justify-content-center">
              {isLoading ? (
                <Spinners setLoading={setLoading} />
              ) : (
                <Card
                  className="w-100"
                  style={{ margin: "10px 10px 10px 10px" }}
                >
                  <TableDatas dataTable={dataTable} />
                </Card>
              )}
            </div>
          </Col>

          <Modal
            size="xl"
            isOpen={modal}
            autoFocus={false}
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
                {isEditTicket
                  ? `Ticket ID - ${
                      ticketRowData != null ? ticketRowData.id : "---"
                    }`
                  : "Create new ticket"}
              </ModalHeader>
              <ModalBody>
                <form>
                  {!isEditTicket && (
                    <Card>
                      <CardBody className="bg-light">
                        <div className="mb-3">
                          <Select
                            name=""
                            placeholder="Select object send"
                            value={userType}
                            onChange={(item) => {
                              setUserType(item);
                            }}
                            options={UserTypeList}
                            className="mb-3"
                          />
                          <Input
                            type="email"
                            className="form-control mb-3"
                            placeholder="To"
                          />
                          <Input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Subject"
                          />
                          <Editor
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                          />
                        </div>
                      </CardBody>
                    </Card>
                  )}

                  {isEditTicket && (
                    <>
                      <div className="mb-3">
                        <h3>
                          {ticketRowData != null
                            ? ticketRowData.title
                            : "Title"}
                        </h3>
                        <Card className="bg-light d-flex justify-content-center">
                          <p className="m-2 fw-bold">
                            {ticketRowData != null
                              ? ticketRowData.content
                              : "Content"}
                          </p>
                        </Card>
                      </div>
                      <Card>
                        <CardBody className="bg-light">
                          <ChatBox />
                        </CardBody>
                      </Card>
                    </>
                  )}

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
                {(isReponse || !isEditTicket) ? (
                  <div className="d-flex gap-2">
                    <Button
                      type="button"
                      color="secondary"
                      onClick={() => {
                        setIsReponse(false)
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
