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
  const user = JSON.parse(localStorage.getItem("authUser"))[0]
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
  const [listSendNoti, setListSendNoti] = useState([])
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
    { name: "Send To All Receiving Factory", value: 1 },
    { name: "Send To All Dispatching Company", value: 2 },
    { name: "Send To All Intern Of", value: 3 },
  ]

  const getFiles = files => {
    console.log("files", files)
  }

  const onUpload = value => {
    setIsUpload(value)
  }

  // liet ke danh sach xi nghiep va phai cu de lay cac tts tu cac noi nay
  const [listMenuIntern, setListMenuIntern] = useState(null)
  const [selectListIntern, setSelectListIntern] = useState(null)
  useEffect(() => {
    if (value != 2) {
      setGroup(null)
    } else if (value == 2) {
      setGroup(groupOptions[0])
    } else if (value == 1) {
      setListSendNoti(userData)
    }
  }, [value])

  useEffect(() => {
    if (group) {
      if (group == 3) {
        const arr = userData.filter(
          u =>
            u.key_license_id == user.key_license_id &&
            (u.object_type == "dispatching_company" ||
              u.object_type == "receiving_factory")
        )
        // console.log('arr', arr);
        setListMenuIntern(arr)
      }
    }
  }, [group])

  // -----------------------------------------------------
  const [valueMention, setValueMention] = useState("")
  const [customers, setCustomers] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (userData) {
      userData.forEach(
        d =>
          (d["nickname"] = `${d.label.replace(/\s+/g, "").toLowerCase()}_${
            d.id
          }`)
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
    const src = "https://api.lotusocean-jp.com/uploads/" + suggestion.logo

    return (
      <div className="flex align-items-center">
        <img alt={suggestion.username} src={src} width="32" />
        <span className="flex flex-column ml-2">
          {suggestion.label}
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
  // console.log('listMenuIntern', listMenuIntern);

  return (
    <React.Fragment>
      <div className="">
        <Row>
          <Col xl="12" lg="12">
            <div className="flex-column mt-3 mb-3">
              <div className="d-flex justify-content-start">
                <SelectButton
                  value={value}
                  onChange={e => setValue(e.value)}
                  optionLabel="name"
                  options={items}
                  style={{ minWidth: "200px" }}
                />
              </div>

              {group != null && (
                <div className="d-flex justify-content-start mt-3">
                  <SelectButton
                    value={group}
                    onChange={e => setGroup(e.value)}
                    optionLabel="name"
                    options={groupOptions}
                    style={{ minWidth: "200px" }}
                  />
                </div>
              )}

              {group && group == 3 && (
                <div className="d-flex justify-content-start mt-3">
                  <SelectButton
                    value={selectListIntern}
                    onChange={e => setSelectListIntern(e.value)}
                    optionLabel="display_name"
                    options={listMenuIntern}
                    style={{ minWidth: "200px" }}
                  />
                </div>
              )}

              {value == 3 && (
                <div className="d-flex justify-content-start mt-3">
                  <Mention
                    value={valueMention}
                    onChange={e => setValueMention(e.target.value)}
                    suggestions={suggestions}
                    onSearch={onSearch}
                    field="nickname"
                    placeholder="Enter @ to mention people"
                    rows={3}
                    cols={50}
                    itemTemplate={itemTemplate}
                  />
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl="12" lg="12">
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
