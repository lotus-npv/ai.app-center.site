import React from "react"
import { Card, CardBody, Container, CardHeader, Spinner } from "reactstrap"
import PropTypes from "prop-types"

import TableDatas from "./TableDatas"
import { useLocation } from "react-router-dom"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const InternPage = () => {
  document.title = "Thực tập sinh"
  const location = useLocation()
  const receivedData = location.state

  // console.log(receivedData);

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <ToastContainer />
          <TableDatas />
        </Container>
      </div>
    </>
  )
}

InternPage.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

// export default withRouter(withTranslation()(StatusPage));
export default InternPage
