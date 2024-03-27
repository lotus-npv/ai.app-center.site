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
// Import Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
//Import Email Topbar
import EmailToolbar from "./email-toolbar"
//redux
import Spinners from "components/Common/Spinner"
import moment from "moment"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
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
  setTicket,
  setTicketDetail,
} from "store/actions"
import ChatBox from "./ChatBox"
import { EffectCards } from "swiper/modules"
import { toast } from "react-toastify"

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
    isInbox,
    setIsInbox,
    isOutbox,
    setIsOutbox,
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

  //------------------------------------------------------------------

  // -----------------------------------------------------------------
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
    getListTicketStatus(activeTab)
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
  const [typeOptios, setTypeOptions] = useState([])
  const [dataOptions, setDataOptions] = useState([])

  const [userType, setUserType] = useState()
  const [selectOption, setSelectOption] = useState()
  const [title, setTitle] = useState()
  const [content, setContent] = useState()

  // loc ra cac type khac voi user
  useEffect(() => {
    if (user) {
      setTypeOptions(UserTypeList.filter(type => type.value != user.user_type))
    }
  }, [modal])

  useEffect(() => {
    if (userType) {
      if (userType.value === "intern") {
        const arr = internData.filter(
          intern => intern.key_license_id == user.key_license_id
        )
        setDataOptions(arr)
        console.log(arr)
      } else if (userType.value === "syndication") {
        setDataOptions(syndicationData)
      } else if (userType.value === "dispatching_company") {
        setDataOptions(companyData)
      } else if (userType.value === "receiving_factory") {
        setDataOptions(factoryData)
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

  // thu thi ghi ticket moi
  const handCreateNewTicket = () => {
    if (userType && selectOption && title && content) {
      const newTicket = {
        key_license_id: user.key_license_id,
        send_date: moment().utcOffset("+09:00").format("YYYY-MM-DD HH:mm:ss"),
        title: title,
        content: content,
        sender_type: user.user_type,
        sender_id: user.id,
        receiver_type: userType.value,
        receiver_id: selectOption.id,
        priority: "Low",
        ticket_status: "new",
        description: "",
        create_at: null,
        create_by: user.id,
        update_at: null,
        update_by: user.id,
        delete_at: null,
        flag: 1,
      }
      console.log("content", newTicket)
      dispatch(setTicket(newTicket))
      setIsReponse(false)
      setmodal(!modal)
    } else {
      toast.warning("Please enter complete information !", { autoClose: 2000 })
    }
  }

  const handleResponseTicket = () => {
    console.log("edit")
    if (content) {
      const newTicketDetail = {
        key_license_id: user.key_license_id,
        ticket_id: ticketRowData.id,
        sender_type: user.user_type,
        sender_id: user.id,
        send_date: moment().utcOffset("+09:00").format("YYYY-MM-DD HH:mm:ss"),
        content: content,
        description: "",
        create_at: null,
        create_by: user.id,
        update_at: null,
        update_by: user.id,
        delete_at: null,
        flag: 1,
      }
      console.log("content", newTicketDetail)
      dispatch(setTicketDetail(newTicketDetail))
      setIsReponse(false)
      setmodal(!modal)
    } else {
      toast.warning("Please enter complete information !", { autoClose: 2000 })
    }
  }

  // console.log('ticketData', ticketData)
  console.log("content", content)
  // console.log('outbox', isOutbox)

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

                          <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onReady={editor => {
                              // You can store the "editor" and use when it is needed.
                              // console.log("Editor is ready to use!", editor)
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData()
                              setContent(data)
                            }}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  )}

                  {isEditTicket && (
                    <>
                      <div className="mb-3">
                        {ticketRowData != null ? (
                          <h2>{ticketRowData.title}</h2>
                        ) : (
                          "Title"
                        )}
                        <Card className="bg-light d-flex justify-content-center">
                          <p className="m-2 fw-bold">
                            {ticketRowData != null ? (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: ticketRowData.content,
                                }}
                              ></p>
                            ) : (
                              "Content"
                            )}
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
                    <CKEditor
                      editor={ClassicEditor}
                      data={content}
                      onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log("Editor is ready to use!", editor)
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        setContent(data)
                      }}
                    />
                  )}
                </form>
              </ModalBody>

              <ModalFooter>
                {isReponse || !isEditTicket ? (
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
