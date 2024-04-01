import React, { useEffect, useRef, useState } from "react"
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
import {
  registerUser,
  apiError,
  getUsersAll,
  setReceivingFactory,
  setSyndication,
  setUsers,
  updateKeyLicense,
} from "../../store/actions"

//redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { createSelector } from "reselect"

import { Link, useNavigate } from "react-router-dom"
const CryptoJS = require("crypto-js")

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

  const {
    datasKey,
    usersData,
    factoryCreateData,
    syndicationCreateData,
    factoryLoading,
    syndicationLoading,
    keySuccess,
  } = useSelector(
    state => ({
      datasKey: state.KeyLicense.data,
      usersData: state.Users.datas,
      factoryCreateData: state.ReceivingFactory.data,
      syndicationCreateData: state.Syndication.data,
      factoryLoading: state.ReceivingFactory.loading,
      syndicationLoading: state.Syndication.loading,
      keySuccess: state.KeyLicense.success,
    }),
    shallowEqual
  )

  const [dataKey, setDataKey] = useState(null)

  useEffect(() => {
    dispatch(getUsersAll())
  }, [dispatch])

  useEffect(() => {
    if (datasKey == null) {
      navigate("/login")
    } else {
      setDataKey(datasKey[0])
    }
  }, [])

  // console.log("usersData", usersData)
  console.log("dataKey", dataKey)

  // ma hoa password
  function hashPassword(password) {
    const hashedPassword = CryptoJS.SHA256(password).toString()
    return hashedPassword
  }

  const [isWriteDone, setIsWriteDone] = useState(false)

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      display_name: "",
      email: "",
      password: "",
      confirm_password: "",
      name_jp: "",
    },
    validationSchema: Yup.object().shape({
      // display_name: Yup.string().required("Please Enter Display Name"),
      // email: Yup.string()
      //   .email("Must be a valid Email")
      //   .max(255)
      //   .required("Email is required")
      //   .test(
      //     "done",
      //     "Email already exists",
      //     value => usersData.find(u => u.username == value) == undefined
      //   ),
      // username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().min(
        6,
        "Password must be at least 6 characters long"
      ),
      confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password incorrect"
      ),
      // name_jp: Yup.string().required("Please Enter Enterprise Name"),
    }),
    onSubmit: value => {
      console.log("submit")

      if (dataKey.key_type == "receiving_factory") {
        const enterprise = {
          key_license_id: dataKey.id,
          syndication_id: null,
          logo: "",
          name_jp: value.name_jp,
          name_en: "",
          tax_code: "",
          date_of_joining_syndication: null,
          description: "",
          create_at: null,
          create_by: 10000,
          update_at: null,
          update_by: 10000,
          delete_at: null,
          flag: 1,
        }

        dispatch(setReceivingFactory(enterprise))
      } else {
        const enterprise = {
          key_license_id: dataKey.id,
          receiving_factory_id: null,
          logo: "",
          name_jp: value.name_jp,
          name_en: "",
          description: "",
          create_at: null,
          create_by: 10000,
          update_at: null,
          update_by: 10000,
          delete_at: null,
          flag: 1,
        }
        dispatch(setSyndication(enterprise))
      }

      setIsWriteDone(true)
    },
  })

  useEffect(() => {
    const hashedPassword = hashPassword(formik.values.password)

    if (factoryCreateData !== null || syndicationCreateData !== null) {
      if (isWriteDone && !factoryLoading && !syndicationLoading) {
        const userObj = {
          key_license_id: dataKey.id,
          role: "admin",
          object_type: dataKey.key_type,
          object_id: null,
          username: formik.values.email,
          password_hash: hashedPassword,
          active: 1,
          display_name: formik.values.display_name,
          description: null,
          create_at: null,
          create_by: 10000,
          update_at: null,
          update_by: 10000,
          delete_at: null,
          flag: 1,
        }
        if (dataKey.key_type == "receiving_factory") {
          userObj.object_id = factoryCreateData.id
          dispatch(registerUser(userObj))

          const keyUpdate = {
            ...dataKey,
            object_id: factoryCreateData.id,
            active: 1,
            flag: 1,
          }
          dispatch(updateKeyLicense(keyUpdate))
          console.log('keyUpdate', keyUpdate);
        } else {
          userObj.object_id = syndicationCreateData.id
          dispatch(registerUser(userObj))

          const keyUpdate = {
            ...dataKey,
            object_id: syndicationCreateData.id,
            active: 1,
            flag: 1,
          }
          dispatch(updateKeyLicense(keyUpdate))
        }

        setIsWriteDone(false)
      }
    }
  }, [isWriteDone, factoryCreateData, syndicationCreateData])

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

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (datasKey == null) {
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
    success && keySuccess && setTimeout(() => navigate("/login"), 2000)
  }, [success, keySuccess])

  console.log("keySuccess", keySuccess)

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
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password || ""}
                          invalid={
                            formik.touched.password && formik.errors.password
                              ? true
                              : false
                          }
                        />
                        {formik.touched.password && formik.errors.password ? (
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
                          value={formik.values.confirm_password}
                          invalid={
                            formik.touched.confirm_password &&
                            formik.errors.confirm_password
                              ? true
                              : false
                          }
                        />
                        {formik.touched.confirm_password &&
                        formik.errors.confirm_password ? (
                          <FormFeedback type="invalid">
                            {formik.errors.confirm_password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">
                          {t("Enterprise Name")}
                        </Label>
                        <Input
                          name="name_jp"
                          type="text"
                          placeholder="Enter name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name_jp || ""}
                          invalid={
                            formik.touched.name_jp && formik.errors.name_jp
                              ? true
                              : false
                          }
                        />
                        {formik.touched.name_jp && formik.errors.name_jp ? (
                          <FormFeedback type="invalid">
                            {formik.errors.name_jp}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4 d-flex justify-content-end">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                          // onClick={formik.handleSubmit}
                        >
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Lotus Ocean{" "}
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
                  © {new Date().getFullYear()} with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Itomo
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
