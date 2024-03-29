import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import classname from "classnames";
import DataContext from "data/DataContext"
//i18n
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";

const Navbar = props => {

  const [dashboard, setdashboard] = useState(false);
  const [intern, setIntern] = useState(false);
  const [app, setapp] = useState(false);
  const [email, setemail] = useState(false);
  const [ecommerce, setecommerce] = useState(false);
  const [crypto, setcrypto] = useState(false);
  const [project, setproject] = useState(false);
  const [task, settask] = useState(false);
  const [contact, setcontact] = useState(false);
  const [blog, setBlog] = useState(false);
  const [job, setJob] = useState(false);
  const [candidate, setCandidate] = useState(false);
  const [component, setcomponent] = useState(false);
  const [form, setform] = useState(false);
  const [table, settable] = useState(false);
  const [chart, setchart] = useState(false);
  const [icon, seticon] = useState(false);
  const [map, setmap] = useState(false);
  const [extra, setextra] = useState(false);
  const [invoice, setinvoice] = useState(false);
  const [auth, setauth] = useState(false);
  const [utility, setutility] = useState(false);

  const { user } = useContext(DataContext)
  const [isShow, setShow] = useState([])
  console.log("user menu", user)
  useEffect(() => {
    if (user) {
      if (user.user_type == "syndication") {
        setShow([true, true, true, true, true, true, true, true,true])
      } else if (user.user_type == "dispatching_company") {
        setShow([true, true, true, false, true, true, true, true, true])
      } else if (user.user_type == "receiving_factory") {
        setShow([true, true, false, true, true, true, true, true, true])
      } else if(user.user_type == "intern"){
        setShow([false, false, false, false, true, false, true, false, false])
      }
    }
  },[user])

  useEffect(() => {
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    removeActivation(items);
    for (var i = 0; i < items.length; ++i) {
      if (window.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }


  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">

                {isShow[0] && <li className="nav-item">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      // e.preventDefault();
                      setdashboard(!dashboard);
                    }}
                    to="/dashboard"
                  >
                    <i className="bx bxs-report me-2"></i>
                    {props.t("Report")} {props.menuOpen}
                  </Link>
                </li>}

                {isShow[1] && <li className="nav-item">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      // e.preventDefault();
                      setIntern(!intern);
                    }}
                    to="/intern"
                  >
                    <i className="bx bx-user-circle me-2"></i>
                    {props.t("Intern")} {props.menuOpen}
                  </Link>
                </li>}

               {isShow[2] &&  <li className="nav-item">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      // e.preventDefault();
                      setdashboard(!dashboard);
                    }}
                    to="/receiving-factory"
                  >
                    <i className="bx bx-buildings me-2"></i>
                    {props.t("Receiving Factory")} {props.menuOpen}
                  </Link>
                </li>}

                {isShow[3] && <li className="nav-item">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      // e.preventDefault();
                      setdashboard(!dashboard);
                    }}
                    to="/dispatching-company"
                  >
                    <i className="bx bx-briefcase me-2"></i>
                    {props.t("Dispatching Company")} {props.menuOpen}
                  </Link>
                </li>}

                {isShow[4] && <li className="nav-item">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      // e.preventDefault();
                      setdashboard(!dashboard);
                    }}
                    to="/contacts"
                  >
                    <i className="bx bx-list-ol me-2"></i>
                    {props.t("Contact List")} {props.menuOpen}
                  </Link>
                </li>}

                {isShow[5] && <li className="nav-item">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      // e.preventDefault();
                      setdashboard(!dashboard);
                    }}
                    to="/violate"
                  >
                    <i className="bx bx-support me-2"></i>
                    {props.t("Violation List")} {props.menuOpen}
                  </Link>
                </li>}

                {isShow[6] && <li className="nav-item">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      // e.preventDefault();
                      setdashboard(!dashboard);
                    }}
                    to="/ticket"
                  >
                    <i className="bx bx-support me-2"></i>
                    {props.t("Support")} {props.menuOpen}
                  </Link>
                </li>
}
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    to="/#"
                    onClick={e => {
                      e.preventDefault();
                      setextra(!extra);
                    }}
                  >
                    <i className="bx bx-cog me-2"></i>
                    {props.t("Settings")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: extra })}>
                    <div className="dropdown">
                      {isShow[7] && <Link
                        to="/pages-status"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          // e.preventDefault();
                          setinvoice(!invoice);
                        }}
                      >
                        {props.t("Trạng thái")} 
                      </Link>}
                      {isShow[8] && <Link
                        to="/pages-career"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          // e.preventDefault();
                          setinvoice(!invoice);
                        }}
                      >
                        {props.t("Industry")} 
                      </Link>}
                    </div>
                  </div>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
);
