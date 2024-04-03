import React, { useEffect, useState, useContext } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../../assets/images/users/avatar-4.jpg"
import DataContext from "data/DataContext"
//i18n
import { withTranslation } from "react-i18next"
import ModalNoti from "./ModalNoti"
import _ from "lodash"

import moment from "moment"

//redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { getNotiUserId, updateNoti } from "store/actions"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  // data context
  const {
    modal_noti,
    setmodal_noti,
    tog_modal_noti,
    notification,
    setNotification,
    socket,
  } = useContext(DataContext)

  const user = JSON.parse(localStorage.getItem("authUser"))[0]

  const dispatch = useDispatch()

  const { notiData } = useSelector(
    state => ({
      notiData: state.Noti.datas,
    }),
    shallowEqual
  )

  useEffect(() => {
    if (user) {
      dispatch(getNotiUserId(user.id))
    }
  }, [dispatch])

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     dispatch(getNotiUserId(user.id))
  //   }, 10000)
  //   return () => {
  //     clearInterval(intervalId)
  //   }
  // }, [])

  useEffect(() => {
    if (user) {
      dispatch(getNotiUserId(user.id))
    }
  }, [notification])

  const [dataShow, setDataShow] = useState()
  useEffect(() => {
    if (notiData) {
      setDataShow(_.sortBy(notiData, noti => -noti.date_noti))
    }
  }, [notiData])

  //=====================================================================================================//
  // send noti socket
  const sendNoti = mes => {
    socket.emit("notification", mes)
    setNotification("")
  }
  //=====================================================================================================//

  const [selectNoti, setSelectNoti] = useState()
  const handleWatchNoti = noti => {
    const newNoti = {
      ...noti,
      watched: 1,
    }
    dispatch(updateNoti(newNoti))
    // dispatch(getNotiUserId(user.id))
    sendNoti("update noti")
    setSelectNoti(newNoti)
    tog_modal_noti()
  }

  const handleNoWatch = e => {
    e.preventDefault()
    console.log("object")
    const arr = notiData.filter(noti => noti.watched == 0)
    setDataShow(arr)
  }
  const handleAllWatch = e => {
    e.preventDefault()
    console.log("object")
    setDataShow(notiData)
  }

  console.log("notidata:", notiData)
  console.log("user:", user)

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          {notiData.filter(noti => noti.watched == 0).length > 0 && (
            <span className="badge bg-danger rounded-pill">
              {notiData.filter(noti => noti.watched == 0).length}
            </span>
          )}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <a href="#" className="small" onClick={handleNoWatch}>
                  {" "}
                  View New
                </a>
              </div>
              {"/"}
              <div className="col-auto">
                <a href="#" className="small" onClick={handleAllWatch}>
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {dataShow &&
              dataShow.map(noti => (
                <Link
                  to=""
                  className="text-reset notification-item"
                  key={noti.id}
                  onClick={() => {
                    handleWatchNoti(noti)
                  }}
                >
                  <div className="d-flex">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title bg-primary rounded-circle font-size-16">
                        {noti.watched == 0 ? (
                          <i className="mdi mdi-email-newsletter" />
                        ) : (
                          <i className="mdi mdi-email-check" />
                        )}
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <h6
                        className={`mt-0 mb-1 ${
                          noti.watched == 0 ? "fw-bold font-size-15" : ""
                        }`}
                      >
                        {props.t(noti.title)}
                      </h6>
                      <div className="font-size-12 text-muted">
                        <p
                          className={`mb-1 ${
                            noti.watched == 0 ? "fw-bold font-size-13" : ""
                          }`}
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "200px",
                          }}
                        >
                          {props.t(noti.content)}
                        </p>
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline" />{" "}
                          {moment(noti.date_noti)
                            .utc("+09:00")
                            .format("HH:mm MM/DD/YYYY")}
                        </p>
                      </div>
                    </div>
                    <div>
                      {noti.watched == 0 ? (
                        <i className="bx bx-bell bx-tada" />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              <span key="t-view-more">{props.t("View More..")}</span>
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
      <ModalNoti noti={selectNoti} user={user} />
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
