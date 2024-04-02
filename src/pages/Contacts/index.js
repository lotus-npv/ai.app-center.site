import React, { useMemo, useState, useEffect, useContext } from "react"
import {
  CardBody,
  CardHeader,
  Container,
  Card,
  Button,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap"
import PropTypes from "prop-types"

import DataContext from "../../data/DataContext"

import { withTranslation } from "react-i18next"

import TableDatas from "./TableDatas"

const DispatchingCompanyPage = props => {
  document.title = "Dispatching Company Page"
  const { modal_fullscreen, setmodal_fullscreen, tog_fullscreen } =
    useContext(DataContext)

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <TableDatas />
        </Container>
      </div>
    </>
  )
}

DispatchingCompanyPage.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

// export default withRouter(withTranslation()(StatusPage));
export default DispatchingCompanyPage
