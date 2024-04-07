import React, { useEffect, useState } from "react"

import {
  Row,
  Col,
  Input,
  Nav,
  TabContent,
  TabPane,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
} from "reactstrap"
import { Link } from "react-router-dom"
import { Editor } from "primereact/editor"
import UploadFile from "components/CommonForBoth/UploadFile/UploadFile"
import { SelectButton } from "primereact/selectbutton"
import { Mention } from "primereact/mention"

import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { getUsersAll } from "store/actions"

const FormData = () => {
  //meta title
  document.title = "Notification"

  const dispatch = useDispatch()

  const { userData } = useSelector(
    state => ({
      userData: state.Users.datas,
    }),
    shallowEqual
  )

  // Get du lieu lan dau F
  useEffect(() => {
    dispatch(getUsersAll())
  }, [dispatch])

  const [activeTab, setactiveTab] = useState("1")
  const [value, setValue] = useState(null)

  const [group, setGroup] = useState(null)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  // check xem co du dk upload file
  const [isUpload, setIsUpload] = useState(true)

  const items = [
    { name: "All", value: 1 },
    { name: "Group", value: 2 },
    { name: "Individual", value: 3 },
  ]

  const groupOptions = [
    { name: "All Receiving factory", value: 1 },
    { name: "All Dispatching Company", value: 2 },
    { name: "All Intern Of", value: 3 },
  ]

  const getFiles = files => {
    console.log("files", files)
  }

  const onUpload = value => {
    setIsUpload(value)
  }

  useEffect(() => {
    if (value != 2) {
      setGroup(null)
    } else {
      setGroup(groupOptions[0])
    }
  }, [value])

  const [valueMention, setValueMention] = useState("")
  const [customers, setCustomers] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
   if(userData) {
    userData.forEach(
      d =>
        (d["nickname"] = `${d.username.replace(/\s+/g, "").toLowerCase()}_${d.id}`)
    )
    setCustomers(userData)
   }
  }, [])

  const onSearch = event => {
    //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
    setTimeout(() => {
      const query = event.query
      let suggestions

      if (!query.trim().length) {
        suggestions = [...customers]
      } else {
        suggestions = customers.filter(customer => {
          return customer.nickname.toLowerCase().startsWith(query.toLowerCase())
        })
      }

      setSuggestions(suggestions)
    }, 250)
  }

  const itemTemplate = suggestion => {
    const src =
      "https://primefaces.org/cdn/primereact/images/avatar/" +
      suggestion.logo

    return (
      <div className="flex align-items-center">
        <img alt={suggestion.username} src={src} width="32" />
        <span className="flex flex-column ml-2">
          {suggestion.username}
          <small
            style={{ fontSize: ".75rem", color: "var(--text-color-secondary)" }}
          >
            @{suggestion.nickname}
          </small>
        </span>
      </div>
    )
  }

  // console.log('isUpload', isUpload);

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
              {group != null && (
                <div className="d-flex justify-content-center mt-3">
                  <SelectButton
                    value={group}
                    onChange={e => setGroup(e.value)}
                    optionLabel="name"
                    options={groupOptions}
                    style={{ minWidth: "200px" }}
                  />
                </div>
              )}

              <Mention
                value={valueMention}
                onChange={e => setValueMention(e.target.value)}
                suggestions={suggestions}
                onSearch={onSearch}
                field="nickname"
                placeholder="Enter @ to mention people"
                rows={5}
                cols={40}
                itemTemplate={itemTemplate}
              />
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
                            <UploadFile
                              getFiles={getFiles}
                              onUpload={onUpload}
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
