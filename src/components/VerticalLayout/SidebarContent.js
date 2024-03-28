import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
  useState,
} from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import withRouter from "components/Common/withRouter"
import { Link } from "react-router-dom"
import DataContext from "data/DataContext"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const { user } = useContext(DataContext)
  const [isShow, setShow] = useState([])

  console.log("user menu", user)
  useEffect(() => {
    if (user) {
      if (user.object_type == "syndication") {
        setShow([true, true, false, true, true, true, true, true,true,true])
      } else if (user.object_type == "receiving_factory") {
        setShow([true, true, true, false,true, true, true, true, true, true])
      } else if (user.object_type == "dispatching_company") {
        setShow([true, true, true, true, false, true, true, true, true,false])
      } else if(user.object_type == "intern"){
        setShow([false, false, false, false, false, true, false, true, false])
      }
    }
  },[user])

  const ref = useRef()
  const activateParentDropdown = useCallback(item => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show")
        }

        parent.classList.remove("mm-active")
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove("mm-show")

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove("mm-active") // li
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement // ul
            if (parent4) {
              parent4.classList.remove("mm-show") // ul
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show") // li
                parent5.childNodes[0].classList.remove("mm-active") // a tag
              }
            }
          }
        }
      }
    }
  }

  const path = useLocation()
  const activeMenu = useCallback(() => {
    const pathName = path.pathname
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path.pathname, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  useEffect(() => {
    new MetisMenu("#side-menu")
    activeMenu()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            {isShow[0] && (
              <li>
                <Link to="/dashboard">
                  <i className="bx bxs-report"></i>
                  <span>{props.t("Report")}</span>
                </Link>
              </li>
            )}
            {isShow[1] && (
              <li>
                <Link to="/intern">
                  <i className="mdi mdi-account-group"></i>
                  <span>{props.t("Intern")}</span>
                </Link>
              </li>
            )}
            {isShow[2] && (
              <li>
                <Link to="/syndication">
                  <i className="bx bx-buildings"></i>
                  <span>{props.t("Syndication")}</span>
                </Link>
              </li>
            )}
            {isShow[3] && (
              <li>
                <Link to="/receiving-factory">
                  <i className="bx bx-buildings"></i>
                  <span>{props.t("Receiving Factory")}</span>
                </Link>
              </li>
            )}
            {isShow[4] && (
              <li>
                <Link to="/dispatching-company">
                  <i className="mdi mdi-google-earth"></i>
                  <span>{props.t("Dispatching Company")}</span>
                </Link>
              </li>
            )}
            {isShow[5] && (
              <li>
                <Link to="/contacts">
                  <i className="bx bxs-contact"></i>
                  <span>{props.t("Contact List")}</span>
                </Link>
              </li>
            )}
            {isShow[6] && (
              <li>
                <Link to="/violate">
                  <i className="bx bx-error"></i>
                  <span>{props.t("Violation List")}</span>
                </Link>
              </li>
            )}

            {isShow[7] && (
              <li>
                <Link to="/ticket">
                  <i className="bx bx-support"></i>
                  <span>{props.t("Support")}</span>
                </Link>
              </li>
            )}
            
             <li>
                <Link to="/#" className="has-arrow ">
                  <i className="bx bx-cog"></i>
                  <span>{props.t("Settings")}</span>
                </Link>
                <ul className="sub-menu">
                {isShow[8] && (
                  <li>
                    <Link to="/pages-status">{props.t("Status")}</Link>
                  </li>)}
                  {isShow[9] && (
                  <li>
                    <Link to="/pages-career">{props.t("Industry")}</Link>
                  </li>)}
                </ul>
              </li>
            
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
