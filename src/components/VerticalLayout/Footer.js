import React, {useState, useEffect, useContext} from "react"
import { Container, Row, Col } from "reactstrap"
import DataContext from "data/DataContext";

const Footer = () => {
    //=====================================================================================================//
    const {updateUserCount} = useContext(DataContext);
    //=====================================================================================================//
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>User Online : {updateUserCount} </Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                {new Date().getFullYear()} © LotusOcean.
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
