import React, { useState } from "react"

import {
  Container,
  Row,
  Col,
  Table,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap"
import Select from "react-select"
import { Link } from "react-router-dom"
import classnames from "classnames"

import { SelectButton } from "primereact/selectbutton"

const optionGroup = [
  {
    label: "Picnic",
    options: [
      { label: "Mustard", value: "Mustard" },
      { label: "Ketchup", value: "Ketchup" },
      { label: "Relish", value: "Relish" },
    ],
  },
  {
    label: "Camping",
    options: [
      { label: "Tent", value: "Tent" },
      { label: "Flashlight", value: "Flashlight" },
      { label: "Toilet Paper", value: "Toilet Paper" },
    ],
  },
]

const FormData = () => {
  //meta title
  document.title = "Checkout | Skote - React Admin & Dashboard Template"

  const [activeTab, setactiveTab] = useState("1")
  const [selectedGroup, setselectedGroup] = useState(null)

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
  }

  const [value, setValue] = useState(null)
  const items = [
    { name: "All", value: 1 },
    { name: "Group", value: 2 },
    { name: "Individual", value: 3 },
  ]

  return (
    <React.Fragment>
      {/* <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Checkout" /> */}

      <div className="checkout-tabs">
        <Row>
          <Col lg="3" sm="4">
            <Nav className="flex-column mt-3" pills>
              <div className="d-flex justify-content-center">
                <SelectButton
                  value={value}
                  onChange={e => setValue(e.value)}
                  optionLabel="name"
                  options={items}
                  style={{minWidth: '200px'}}
                />
              </div>
            </Nav>
          </Col>
          <Col lg="9" sm="8">
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <div>
                      <CardTitle>Shipping information</CardTitle>
                      <p className="card-title-desc">
                        Fill all information below
                      </p>
                      <Form>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-name"
                            md="2"
                            className="col-form-label"
                          >
                            Name
                          </Label>
                          <Col md="10">
                            <Input
                              type="text"
                              className="form-control"
                              id="billing-name"
                              placeholder="Enter your name"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-email-address"
                            md="2"
                            className="col-form-label"
                          >
                            Email Address
                          </Label>
                          <Col md="10">
                            <Input
                              type="email"
                              className="form-control"
                              id="billing-email-address"
                              placeholder="Enter your email"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-phone"
                            md="2"
                            className="col-form-label"
                          >
                            Phone
                          </Label>
                          <Col md={10}>
                            <input
                              type="text"
                              className="form-control"
                              id="billing-phone"
                              placeholder="Enter your Phone no."
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-address"
                            md="2"
                            className="col-form-label"
                          >
                            Address
                          </Label>
                          <Col md="10">
                            <textarea
                              className="form-control"
                              id="billing-address"
                              rows="3"
                              placeholder="Enter full address"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup className="select2-container mb-4" row>
                          <Label md="2" className="col-form-label">
                            Country
                          </Label>
                          <Col md="10">
                            <select
                              className="form-control select2"
                              title="Country"
                            >
                              <option value="0">Select Country</option>
                              <option value="AF">Afghanistan</option>
                              <option value="AL">Albania</option>
                              <option value="DZ">Algeria</option>
                              <option value="AS">American Samoa</option>
                            </select>
                          </Col>
                        </FormGroup>

                        <FormGroup className="select2-container mb-4" row>
                          <Label md="2" className="col-form-label">
                            States
                          </Label>
                          <Col md="10">
                            <Select
                              value={selectedGroup}
                              onChange={s => {
                                handleSelectGroup(s)
                              }}
                              options={optionGroup}
                              placeholder="Select States"
                              classNamePrefix="select2-selection"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-0" row>
                          <Label
                            md="2"
                            className="col-form-label"
                            htmlFor="example-textarea"
                          >
                            Order Notes:
                          </Label>
                          <Col md="10">
                            <textarea
                              className="form-control"
                              id="example-textarea"
                              rows="3"
                              placeholder="Write some note.."
                            />
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
            <Row className="mt-4">
              <Col sm="6">
                <Link
                  to="/ecommerce-cart"
                  className="btn text-muted d-none d-sm-inline-block btn-link"
                >
                  <i className="mdi mdi-arrow-left me-1" /> Back to Shopping
                  Cart{" "}
                </Link>
              </Col>
              <Col sm="6">
                <div className="text-sm-end">
                  <Link to="/ecommerce-checkout" className="btn btn-success">
                    <i className="mdi mdi-truck-fast me-1" /> Proceed to
                    Shipping{" "}
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {/* </Container>
      </div> */}
    </React.Fragment>
  )
}

export default FormData
