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
  Label,
  Badge,
} from "reactstrap"
import TableDatas from "./TableDatas"
import classnames from "classnames"
import Select from "react-select"
import { Link } from "react-router-dom"
//Import Email Topbar
import Spinners from "components/Common/Spinner"
import moment from "moment"
import DataContext from "data/DataContext"
import { Editor } from "primereact/editor"

import { Accordion, AccordionTab } from "primereact/accordion"
import { Avatar } from "primereact/accordion"
import { Badge as BadgePrime } from "primereact/accordion"

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  getDispatchingCompanyUserId,
  getInternUserId,
  getReceivingFactoryUserId,
  getSyndicationUserId,
  getTicketDetailAll,
  getTicketUserId,
  getUsersAll,
  setTicket,
  setTicketDetail,
  updateTicket,
} from "store/actions"
import ChatBox from "./ChatBox"
import { EffectCards } from "swiper/modules"
import { toast } from "react-toastify"

const TicketInbox = props => {
  //meta title
  document.title = "Inbox | Skote - React Admin & Dashboard Template"
  const user = JSON.parse(localStorage.getItem("authUser"))[0]

  const [modal_backdrop, setmodal_backdrop] = useState(false)
  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop)
    removeBodyCss()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  const {
    isReponse,
    setIsReponse,
    modal,
    setmodal,
    ticketRowData,
    setTicketRowData,
    isEditTicket,
    setIsEditTicket,
    UserTypeList,
    isInbox,
    setIsInbox,
    isOutbox,
    setIsOutbox,
  } = useContext(DataContext)

  const dispatch = useDispatch()
  const {
    ticketData,
    usersData,
    companyData,
    factoryData,
    syndicationData,
    internData,
    setTicketLoading,
    setTicketData
  } = useSelector(
    state => ({
      ticketData: state.Ticket.datas,
      usersData: state.Users.datas,
      companyData: state.DispatchingCompany.datas,
      factoryData: state.ReceivingFactory.datas,
      syndicationData: state.Syndication.datas,
      internData: state.Intern.datas,
      setTicketLoading: state.Ticket.loading,
      setTicketData: state.Ticket.data,
    }),
    shallowEqual
  )

  // Get du lieu lan dau
  useEffect(() => {
    if (user) {
      dispatch(getTicketUserId(user.id))
      dispatch(getDispatchingCompanyUserId(user.id))
      dispatch(getReceivingFactoryUserId(user.id))
      dispatch(getSyndicationUserId(user.id))
      dispatch(getInternUserId(user.id))
      dispatch(getUsersAll())
    }
  }, [dispatch])

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (user) {
        dispatch(getTicketUserId(user.id))
      }
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

  // dieu khien Accordion hien thi tieu de ticket
  const [activeIndex, setActiveIndex] = useState(0)

  //------------------------------------------------------------------

  // -----------------------------------------------------------------
  // Tai danh sach ticket khi bam chon o menu
  const getListTicketStatus = index => {
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
        // console.log(newArr)
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
            (item.receiver_type == user.user_type ||
              item.sender_type == user.user_type)
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
    getListTicketStatus(activeTab)
  }, [activeTab, ticketData])

  useEffect(() => {
    if (ticketData && user) {
      const arr = types.map((type, index) => {
        if (type === "Inbox") {
          return ticketData.filter(ticket => ticket.receiver_id == user.id)
            .length
        } else if (type === "Outbox") {
          return ticketData.filter(ticket => ticket.sender_id == user.id).length
        } else {
          return ticketData.filter(
            item =>
              item.ticket_status == type &&
              (item.receiver_type == user.user_type ||
                item.sender_type == user.user_type)
          ).length
        }
      })
      setCounters(arr)
    }
  }, [ticketData, activeTab])

  // -----------------------------------------------------------------
  // -----------------------------------------------------------------

  // show list data
  const [typeOptios, setTypeOptions] = useState([])
  const [dataOptions, setDataOptions] = useState([])

  const [userType, setUserType] = useState()
  const [selectOption, setSelectOption] = useState()
  const [title, setTitle] = useState()
  const [content, setContent] = useState("")

  // loc ra cac type khac voi user
  useEffect(() => {
    if (user) {
      setTypeOptions(
        UserTypeList.filter(type => type.value != user.object_type)
      )
    }
  }, [modal])

  // console.log(typeOptios)

  useEffect(() => {
    if (userType) {
      if (userType.value === "intern") {
        const arr = usersData.filter(u => u.object_type == "intern" && u.key_license_id == user.key_license_id)
        const newArr = arr.map(u => {
          const name = internData.find(intern => intern.id = u.object_id)
          
          return { ...u, label: name.laber, value: u.id }
        })
        console.log('newArr', newArr);
        setDataOptions(arr)
      } else if (userType.value === "syndication") {
        const arr = usersData.filter(u => u.object_type == "syndication" && u.key_license_id == user.key_license_id)
        const newArr = arr.map(u => {
          // const name = internData.find(intern => intern.id = u.object_id)
          return { ...u, label: "Insyndicationtern", value: u.id }
        })
        setDataOptions(arr)
      } else if (userType.value === "dispatching_company") {
        const arr = usersData.filter(
          u => u.object_type == "dispatching_company" && u.key_license_id == user.key_license_id
        )
        const newArr = arr.map(u => {
          // const name = internData.find(intern => intern.id = u.object_id)
          return { ...u, label: "dispatching_company", value: u.id }
        })
        setDataOptions(arr)
      } else if (userType.value === "receiving_factory") {
        const arr = usersData.filter(u => u.object_type == "receiving_factory" && u.key_license_id == user.key_license_id)
        const newArr = arr.map(u => {
          // const name = internData.find(intern => intern.id = u.object_id)
          return { ...u, label: "receiving_factory", value: u.id }
        })
        setDataOptions(arr)
      }
    }
  }, [userType])

  // useEffect(() => {
  //   if (user) {
  //     if (user.user_type == "syndication") {
  //     }
  //   }
  // })

  // -----------------------------------------------------------------
  //cho phep duoc ghi ticket detail
  const [isSetTicketDone, setIsSetTicketDone] = useState(false);

  // thuc thi ghi ticket moi
  const handCreateNewTicket = () => {
    if (userType && selectOption && title && content) {
      let time = moment().utcOffset("+09:00").format("YYYY-MM-DD HH:mm:ss")
      const newTicket = {
        key_license_id: user.key_license_id,
        send_date: time,
        title: title,
        content: content,
        sender_id: user.id,
        receiver_id: selectOption.id,
        priority: "Low",
        ticket_status: "new",
        description: "",
        create_at: time,
        create_by: user.id,
        update_at: time,
        update_by: user.id,
        delete_at: null,
        flag: 1,
      }
      console.log("content", newTicket)
      dispatch(setTicket(newTicket))
      setIsSetTicketDone(true);
    
      setIsReponse(false)
      setmodal(!modal)
    } else {
      toast.warning("Please enter complete information !", { autoClose: 2000 })
    }
  }

  useEffect(() => {
    if(setTicketData) {
      console.log('setTicketData', setTicketData);
      if(isSetTicketDone && !setTicketLoading) {
        const ticket_id = setTicketData.id;
        let time = moment().utcOffset("+09:00").format("YYYY-MM-DD HH:mm:ss")
        const newTicketDetail = {
          key_license_id: user.key_license_id,
          ticket_id: ticket_id,
          sender_id: user.id,
          send_date: time,
          content: content,
          description: "",
          create_at: time,
          create_by: user.id,
          update_at: time,
          update_by: user.id,
          delete_at: null,
          flag: 1,
        }
        dispatch(setTicketDetail(newTicketDetail))
        setIsSetTicketDone(false);
      }
    }
  }, [setTicketData, isSetTicketDone])

  // add ticket detail
  const handleResponseTicket = () => {
    let time = moment().utcOffset("+09:00").format("YYYY-MM-DD HH:mm:ss")
    console.log("edit")
    if (content) {
      const newTicketDetail = {
        key_license_id: user.key_license_id,
        ticket_id: ticketRowData.id,
        sender_id: user.id,
        send_date: time,
        content: content,
        description: "",
        create_at: time,
        create_by: user.id,
        update_at: time,
        update_by: user.id,
        delete_at: null,
        flag: 1,
      }
      dispatch(setTicketDetail(newTicketDetail))

      // const count = ticketDetailData.filter(td => td.ticket_id == ticketRowData.id && td.sender_id != user.id);
      if (ticketRowData.sender_id != user.id) {
        if (ticketRowData.ticket_status == "new") {
          const { receiver_name, sender_name, ...oldTicket } = ticketRowData
          const ticket = {
            ...oldTicket,
            ticket_status: "processing",
            update_at: time,
          }
          dispatch(updateTicket(ticket))
        }
      }
      setContent("")
      // setIsReponse(false);
      // setmodal(!modal);
    } else {
      toast.warning("Please enter complete information !", { autoClose: 2000 })
    }
  }

  // Close ticket
  const handleCloseTicket = () => {
    let time = moment().utcOffset("+09:00").format("YYYY-MM-DD HH:mm:ss")
    if (ticketRowData) {
      const { receiver_name, sender_name, ...oldTicket } = ticketRowData
      const ticket = {
        ...oldTicket,
        ticket_status: "done",
        update_at: time,
      }
      dispatch(updateTicket(ticket))
      setIsReponse(false)
      setmodal_backdrop(false)
      setmodal(!modal)
    }
  }

  //-------------------------------------------------------------------------------

  // console.log("ticketData", ticketData)
  // console.log("user", user)
  // console.log("activeIndex", activeIndex)
  // console.table(ticketData);
  
  console.log('setTicketLoading', setTicketLoading);
  console.log('isSetTicketDone', isSetTicketDone);

  return (
    <React.Fragment>
      <div
        className="bg-light"
        onClick={() => {
          // setIsReponse(false)
        }}
      >
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
                          setIsInbox(true)
                          setIsOutbox(false)
                        }}
                      >
                        <i className="mdi mdi-email-outline me-2"></i> Inbox{" "}
                        <span className="ml-1 float-end fw-bold">
                          ({counters[0]})
                        </span>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 4,
                        })}
                        onClick={() => {
                          setactiveTab(4)
                          setIsInbox(false)
                          setIsOutbox(true)
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
                          setIsInbox(true)
                          setIsOutbox(true)
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
                          setIsInbox(true)
                          setIsOutbox(true)
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
                          setIsInbox(true)
                          setIsOutbox(true)
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
              setIsReponse(false)
            }}
          >
            <div className="modal-content">
              <ModalHeader
                toggle={() => {
                  setmodal(!modal)
                  setIsReponse(false)
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
                          <div className="input-group mb-3">
                            <Label
                              style={{ minWidth: "150px" }}
                              className="input-group-text"
                              htmlFor="inputGroupFile01"
                            >
                              Select object:
                            </Label>
                            <Select
                              id="inputGroupFile01"
                              name=""
                              placeholder="Select object type"
                              value={userType}
                              onChange={item => {
                                setUserType(item)
                                setSelectOption("")
                              }}
                              options={typeOptios}
                              className="form-control"
                            />
                          </div>

                          <div className="input-group mb-3">
                            <Label
                              style={{ minWidth: "150px" }}
                              className="input-group-text"
                              htmlFor="inputGroup2"
                            >
                              Send to:
                            </Label>
                            <Select
                              id="inputGroup2"
                              name=""
                              placeholder="Select object send"
                              value={selectOption}
                              onChange={item => {
                                setSelectOption(item)
                              }}
                              options={dataOptions}
                              className="form-control"
                            />
                          </div>

                          <div className="input-group mb-3">
                            <Label
                              style={{ minWidth: "150px" }}
                              className="input-group-text"
                              htmlFor="inputGroup3"
                            >
                              Title:
                            </Label>
                            <Input
                              id="inputGroup3"
                              type="text"
                              placeholder="Subject"
                              value={title}
                              onChange={e => {
                                setTitle(e.target.value)
                              }}
                              className="form-control"
                            />
                          </div>
                          <Editor
                            value={content}
                            onTextChange={e => setContent(e.htmlValue)}
                            style={{ height: "250px" }}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  )}

                  {isEditTicket && (
                    <>
                      <div className="mb-3 d-flex gap-2">
                        <i
                          className="pi pi-tags mt-2"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                        {ticketRowData != null ? (
                          <h2>{ticketRowData.title}</h2>
                        ) : (
                          "Title"
                        )}
                        {/* <Card className="bg-light d-flex justify-content-center">
                          <Accordion
                            activeIndex={0}
                            // onTabChange={e => setActiveIndex(e.index)}
                          >
                            <AccordionTab
                              header={
                                <span className="flex align-items-center gap-2 w-full">
                                  <span className="font-bold white-space-nowrap">
                                    CONTENT
                                  </span>
                                </span>
                              }
                            >
                              <div className="m-2 fw-bold">
                                {ticketRowData != null ? (
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: ticketRowData.content,
                                    }}
                                  ></p>
                                ) : (
                                  "Content"
                                )}
                              </div>
                            </AccordionTab>
                            <AccordionTab
                              header={
                                <span className="flex align-items-center gap-2 w-full">
                                  <span className="font-bold white-space-nowrap">
                                    CHAT
                                  </span>
                                </span>
                              }
                            >
                              <Card>
                                <CardBody className="bg-light">
                                  <ChatBox />
                                </CardBody>
                              </Card>
                            </AccordionTab>
                          </Accordion>
                        </Card> */}
                      </div>
                      <ChatBox />
                      <Editor
                        value={content}
                        onTextChange={e => setContent(e.htmlValue)}
                        style={{ height: "150px" }}
                      />
                    </>
                  )}
                </form>
              </ModalBody>

              <ModalFooter className="d-flex justify-content-between">
                {isEditTicket ? (
                  <Button
                    type="button"
                    color="secondary"
                    onClick={() => {
                      tog_backdrop()
                    }}
                  >
                    Close Ticket
                  </Button>
                ) : (
                  <div></div>
                )}

                <div className="d-flex gap-2">
                  {/* <Button
                    type="button"
                    color="secondary"
                    onClick={() => {
                      setIsReponse(false)
                      setmodal(!modal)
                    }}
                  >
                    Close
                  </Button> */}
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => {
                      if (isEditTicket) {
                        handleResponseTicket()
                      } else {
                        handCreateNewTicket()
                      }
                    }}
                  >
                    Send <i className="fab fa-telegram-plane ms-1"></i>
                  </Button>
                </div>
              </ModalFooter>
            </div>
          </Modal>

          <Modal
            isOpen={modal_backdrop}
            toggle={() => {
              tog_backdrop()
            }}
            backdrop={"static"}
            id="staticBackdrop"
          >
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Confirm ticket close
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setmodal_backdrop(false)
                }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                With this selection, you confirm that you will close the current
                ticket.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setmodal_backdrop(false)
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCloseTicket}
              >
                Save
              </button>
            </div>
          </Modal>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default withRouter(TicketInbox)
