import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty, map } from "lodash"
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledAlert,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import classnames from "classnames"

// emoji
import EmojiPicker from "emoji-picker-react"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import avatar1 from "../../assets/images/users/avatar-1.jpg"

// simple bar
import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"

import { chats, messages, contacts, groups } from "../../common/data/chat"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import Spinners from "components/Common/Spinner"

const Chat = () => {
  const [isLoading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [copyMsgAlert, setCopyMsgAlert] = useState(false)
  const [emoji, setEmoji] = useState(false)
  const [curMessage, setcurMessage] = useState("")
  const [isdisable, setDisable] = useState(false)

  // scroll simple bar
  const scroollRef = useRef(null)
  useEffect(() => {
    if (scroollRef.current) {
      scroollRef.current.getScrollElement().scrollTop =
        scroollRef.current.getScrollElement().scrollHeight
    }
  }, [messages])

  const copyMsg = ele => {
    var copyText = ele
      .closest(".conversation-list")
      .querySelector("p").innerHTML
    navigator.clipboard.writeText(copyText)
    setCopyMsgAlert(true)
    if (copyText) {
      setTimeout(() => {
        setCopyMsgAlert(false)
      }, 1000)
    }
  }
  // emoji
  const [emojiArray, setemojiArray] = useState("")
  const onEmojiClick = (event, emojiObject) => {
    setemojiArray([...emojiArray, emojiObject.emoji])
    setcurMessage(curMessage + event.emoji)
    setDisable(true)
  }

  const onKeyPress = e => {
    const { key, value } = e
    if (key === "Enter") {
      setcurMessage(value)
      setDisable(true)
      addMessage()
    }
  }

  //  img upload
  const handleImageChange = event => {
    event.preventDefault()
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.onloadend = () => {
      setSelectedImage(reader.result)
      setDisable(true)
    }
    reader.readAsDataURL(file)
  }

  const currentTime = new Date()
  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const time = `${hours}: ${minutes}`
  const addMessage = () => {
    if (curMessage !== "" || selectedImage !== null) {
      const newMessage = {
        id: Math.floor(Math.random() * 100),
        to_id: 2,
        msg: curMessage,
        isSameTime: true,
        images: selectedImage,
        time: time,
      }
      setcurMessage("")
      setDisable(false)
      setEmoji(false)
      setSelectedImage(null)
    }
  }
  const [deleteMsg, setDeleteMsg] = useState("");
  const toggle_deleMsg = (id) => {
    setDeleteMsg(!deleteMsg);
  };

  return (
    <>
      <div className="w-100 user-chat">
        <Card>
          <div>
            <div className="chat-conversation p-3">
              <SimpleBar ref={scroollRef} style={{ height: "300px" }}>
                {isLoading ? (
                  <Spinners setLoading={setLoading} />
                ) : (
                  <ul className="list-unstyled mb-0">
                    {messages &&
                      (messages || []).map(message => {
                        return message.usermessages.map((userMsg, index) => {
                          return (
                            <li
                              key={index}
                              className={userMsg.to_id === 1 ? "" : "right"}
                            >
                              <div className="conversation-list">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    href="#!"
                                    tag="a"
                                    className="dropdown-toggle"
                                  >
                                    <i className="bx bx-dots-vertical-rounded" />
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem
                                      onClick={e => copyMsg(e.target)}
                                      href="#"
                                    >
                                      Copy
                                    </DropdownItem>
                                    <DropdownItem href="#">Save</DropdownItem>
                                    <DropdownItem href="#">
                                      Forward
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={e => toggle_deleMsg(userMsg.id)}
                                      href="#"
                                    >
                                      Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                                <div className="ctext-wrap">
                                  <div className="conversation-name">
                                    {userMsg.to_id === 1
                                      ? message.sender
                                      : "You"}
                                  </div>
                                  <p>{userMsg.msg}</p>
                                  {userMsg.images && (
                                    <img
                                      src={userMsg.images}
                                      alt=""
                                      width="150px"
                                    />
                                  )}
                                  {userMsg.time !== 0 && (
                                    <p className="chat-time mb-0">
                                      <i className="bx bx-time-five align-middle me-1"></i>
                                      {userMsg.time}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </li>
                          )
                        })
                      })}
                  </ul>
                )}
              </SimpleBar>
            </div>

            {selectedImage && (
              <div className="replymessage-block mb-0 d-flex align-items-start">
                <div className="flex-grow-1">
                  <img
                    src={selectedImage}
                    alt="select img"
                    style={{ width: "150px", height: "auto" }}
                  />
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    id="close_toggle"
                    className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                    onClick={() => setSelectedImage(null)}
                  >
                    <i className="bx bx-x align-middle"></i>
                  </button>
                </div>
              </div>
            )}

            {copyMsgAlert && (
              <UncontrolledAlert color="warning" dismissible role="alert">
                {" "}
                Message copied
              </UncontrolledAlert>
            )}
            {emoji && (
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                width={250}
                height={382}
              />
            )}
            {/* <div className="p-3 chat-input-section">
              <Row>
                <Col>
                  <div className="position-relative">
                    <input
                      type="text"
                      value={curMessage}
                      onKeyPress={onKeyPress}
                      onChange={e => {
                        setcurMessage(e.target.value)
                        setDisable(true)
                      }}
                      className="form-control chat-input"
                      placeholder="Enter Message..."
                    />
                    <div className="chat-input-links">
                      <ul className="list-inline mb-0">
                        <li
                          className="list-inline-item"
                          onClick={() => setEmoji(!emoji)}
                        >
                          <Link to="#">
                            <i
                              className="mdi mdi-emoticon-happy-outline me-1"
                              id="Emojitooltip"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="Emojitooltip"
                            >
                              Emojis
                            </UncontrolledTooltip>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <label
                            htmlFor="imageInput"
                            style={{ color: "#556ee6", fontSize: 16 }}
                          >
                            <i
                              className="mdi mdi-file-image-outline me-1"
                              id="Imagetooltip"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="Imagetooltip"
                            >
                              Images
                            </UncontrolledTooltip>
                          </label>
                          <input
                            type="file"
                            id="imageInput"
                            className="d-none"
                            onChange={handleImageChange}
                          />
                        </li>
                        <li className="list-inline-item">
                          <Link to="#">
                            <i
                              className="mdi mdi-file-document-outline"
                              id="Filetooltip"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="Filetooltip"
                            >
                              Add Files
                            </UncontrolledTooltip>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col className="col-auto">
                  <Button
                    type="button"
                    color="primary"
                    disabled={!isdisable}
                    onClick={() => addMessage()}
                    className="btn btn-primary btn-rounded chat-send w-md "
                  >
                    <span className="d-none d-sm-inline-block me-2">Send</span>{" "}
                    <i className="mdi mdi-send" />
                  </Button>
                </Col>
              </Row>
            </div> */}
          </div>
        </Card>
      </div>
    </>
  )
}

export default Chat
