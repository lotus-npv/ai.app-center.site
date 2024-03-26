import React, { useState, useEffect } from "react"
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
// Import Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
//Import Email Topbar
import EmailToolbar from "./email-toolbar"
import Chat from "./chat"
//redux
import Spinners from "components/Common/Spinner"
import moment from "moment"

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

const EmailInbox = props => {
  //meta title
  document.title = "Inbox | Skote - React Admin & Dashboard Template"

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
      <div className="">
        <Row>
          <Col xs="12">
            {/* Render Email SideBar */}
            <Card className="email-leftbar">
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

                  {/* <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 3,
                        })}
                        onClick={() => {
                          setactiveTab(3);
                          dispatch(onGetMailsLists(3));
                        }}
                      >
                        <i className="mdi mdi-email-check-outline me-2"></i>Sent
                        Mail
                      </NavLink>
                    </NavItem> */}
                  {/* 
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 4,
                        })}
                        onClick={() => {
                          setactiveTab(4);
                          dispatch(onGetMailsLists(4));
                        }}
                      >
                        <i className="mdi mdi-trash-can-outline me-2"></i>Trash
                      </NavLink>
                    </NavItem> */}
                </Nav>
              </div>

              {/* <h6 className="mt-4">Labels</h6>

                <div className="mail-list mt-1">
                  {
                    (labelsData || []).map((item, index) => (
                      <Link to="#" key={index}><span className={item.icon}></span>{item.text}</Link>
                    ))
                  }
                </div>

                <h6 className="mt-4">Chat</h6>

                <div className="mt-2">
                  {
                    (mailChatData || []).map((item, index) => (
                      <Link to="#" className="d-flex" key={index}>
                        <div className="flex-shrink-0">
                          <img
                            className="d-flex me-3 rounded-circle"
                            src={item.imageSrc}
                            alt="skote"
                            height="36"
                          />
                        </div>
                        <div className="flex-grow-1 chat-user-box">
                          <p className="user-title m-0">{item.userTitle}</p>
                          <p className="text-muted">{item.textMessage}</p>
                        </div>
                      </Link>
                    ))
                  }
                </div> */}
            </Card>

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
                  New Message
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
                        <Chat />
                      </CardBody>
                    </Card>
                    <Editor
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                    />
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    color="secondary"
                    onClick={() => {
                      setmodal(!modal)
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => setmodal(!modal)}
                  >
                    Send <i className="fab fa-telegram-plane ms-1"></i>
                  </Button>
                </ModalFooter>
              </div>
            </Modal>

            <div className="email-rightbar mb-3">
              {isLoading ? (
                <Spinners setLoading={setLoading} />
              ) : (
                <Card>
                  <TableDatas dataTable={dataTable} />

                  {/* <EmailToolbar
                    selectedmails={selectedmails}
                    activeTab={activeTab}
                    setSearch={setSearch}
                  /> */}

                  {/* {mailslists.length > 0 ?
                        <>
                          <ul className="message-list">
                            {map(mailsList, (mail, key) => (
                              <li key={key} className={mail.read ? "" : "unread"}>
                                <div className="col-mail col-mail-1">
                                  <div className="checkbox-wrapper-mail">
                                    <Input type="checkbox" value={mail.id} id={mail.id} name="emailcheckbox"
                                      onChange={(e) => e.target.value}
                                      onClick={(e) => handleSelect(e.target.value)} checked={selectedmails.includes(mail.id)} />
                                    <Label htmlFor={mail.id} className="toggle" />
                                  </div>
                                  <Link to="#" className="title">
                                    {mail.name}
                                  </Link>
                                  {mail.starred ?
                                    <span className="star-toggle fas fa-star text-warning" style={{ cursor: "pointer" }} onClick={() => hasStarred(mail)} />
                                    : <span className="star-toggle far fa-star" style={{ cursor: "pointer" }} onClick={() => hasStarred(mail)} />}
                                </div>
                                <div className="col-mail col-mail-2">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: mail.description,
                                    }}
                                  ></div>
                                  <div className="date">{mail.date}</div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </>
                        : <div className="align-items-center text-center p-4"> <i className="mdi mdi-email-outline me-2 display-5"></i> <h4> No Recored Found </h4>
                        </div>} */}
                </Card>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default withRouter(EmailInbox)
