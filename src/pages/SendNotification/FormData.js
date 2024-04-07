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
import { Editor } from "primereact/editor"
import { FileUpload } from "primereact/fileupload"
import UploadFile from "components/CommonForBoth/UploadFile/UploadFile"

import { SelectButton } from "primereact/selectbutton"

const FormData = () => {
  //meta title
  document.title = "Notification"

  const [activeTab, setactiveTab] = useState("1")
  const [value, setValue] = useState(null)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  // check xem co du dk upload file
  const [isUpload, setIsUpload] = useState(true)


  const items = [
    { name: "All", value: 1 },
    { name: "Group", value: 2 },
    { name: "Individual", value: 3 },
  ]

  const getFiles = (files) => {
    console.log('files', files);
  }

  const onUpload = (value) => {
    setIsUpload(value);
  }

  console.log('isUpload', isUpload);

  return (
    <React.Fragment>
      <div className="checkout-tabs">
        <Row>
          <Col xl="3" lg="12">
            <Nav className="flex-column mt-3 mb-3" pills>
              <div className="d-flex justify-content-center">
                <SelectButton
                  value={value}
                  onChange={e => setValue(e.value)}
                  optionLabel="name"
                  options={items}
                  style={{ minWidth: "200px" }}
                />
              </div>
              <div className="d-flex justify-content-center mt-3">
                <SelectButton
                  value={value}
                  onChange={e => setValue(e.value)}
                  optionLabel="name"
                  options={items}
                  style={{ minWidth: "200px" }}
                />
              </div>
            </Nav>
          </Col>
          <Col xl="9" lg="12">
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <div>
                      <CardTitle>Send Notification</CardTitle>
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
                            Title
                          </Label>
                          <Col md="10">
                            <Input
                              type="text"
                              className="form-control"
                              id="billing-name"
                              placeholder="Enter title"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-0" row>
                          <Label
                            md="2"
                            className="col-form-label"
                            htmlFor="noti-content"
                          >
                            Content:
                          </Label>
                          <Col md="10">
                            <Editor
                              id="noti-content"
                              value={content}
                              onTextChange={e => setContent(e.htmlValue)}
                              style={{ height: "250px" }}
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-0" row>
                          <Label
                            md="2"
                            className="col-form-label"
                            htmlFor="noti-files"
                          >
                            Files:
                          </Label>
                          <Col md="10">
                            <UploadFile getFiles={getFiles} onUpload={onUpload} />
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
            <Row className="mt-4">
              <Col sm="12">
                <div className="text-sm-end">
                  <Link to="/ecommerce-checkout" className="btn btn-success">
                    <i className="mdi mdi-truck-fast me-1" /> Send{" "}
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
