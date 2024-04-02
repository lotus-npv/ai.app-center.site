import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../../assets/images/users/avatar-4.jpg"

//i18n
import { withTranslation } from "react-i18next"

//redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { getNotiUserId } from "store/actions"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getNotiUserId(user.id))
    }, 10000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const handleWatchNoti = () => {

  }

  console.log("notidata:", notiData)

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
          <span className="badge bg-danger rounded-pill">{notiData.length}</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <a href="#" className="small">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {notiData.map(noti => (
              <Link to="" className="text-reset notification-item" key={noti.id} onClick={() => {
                handleWatchNoti(noti);
              }}>
                <div className="d-flex">
                  <div className="avatar-xs me-3">
                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                      <i className="mdi mdi-email-outline" />
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mt-0 mb-1">
                      {props.t(noti.title)}
                    </h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        {props.t(noti.content)}
                      </p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" />{" "}
                        {props.t("3 min ago")}{" "}
                      </p>
                    </div>
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
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
