import React, { useState, useEffect, useContext, useRef } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardTitle,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
  UncontrolledTooltip,
  Modal,
  CloseButton,
  Spinner
} from "reactstrap"

import Select from "react-select"
import moment from "moment"

import * as Yup from "yup"
import { useFormik } from "formik"
import { useTranslation } from "react-i18next"
// import context
import DataContext from "../../data/DataContext"
import avata from "../../assets/images/users/avatar-1.jpg"

// import modal address
import AddressDatas from "../../components/CommonForBoth/Address/AddressDatas"

const optionGroup = [
  { label: "Viet Nam", value: 1 },
  { label: "Japan", value: 2 },
]

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  getProvinceByNationId,
  getDistrictByProvinceId,
  getCommuneByDistrictId,
  setAddress,
  uploadImageRequest,
} from "store/actions"


//===============================================================================================================//


const ModalDatas = ({ item, setApi, updateApi, getApi, addressData, user }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  // data context
  const {
    modal_fullscreen,
    setmodal_fullscreen,
    tog_fullscreen,
    isEditCompany,
    setIsEditCompany,
    addressCompany,
    addressDataCompany,
    updateAddressDataCompany,
    isRefresh
  } = useContext(DataContext)

  // Radio button
  const [selectAddressDefault, setSelectAddressDefault] = useState(0)
  const handleChangeDefault = event => {
    setSelectAddressDefault(event.target.value)
  }

  // kiem tra trang thai xem co duoc ghi dia chi
  const [isCreateAddress, setIsCreateAddress] = useState(false)

  const {
    provinceDataByNationId,
    districtDataByProvinceId,
    communeDataByDistrictId,
    companyCreate,
    companyData,
    companyCreateLoading,
  } = useSelector(
    state => ({
      provinceDataByNationId: state.Province.dataByNationId,
      districtDataByProvinceId: state.District.dataByProvinceId,
      communeDataByDistrictId: state.Commune.dataByDistrictId,
      companyCreate: state.DispatchingCompany.data,
      companyData: state.DispatchingCompany.datas,
      companyCreateLoading: state.DispatchingCompany.loading,
    }),
    shallowEqual
  )

  // xu ly form nhap anh
  const fileInputRef = useRef()
  const [selectedFile, setSelectedFile] = useState(null)
  const [showAvata, setShowAvata] = useState(avata)
  const handleChange = event => {
    const file = event.target.files[0]
    setSelectedFile(file)
    formik.setFieldValue("logo", file.name)
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        setShowAvata(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: item != null ? item.id : "",
      key_license_id: item != null ? item.key_license_id : user.key_license_id,
      syndication_id: item != null ? item.syndication_id : 1,
      logo: item != null ? item.logo : "avatar-null.png",
      name_jp: item != null ? item.name_jp : "",
      name_en: item != null ? item.name_en : "",
      tax_code: item != null ? item.tax_code : "",
      date_of_joining_syndication:
        item != null
          ? moment(item.date_of_joining_syndication)
              .utcOffset("+07:00")
              .format("YYYY-MM-DD")
          : "",
      description: item !== null ? item.description : "",
      create_at: item !== null ? item.create_at : "",
      create_by: item !== null ? item.create_by : 1,
      update_at: item !== null ? item.update_at : "",
      update_by: item !== null ? item.update_by : 1,
      nation: 1,
      // description_address: "",
    },
    validationSchema: Yup.object().shape({
      name_jp: Yup.string().required("This value is required"),
      name_en: Yup.string().required("This value is required"),
      date_of_joining_syndication: Yup.date().required("Please select date"),
    }),

    onSubmit: async value => {
      if (isEditCompany) {
        let obj = {
          id: value.id,
          key_license_id: value.key_license_id,
          syndication_id: value.syndication_id,
          logo: value.logo,
          name_jp: value.name_jp,
          name_en: value.name_en,
          tax_code: value.tax_code,
          date_of_joining_syndication: value.date_of_joining_syndication,
          description: value.description,
          create_at: value.create_at,
          create_by: value.create_by,
          update_at: null,
          update_by: 1,
          delete_at: null,
          flag: 1,
        }
        dispatch(updateApi(obj))

        if (selectedFile) {
          const formData = new FormData()
          formData.append("image", selectedFile)
          dispatch(uploadImageRequest(formData))
        }
      } else {
        let obj = {
          key_license_id: value.key_license_id,
          syndication_id: value.syndication_id,
          logo: value.logo,
          name_jp: value.name_jp,
          name_en: value.name_en,
          tax_code: value.tax_code,
          date_of_joining_syndication: value.date_of_joining_syndication,
          description: value.description,
          create_at: null,
          create_by: value.create_by,
          update_at: null,
          update_by: value.update_by,
          delete_at: null,
          flag: 1,
        }
        dispatch(setApi(obj))
        setIsCreateAddress(true)

        // upload anh len server
        if (selectedFile) {
          const formData = new FormData()
          formData.append("image", selectedFile)
          dispatch(uploadImageRequest(formData))
        }
      }

      formik.resetForm()
      console.log("submit done")
      tog_fullscreen()
    },
  })

  // Tai du lieu thanh pho
  useEffect(() => {
    dispatch(getProvinceByNationId(formik.values.nation))
  }, [formik.values.nation])

  // nap du lieu cho dia chi neu la chinh sua
  useEffect(() => {
    // console.log('check');
    if (isEditCompany) {
      if (item !== null) {
        const arr = addressData.filter(
          address =>
            address.object_id == item.id &&
            address.user_type == "dispatching_company"
        )
        console.log("arr", arr)
        updateAddressDataCompany(arr)
      }
    }
  }, [isEditCompany])

  // GHi du lieu dia chi vao database
  useEffect(() => {
    if (companyCreate != null) {
      const id = companyCreate["id"]
      addressDataCompany.forEach((address, index) => {
        const newAddress = {
          ...address,
          object_id: id,
          is_default: selectAddressDefault == index ? 1 : 0,
          key_license_id: user.key_license_id
        }
        if (id != null || id != undefined) {
          if (isCreateAddress) {
            dispatch(setAddress(newAddress))
          }
          setIsCreateAddress(false)
        }
      })
    }
  }, [companyCreate])

  // thuc thi formik
  const handleSubmit = () => {
    console.log("submit")
    formik.handleSubmit()
  }

  // xu ly them form address
  const handleAddForm = () => {
    updateAddressDataCompany([...addressDataCompany, addressCompany])
  }

  const handleDeleteColumn = getIndex => {
    const arr = [...addressDataCompany]
    arr.splice(getIndex, 1)
    updateAddressDataCompany(arr)
  }

  // show so ky tu nhap
  const [textareabadge, settextareabadge] = useState(0)
  const [textcount, settextcount] = useState(0)
  function textareachange(event) {
    const count = event.target.value.length
    if (count > 0) {
      settextareabadge(true)
    } else {
      settextareabadge(false)
    }
    settextcount(event.target.value.length)
  }

  // render lua chon tinh, huyen, xa
  const [selectNation, setSelectNation] = useState(null)
  const [selectProvince, setSelectProvince] = useState(null)
  const [selectDistrict, setSelectDistrict] = useState(null)
  const [selectCommune, setSelectCommune] = useState(null)

  // tao danh sach lua chon tinh/thanh pho
  const [provinceOptions, setProvinceOptions] = useState([])
  useEffect(() => {
    if (provinceDataByNationId) {
      const data = provinceDataByNationId.map(province => {
        return {
          ...province,
          label: province.StateName_ja,
          value: province.StateName_ja,
        }
      })
      setProvinceOptions(data)
    }
  }, [provinceDataByNationId])

  // Xu ly danh sach district
  const [districtOptions, setDistrictOptions] = useState([])

  useEffect(() => {
    if (selectProvince !== null) {
      dispatch(getDistrictByProvinceId(selectProvince.StateID))
      setSelectDistrict("")
    }
  }, [selectProvince])

  useEffect(() => {
    if (districtDataByProvinceId !== null) {
      const data = districtDataByProvinceId.map(district => {
        return {
          ...district,
          label: district.DistrictName_ja,
          value: district.DistrictName_ja,
        }
      })
      setDistrictOptions(data)
    }
  }, [districtDataByProvinceId])

  // xu ly tai danh sach commune
  const [communeOptions, setCommuneOptions] = useState([])
  useEffect(() => {
    if (selectDistrict !== null) {
      dispatch(getCommuneByDistrictId(selectDistrict.DistrictID))
      setSelectCommune("")
    }
  }, [selectDistrict])

  useEffect(() => {
    if (communeDataByDistrictId !== null) {
      const data = communeDataByDistrictId.map(commune => {
        return {
          ...commune,
          label: commune.WardName_ja,
          value: commune.WardName_ja,
        }
      })
      setCommuneOptions(data)
    }
  }, [communeDataByDistrictId])

  // console.log('provinceDataByNationId:', provinceDataByNationId);
  // console.log('provinceOptions:', provinceOptions);
  // console.log('districtOptions:', districtOptions)
  // console.log('selectAddressDefault:', selectAddressDefault)
  console.log('formik:', formik.values)
  // console.log('selectAddressDefault:', selectAddressDefault)
  // console.log('addressDataCompany:', addressDataCompany)
  // console.log('isEditCompany:', isEditCompany)
  // console.log('selectedFile:', selectedFile);

  return (
    <>
      <Form>
        <Modal
          size="xl"
          isOpen={modal_fullscreen}
          toggle={() => {
            tog_fullscreen()
          }}
          className="modal-fullscreen"
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="exampleModalFullscreenLabel">
              {isEditCompany ? `Chỉnh sửa xí nghiệp` : "Thêm xí nghiệp"}
            </h5>
            <button
              onClick={() => {
                setmodal_fullscreen(false)
                setIsEditCompany(false)
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            {/* <Form> */}
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg={1} xl={1} sm={3}>
                        <Card
                          style={{
                            width: "100%",
                          }}
                        >
                          <CardBody className="d-flex flex-column bg-light">
                            <div
                              style={{
                                aspectRatio: 1,
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                style={{ width: "90%", height: "90%" }}
                                className="rounded-circle img-thumbnail"
                                alt="avata"
                                src={
                                  isEditCompany
                                    ? `https://api.lotusocean-jp.com/uploads/${formik.values.logo}`
                                    : showAvata
                                }
                              />
                            </div>
                            <CardTitle tag="h5" className="text-center mt-2">
                              Admin
                            </CardTitle>
                            <Button
                              onClick={() => fileInputRef.current.click()}
                            >
                              {isEditCompany ? "Change avata" : "Set avata"}
                            </Button>{" "}
                            <input
                              onChange={handleChange}
                              multiple={false}
                              ref={fileInputRef}
                              type="file"
                              hidden
                            />
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={11} xl={11} sm={12}>
                        <Card className="bg-light h-100">
                          <CardBody>
                            <Row>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    Tên xí nghiệp (Tiếng Nhật)
                                  </Label>
                                  <Input
                                    name="name_jp"
                                    placeholder="Nhập tên xí nghiệp (Tiếng Nhật)"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name_jp || ""}
                                    invalid={
                                      formik.touched.name_jp &&
                                      formik.errors.name_jp
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.name_jp &&
                                  formik.errors.name_jp ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.name_jp}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    Tên xí nghiệp (Tiếng Anh)
                                  </Label>
                                  <Input
                                    name="name_en"
                                    type="text"
                                    placeholder="Nhập tên xí nghiệp (Tiếng Anh)"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name_en || ""}
                                    invalid={
                                      formik.touched.name_en &&
                                      formik.errors.name_en
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.name_en &&
                                  formik.errors.name_en ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.name_en}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    Quốc gia
                                  </Label>
                                  <Select
                                    name="nation"
                                    placeholder="Chọn quốc gia"
                                    value={optionGroup.find(
                                      option =>
                                        option.value === formik.values.nation
                                    )}
                                    onChange={item => {
                                      formik.setFieldValue(
                                        "nation",
                                        item == null ? null : item.value
                                      )
                                      // let arr = [...addressDataCompany]
                                      // const newArr = arr.map(address => {
                                      //   return {...address, nation_id: item.value}
                                      // })
                                      // console.log('newArr', newArr)
                                      // updateAddressDataCompany(newArr);
                                      addressCompany["nation_id"] = item.value
                                    }}
                                    options={optionGroup}
                                    // isClearable
                                  />
                                  {formik.touched.nation &&
                                  formik.errors.nation ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.nation}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={6}>
                                <Row>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label className="form-label fw-bold">
                                        Ngày gia nhập
                                      </Label>
                                      <Input
                                        name="date_of_joining_syndication"
                                        type="date"
                                        placeholder="Chọn ngày"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={
                                          formik.values
                                            .date_of_joining_syndication || ""
                                        }
                                        invalid={
                                          formik.touched
                                            .date_of_joining_syndication &&
                                          formik.errors
                                            .date_of_joining_syndication
                                            ? true
                                            : false
                                        }
                                      />
                                      {formik.touched
                                        .date_of_joining_syndication &&
                                      formik.errors
                                        .date_of_joining_syndication ? (
                                        <FormFeedback type="invalid">
                                          {
                                            formik.errors
                                              .date_of_joining_syndication
                                          }
                                        </FormFeedback>
                                      ) : null}
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label className="form-label fw-bold">
                                        Mã số thuế
                                      </Label>
                                      <Input
                                        name="tax_code"
                                        placeholder="Nhập mã số thuế"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.tax_code || ""}
                                        invalid={
                                          formik.touched.tax_code &&
                                          formik.errors.tax_code
                                            ? true
                                            : false
                                        }
                                      />
                                      {formik.touched.tax_code &&
                                      formik.errors.tax_code ? (
                                        <FormFeedback type="invalid">
                                          {formik.errors.tax_code}
                                        </FormFeedback>
                                      ) : null}
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>

                            <Row>
                              <Col>
                                <div className="mb-2">
                                  <Label className="form-label fw-bold">
                                    Ghi chú
                                  </Label>
                                  <Input
                                    name="description"
                                    type="textarea"
                                    id="textarea"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description || ""}
                                    maxLength="225"
                                    rows="3"
                                    placeholder="Nhập nội dung"
                                    invalid={
                                      formik.touched.description &&
                                      formik.errors.description
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.description &&
                                  formik.errors.description ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.description}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>

                    {!isEditCompany && (
                      <Card style={{ minWidth: "1100px" }}>
                        <CardBody className="bg-light">
                          <h4 className="fw-bold">
                            {t("Contact Information")}
                          </h4>
                          <Row className="border border-secondary mt-3">
                            <div>
                              <Row className="bg-secondary text-light">
                                <Col lg={12} sm={12}>
                                  <Row>
                                    <Col
                                      lg={2}
                                      sm={2}
                                      className="text-center mt-2 fw-bold"
                                    >
                                      <p>{t("Country")}</p>
                                    </Col>
                                    <Col
                                      lg={2}
                                      sm={2}
                                      className="text-center mt-2 fw-bold"
                                    >
                                      <p>{t("Province")}</p>
                                    </Col>
                                    <Col
                                      lg={2}
                                      sm={2}
                                      className="text-center mt-2 fw-bold"
                                    >
                                      <p>{t("District")}</p>
                                    </Col>
                                    <Col
                                      lg={2}
                                      sm={2}
                                      className="text-center mt-2 fw-bold"
                                    >
                                      <p>{t("Ward")}</p>
                                    </Col>
                                    <Col
                                      lg={3}
                                      sm={3}
                                      className="text-center mt-2 fw-bold"
                                    >
                                      <p>{t("House Number, Street, etc.")}</p>
                                    </Col>
                                    <Col
                                      lg={1}
                                      sm={1}
                                      className="text-center mt-2 fw-bold"
                                    >
                                      <p>{t("Default address")}</p>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </div>

                            {addressDataCompany.map((address, index) => {
                              return (
                                <Row
                                  className="mt-2"
                                  key={index}
                                  id={"nested" + index}
                                >
                                  <Col lg={12}>
                                    <div>
                                      <Row>
                                        <Col
                                          lg={2}
                                          sm={2}
                                          className="d-flex justify-content-between gap-2 mt-2"
                                        >
                                          <div className="mb-3">
                                            <CloseButton
                                              className="mt-2"
                                              onClick={() => {
                                                handleDeleteColumn(index)
                                              }}
                                            />
                                          </div>
                                          <div className="mb-3 w-100">
                                            <Select
                                              name="nation_id"
                                              placeholder={t("Country")}
                                              // value={selectNation}
                                              onChange={item => {
                                                setSelectNation(item)
                                                const arr = [
                                                  ...addressDataCompany,
                                                ]
                                                arr[index] = {
                                                  ...arr[index],
                                                  nation_id: item.value,
                                                }
                                                updateAddressDataCompany(arr)
                                              }}
                                              options={optionGroup}
                                              className="w-100"
                                            />
                                          </div>
                                        </Col>

                                        <Col lg={2} sm={2} className="mt-2">
                                          <div className="mb-3">
                                            <Select
                                              name="province_id"
                                              placeholder={t("Province")}
                                              // value={selectProvince || ""}
                                              defaultValue={
                                                isEditCompany
                                                  ? provinceOptions.find(
                                                      item =>
                                                        item.StateID ==
                                                        address.province_id
                                                    )
                                                  : ""
                                              }
                                              // value={provinceOptions.find(item => item.StateID == address.province_id) || ''}
                                              onChange={item => {
                                                setSelectProvince(item)
                                                const arr = [
                                                  ...addressDataCompany,
                                                ]
                                                arr[index] = {
                                                  ...arr[index],
                                                  province_id: item.StateID,
                                                }
                                                updateAddressDataCompany(arr)
                                              }}
                                              options={provinceOptions}
                                              // isClearable
                                            />
                                          </div>
                                        </Col>

                                        <Col lg={2} sm={2} className="mt-2 ">
                                          <div className="mb-3">
                                            <Select
                                              name="district"
                                              placeholder={t("District")}
                                              // value={districtOptions.find(item => item.DistrictID == address.district_id) || ''}
                                              defaultValue={
                                                isEditCompany
                                                  ? districtOptions.find(
                                                      item =>
                                                        item.DistrictID ==
                                                        address.district_id
                                                    )
                                                  : ""
                                              }
                                              onChange={item => {
                                                setSelectDistrict(item)
                                                const arr = [
                                                  ...addressDataCompany,
                                                ]
                                                arr[index] = {
                                                  ...arr[index],
                                                  district_id: item.DistrictID,
                                                }
                                                updateAddressDataCompany(arr)
                                              }}
                                              options={districtOptions}
                                              className="select2-selection"
                                              // isClearable
                                            />
                                          </div>
                                        </Col>

                                        <Col lg={2} sm={2} className="mt-2">
                                          <div className="mb-3">
                                            <Select
                                              name="commune"
                                              placeholder={t("Ward")}
                                              // value={communeOptions.find(item => item.WardID == address.commune_id) || ''}
                                              defaultValue={
                                                isEditCompany
                                                  ? communeOptions.find(
                                                      item =>
                                                        item.WardID ==
                                                        address.commune_id
                                                    )
                                                  : ""
                                              }
                                              onChange={item => {
                                                setSelectCommune(item)
                                                const arr = [
                                                  ...addressDataCompany,
                                                ]
                                                arr[index] = {
                                                  ...arr[index],
                                                  commune_id: item.WardID,
                                                }
                                                updateAddressDataCompany(arr)
                                              }}
                                              options={communeOptions}
                                              className="select2-selection"
                                              // isClearable
                                            />
                                          </div>
                                        </Col>

                                        <Col
                                          lg={3}
                                          sm={3}
                                          className="mt-2 fw-bold"
                                        >
                                          <div className="mb-3">
                                            <Input
                                              name="detail"
                                              type="text"
                                              placeholder={t(
                                                "House Number, Street, etc."
                                              )}
                                              value={address.detail || ""}
                                              onChange={e => {
                                                const arr = [
                                                  ...addressDataCompany,
                                                ]
                                                arr[index] = {
                                                  ...arr[index],
                                                  detail: e.target.value,
                                                }
                                                updateAddressDataCompany(arr)
                                              }}
                                            />
                                          </div>
                                        </Col>

                                        <Col
                                          lg={1}
                                          sm={1}
                                          className="d-flex justify-content-center"
                                        >
                                          <div className="ms-2">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name="exampleRadios"
                                              id={`radio-${index}`}
                                              value={index}
                                              style={{ marginTop: "12px" }}
                                              onChange={handleChangeDefault}
                                            />
                                            <UncontrolledTooltip
                                              placement="top"
                                              target={`radio-${index}`}
                                            >
                                              {t("Default address")}
                                            </UncontrolledTooltip>
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Col>
                                </Row>
                              )
                            })}

                            <Row className="mb-2 mt-2">
                              <Col lg={6} className="d-flex gap-2">
                                <Button
                                  onClick={handleAddForm}
                                  color="secondary"
                                  className="ms-4"
                                >
                                  <i
                                    className="mdi mdi-plus font-size-18"
                                    id="deletetooltip"
                                  />
                                </Button>
                              </Col>
                            </Row>
                          </Row>
                        </CardBody>
                      </Card>
                    )}

                    {isEditCompany && (
                      <Card>
                        <CardBody>
                          {isRefresh && (
                            <AddressDatas item={item} user={user} />
                          )}
                          {!isRefresh && (
                            <div className="d-flex gap-3 mt-1 ">
                              <h4 className="fw-bold text-success">
                                update data
                              </h4>{" "}
                              <Spinner
                                type="grow"
                                size="sm"
                                className="ms-2 mt-1"
                                color="primary"
                              />{" "}
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                tog_fullscreen()
                formik.resetForm()
                setIsEditCompany(false)
                updateAddressDataCompany([])
              }}
              className="btn btn-secondary "
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary "
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        </Modal>
      </Form>
    </>
  )
}

export default ModalDatas
