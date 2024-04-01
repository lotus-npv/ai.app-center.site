import React, { useEffect, useRef } from "react"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap"
import { useLocation } from "react-router-dom"
// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"
import { useTranslation } from "react-i18next"

// action
import { registerUser, apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"

import { Link, useNavigate } from "react-router-dom"

// import images
import profileImg from "../../assets/images/profile-img.png"
import logoImg from "../../assets/images/logo.svg"

const Register = props => {
  //meta title
  document.title = "Register | Skote - React Admin & Dashboard Template"

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const paramValue = params.get("key")

  // console.log("key", paramValue)

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      display_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
      name_jp: ""
    },
    formikSchema: Yup.object({
      display_name: Yup.string().required("Please Enter Display Name"),
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      dispatch(registerUser(values))
    },
  })

  const selectAccountState = state => state.Account
  const AccountProperties = createSelector(selectAccountState, account => ({
    user: account.user,
    registrationError: account.registrationError,
    success: account.success,
    // loading: account.loading,
  }))

  const {
    user,
    registrationError,
    success,
    // loading
  } = useSelector(AccountProperties)

  const dataKey = useSelector(state => state.KeyLicense.data)
  console.log("datakey", dataKey)

  useEffect(() => {
    if (dataKey == null) {
      navigate("/login")
    }
  }, [])

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (dataKey == null) {
        navigate("/login")
      }
    }, 5000)
    // Hàm dọn dẹp khi unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    dispatch(apiError(""))
  }, [])

  useEffect(() => {
    success && setTimeout(() => navigate("/login"), 2000)
  }, [success])

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Register</h5>
                        <p>Get your account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        formik.handleSubmit()
                        return false
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">Display Name</Label>
                        <Input
                          id="display_name"
                          name="display_name"
                          className="form-control"
                          placeholder="Display name"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.display_name || ""}
                          invalid={
                            formik.touched.display_name &&
                            formik.errors.display_name
                              ? true
                              : false
                          }
                        />
                        {formik.touched.display_name &&
                        formik.errors.display_name ? (
                          <FormFeedback type="invalid">
                            {formik.errors.display_name}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email || ""}
                          invalid={
                            formik.touched.email && formik.errors.email
                              ? true
                              : false
                          }
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <FormFeedback type="invalid">
                            {formik.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Username</Label>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Enter username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username || ""}
                          invalid={
                            formik.touched.username &&
                            formik.errors.username
                              ? true
                              : false
                          }
                        />
                        {formik.touched.username &&
                        formik.errors.username ? (
                          <FormFeedback type="invalid">
                            {formik.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password || ""}
                          invalid={
                            formik.touched.password &&
                            formik.errors.password
                              ? true
                              : false
                          }
                        />
                        {formik.touched.password &&
                        formik.errors.password ? (
                          <FormFeedback type="invalid">
                            {formik.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Confirm Password</Label>
                        <Input
                          name="confirm_password"
                          placeholder={t("Confirm Password")}
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirmPassword}
                          invalid={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                              ? true
                              : false
                          }
                        />
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword ? (
                          <FormFeedback type="invalid">
                            {formik.errors.confirmPassword}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">
                          {dataKey[0].key_type == "receiving_factory"
                            ? "Factory Name"
                            : "Syndication Name"}
                        </Label>
                        <Input
                          name="name_jp"
                          type="text"
                          placeholder="Enter name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username || ""}
                          invalid={
                            formik.touched.username &&
                            formik.errors.username
                              ? true
                              : false
                          }
                        />
                        {formik.touched.username &&
                        formik.errors.username ? (
                          <FormFeedback type="invalid">
                            {formik.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Skote{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register
