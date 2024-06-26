import React from "react"
import { Card, CardBody, Container } from "reactstrap"
import PropTypes from "prop-types"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import TableDatas from "./TableDatas"

const SyndicationPage = props => {
  document.title = "Receiving Factory Page"
  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <TableDatas />
          <ToastContainer />
        </Container>
      </div>
    </>
  )
}

SyndicationPage.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

// export default withRouter(withTranslation()(StatusPage));
export default SyndicationPage
