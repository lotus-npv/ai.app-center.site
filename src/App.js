import PropTypes from "prop-types"
import React, { useState, useEffect, useContext } from "react"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { Routes, Route } from "react-router-dom"
import { layoutTypes } from "./constants/layout"
// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

import io from "socket.io-client"
import DataContext from "data/DataContext"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

import "./assets/scss/theme.scss"

import fakeBackend from "./helpers/AuthType/fakeBackend"
// Activating fake backend
fakeBackend()

const getLayout = layoutType => {
  let Layout = VerticalLayout
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout
      break
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout
      break
    default:
      break
  }
  return Layout
}

const App = () => {
  //=====================================================================================================//
  // const [message, setMessage] = useState("")
  // const [updateUserCount, setUpdateUserCount] = useState()

  const {
    message,
    setMessage,
    skTicket,
    setSkTicket,
    setSocket,
    setUpdateUserCount,
    notification,
    setNotification,
  } = useContext(DataContext)
  
  useEffect(() => {
    const newSocket = io("https://api.app-center.site", {
      secure: true,
      rejectUnauthorized: false, // Chỉ cần đặt rejectUnauthorized là false nếu bạn sử dụng chứng chỉ tự ký
      path: "/socket.io",
    })

    setSocket(newSocket)
    newSocket.on("updateUserCount", mes => {
      setUpdateUserCount(mes)
    })

    newSocket.on("message", mes => {
      setMessage(mes)
    })

    newSocket.on("new ticket", mes => {
      setSkTicket(mes)
    })

    newSocket.on("notification", mes => {
      console.log('App receive mes:', mes)
      setNotification(mes)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [message, skTicket, notification])

  //=====================================================================================================//
  const selectLayoutState = state => state.Layout
  const LayoutProperties = createSelector(selectLayoutState, layout => ({
    layoutType: layout.layoutType,
  }))

  const { layoutType } = useSelector(LayoutProperties)

  const Layout = getLayout(layoutType)

  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware path={route.path}>
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

export default App
