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
  FormFeedback,
  UncontrolledTooltip,
  Modal,
  CloseButton,
  Form,
  Spinner,
} from "reactstrap"

import { Divider } from "primereact/divider"

import Select from "react-select"
import Switch from "react-switch"

import * as Yup from "yup"
import { useFormik } from "formik"
import moment from "moment"

import { useTranslation } from "react-i18next"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"
import _ from "lodash"

// import context
import DataContext from "../../data/DataContext"
import avata from "../../assets/images/avata/avatar-null.png"

// import modal address
import AddressDatas from "../../components/CommonForBoth/Address/AddressDatas"

const CryptoJS = require("crypto-js")
// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  getProvinceByNationId,
  getDistrictByProvinceId,
  getCommuneByDistrictId,
  setAddress,
  uploadImageRequest,
  getStatusAll,
  getCareerAll,
  getStatusOfResidenceAll,
  setAlienRegistrationCard,
  setStatusDetail,
  getAlienRegistrationCardAll,
  updateAlienRegistrationCard,
  updateStatusDetail,
  deleteStatusDetail,
  getDispatchingCompanyUserId,
  getReceivingFactoryUserId,
  getSyndicationUserId,
  setUsers,
  getUsersAll,
  getInternUserId,
  updateUsers,
  setNoti,
} from "store/actions"
import { toast } from "react-toastify"
// import { dataStatus } from "common/data/status"

const optionGroup = [
  { label: "Viet Nam", value: "Vietnam" },
  { label: "Japan", value: "Japan" },
  { label: "Korea", value: "Korea" },
]
const optionGender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
]

const Offsymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      No
    </div>
  )
}

const OnSymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      Yes
    </div>
  )
}

// ma hoa password
function hashPassword(password) {
  const hashedPassword = CryptoJS.SHA256(password).toString()
  return hashedPassword
}

//---------------------------------------------------------------------------------------------------------------------------------------------------//

const ModalDatas = ({
  item,
  setApi,
  updateApi,
  addressData,
  alienCardData,
  statusDetailData,
  user,
}) => {
  // const user = JSON.parse(localStorage.getItem("authUser"))[0]

  const { t } = useTranslation()
  const dispatch = useDispatch()

  // lam moi du lieu intern
  const [f5Data, setF5Data] = useState(false)
  // theo doi lua chon status
  const [selectedMultiStatus, setselectedMultiStatus] = useState([])
  function handleMulti(selectedMultiStatus) {
    setselectedMultiStatus(selectedMultiStatus)
  }

  // Tao doi tuong luu bang the ngoai kieu
  const [alienCard, setAlienCard] = useState(null)
  const cardObj = {
    key_license_id: user != null ? user.key_license_id : "",
    intern_id: null,
    card_number: null,
    status_of_residence_id: null,
    license_date: null,
    expiration_date: null,
    description: null,
    create_at: null,
    create_by: 1,
    update_at: null,
    update_by: 1,
    delete_at: null,
    flag: 1,
  }

  // Tao doi luong luu bang chi tiet trang thai
  const statusDetailObj = {
    key_license_id: user != null ? user.key_license_id : "",
    intern_id: null,
    status_id: null,
    description: null,
    create_at: null,
    create_by: 1,
    update_at: null,
    update_by: 1,
    delete_at: null,
    flag: 1,
  }

  // Tao doi luong luu tai khoan
  const userObj = {
    key_license_id: user != null ? user.key_license_id : "",
    role: "user",
    object_type: null,
    object_id: null,
    username: null,
    password_hash: null,
    active: true,
    description: null,
    create_at: null,
    create_by: user.id,
    update_at: null,
    update_by: user.id,
    delete_at: null,
    flag: 1,
  }

  // Tao doi luong luu tai khoan
  const notiObj = {
    key_license_id: user != null ? user.key_license_id : "",
    user_id: null,
    date_noti: null,
    title: null,
    content: null,
    watched: 0,
    description: null,
    create_at: null,
    create_by: user.id,
    update_at: null,
    update_by: user.id,
    delete_at: null,
    flag: 1,
  }

  // data context
  const {
    modal_fullscreen,
    setmodal_fullscreen,
    tog_fullscreen,
    isEditIntern,
    setIsEditIntern,
    addressIntern,
    addressDataIntern,
    updateAddressDataIntern,
    isRefresh,
    updateRefresh,
    NationList,
    // user,
  } = useContext(DataContext)

  // Radio button
  const [selectAddressDefault, setSelectAddressDefault] = useState(0)
  const handleChangeDefault = event => {
    setSelectAddressDefault(event.target.value)
  }

  // kiem tra trang thai xem co duoc ghi dia chi
  const [isCreateAddress, setIsCreateAddress] = useState(false)

  // Du lieu trong redux
  const {
    provinceDataByNationId,
    districtDataByProvinceId,
    communeDataByDistrictId,
    internCreate,
    companyData,
    factoryData,
    syndicationData,
    statusData,
    careerData,
    statusOfResidenceData,
    loadingIntern,
    alienCardDatas,
    usersData,
  } = useSelector(
    state => ({
      provinceDataByNationId: state.Province.dataByNationId,
      districtDataByProvinceId: state.District.dataByProvinceId,
      communeDataByDistrictId: state.Commune.dataByDistrictId,
      internCreate: state.Intern.data,
      loadingIntern: state.Intern.loading,
      companyData: state.DispatchingCompany.datas,
      factoryData: state.ReceivingFactory.datas,
      syndicationData: state.Syndication.datas,
      statusData: state.Status.datas,
      careerData: state.Career.datas,
      statusOfResidenceData: state.StatusOfResidence.datas,
      alienCardDatas: state.AlienRegistrationCard.datas,
      usersData: state.Users.datas,
    }),
    shallowEqual
  )

  // Get du lieu lan dau
  useEffect(() => {
    if (user) {
      dispatch(getDispatchingCompanyUserId(user.id))
      dispatch(getReceivingFactoryUserId(user.id))
      dispatch(getSyndicationUserId(user.id))
      dispatch(getStatusAll())
      dispatch(getCareerAll())
      dispatch(getStatusOfResidenceAll())
      dispatch(getAlienRegistrationCardAll())
      dispatch(getUsersAll())
    }
  }, [dispatch])

  // xu ly form nhap anh
  const fileInputRef = useRef()
  const [selectedFile, setSelectedFile] = useState(null)
  const [showAvata, setShowAvata] = useState(avata)
  const handleChange = event => {
    const file = event.target.files[0]
    setSelectedFile(file)
    formik.setFieldValue("avata", file.name)
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        setShowAvata(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  //--------------------------------------------------------------------------------//
  // cho phép truy cap he thong
  const [isHasAccount, setIsHasAccount] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [account, setAccount] = useState(null)

  useEffect(() => {
    if (item && usersData) {
      const arr = usersData.find(
        u => u.object_id == item.id && u.object_type == item.type
      )
      // console.log(arr);
      if (arr) {
        setAccount(arr)
        setIsHasAccount(true)
        if (arr.active == 1) {
          setIsLogin(true)
        }
      }
    }
  }, [item])

  //---------------------------------------------------------------------------------------------//

  // doc du lieu status va alien card sau do nap vao state
  const [numStatusDetail, setNumTicketStatus] = useState([])
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (item != null && on == false) {
      const arr = statusDetailData.filter(sdd => sdd.intern_id == item.id)
      setNumTicketStatus(arr)

      const selectedStatus = arr.map((statusDetail, index) => {
        return statusData.find(sd => sd.id == statusDetail.status_id)
      })

      // nap gia tri status cho state
      setselectedMultiStatus(selectedStatus)
      const cardData = alienCardDatas.find(card => card.intern_id == item.id)
      if (cardData) {
        setAlienCard(cardData)
      }

      setOn(true)
    }
  }, [item])

  // console.log(numStatusDetail)

  // tao schema khi khong tao tk
  const withoutAccountSchema = Yup.object().shape({
    first_name_jp: Yup.string().required("This value is required"),
    last_name_jp: Yup.string().required("This value is required"),
    first_name_en: Yup.string().required("This value is required"),
    last_name_en: Yup.string().required("This value is required"),
    gender: Yup.string().required("This value is required"),
    dob: Yup.date().required("Please select date"),
    career_id: Yup.string().required("This value is required"),
    passport_code: Yup.string().required("This value is required"),
    passport_license_date: Yup.date().required("Please select date"),
    passport_expiration_date: Yup.date().required("Please select date"),
    receiving_factory_id: Yup.string().required("This value is required"),
    dispatching_company_id: Yup.string().required("This value is required"),
  })

  const withAccountSchema = Yup.object().shape({
    first_name_jp: Yup.string().required("This value is required"),
    last_name_jp: Yup.string().required("This value is required"),
    first_name_en: Yup.string().required("This value is required"),
    last_name_en: Yup.string().required("This value is required"),
    gender: Yup.string().required("This value is required"),
    dob: Yup.date().required("Please select date"),
    career_id: Yup.string().required("This value is required"),
    passport_code: Yup.string().required("This value is required"),
    passport_license_date: Yup.date().required("Please select date"),
    passport_expiration_date: Yup.date().required("Please select date"),
    receiving_factory_id: Yup.string().required("This value is required"),
    dispatching_company_id: Yup.string().required("This value is required"),

    password: Yup.string().min(
      6,
      "Password must be at least 6 characters long"
    ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password incorrect"
    ),
    username: Yup.string()
      .email("Must be a valid Email")
      .max(255)
      .required("Email is required")
      .test(
        "done",
        "Username already exists",
        value => usersData.find(u => u.username == value) == undefined
      ),
  })

  const getValidationSchema = () => {
    return isLogin ? withAccountSchema : withoutAccountSchema
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: item != null ? item.id : "",
      key_license_id:
        item != null
          ? item.key_license_id
          : user != null
          ? user.key_license_id
          : "",
      type: "intern",
      avata: item != null ? item.avata : "",
      avata_update_at:
        item != null
          ? moment(item.date_of_joining_syndication)
              .utcOffset("+09:00")
              .format("YYYY-MM-DD")
          : null,
      first_name_jp: item != null ? item.first_name_jp : "",
      middle_name_jp: item != null ? item.middle_name_jp : "",
      last_name_jp: item != null ? item.last_name_jp : "",
      first_name_en: item != null ? item.first_name_en : "",
      middle_name_en: item != null ? item.middle_name_en : "",
      last_name_en: item != null ? item.last_name_en : "",
      gender: item != null ? item.gender : "male",
      dob:
        item != null
          ? moment(item.date_of_joining_syndication)
              .utcOffset("+09:00")
              .format("YYYY-MM-DD")
          : null,
      career_id: item != null ? item.career_id : "",
      passport_code: item != null ? item.passport_code : "",
      passport_license_date:
        item != null
          ? moment(item.date_of_joining_syndication)
              .utcOffset("+09:00")
              .format("YYYY-MM-DD")
          : null,
      passport_expiration_date:
        item != null
          ? moment(item.date_of_joining_syndication)
              .utcOffset("+09:00")
              .format("YYYY-MM-DD")
          : null,
      entry_date:
        item != null
          ? moment(item.entry_date).utcOffset("+09:00").format("YYYY-MM-DD")
          : null,
      alert: item != null ? item.alert : 0,
      phone_domestically: item != null ? item.phone_domestically : "",
      phone_abroad: item != null ? item.phone_abroad : "",

      syndication_id:
        item != null
          ? item.syndication_id
          : user.object_type == "syndication"
          ? user.object_id
          : "",
      receiving_factory_id:
        item != null
          ? item.receiving_factory_id
          : user.object_type == "receiving_factory"
          ? user.object_id
          : "",

      dispatching_company_id: item != null ? item.dispatching_company_id : "",
      description: item != null ? item.description : "",
      create_at: item != null ? item.create_at : null,
      create_by: item != null ? item.create_by : user.id,
      update_at: item != null ? item.update_at : null,
      update_by: item != null ? item.update_by : user.id,

      country: item != null ? item.country : "Vietnam",
      alien_registration_card_number:
        item != null
          ? alienCardData.find(i => i.intern_id == item.id) != null
            ? alienCardData.find(i => i.intern_id == item.id).card_number
            : ""
          : "", // số thẻ ngoại kiều
      status_of_residence_id:
        item != null
          ? statusOfResidenceData.find(i => i.name == item.sor_name) != null
            ? statusOfResidenceData.find(i => i.name == item.sor_name).id
            : ""
          : "", // Tư cách lưu trú

      license_date:
        item != null
          ? alienCardData.find(i => i.intern_id == item.id) != null
            ? moment(
                alienCardData.find(i => i.intern_id == item.id).license_date
              )
                .utcOffset("+09:00")
                .format("YYYY-MM-DD")
            : ""
          : null,
      expiration_date:
        item != null
          ? alienCardData.find(i => i.intern_id == item.id) != null
            ? moment(
                alienCardData.find(i => i.intern_id == item.id).expiration_date
              )
                .utcOffset("+09:00")
                .format("YYYY-MM-DD")
            : ""
          : null,
      status_id:
        item != null
          ? statusDetailData.filter(i => i.intern_id == item.id) != null
            ? statusDetailData.filter(i => i.intern_id == item.id)
            : ""
          : "", // trạng thái

      username: account != null ? account.username : "",
      password: "",
      repassword: "",
    },
    validationSchema: getValidationSchema(),
    onSubmit: async value => {
      // if (_.isEqual(value, formik.initialValues)) {
      //   toast.warning("No changes were made", { autoClose: 2000 });
      // } else {
      // truong hop update du lieu
      if (isEditIntern) {
        let obj = {
          id: value.id,
          key_license_id: value.key_license_id,
          syndication_id: value.syndication_id,
          type: "intern",
          country: value.country,
          avata: value.avata,
          avata_update_at: value.avata_update_at,
          first_name_jp: value.first_name_jp,
          middle_name_jp: value.middle_name_jp,
          last_name_jp: value.last_name_jp,
          first_name_en: value.first_name_en,
          middle_name_en: value.middle_name_en,
          last_name_en: value.last_name_en,
          gender: value.gender,
          dob: value.dob,
          career_id: value.career_id,
          passport_code: value.passport_code,
          passport_license_date: value.passport_license_date,
          passport_expiration_date: value.passport_expiration_date,
          entry_date: value.entry_date,
          alert: value.alert,
          phone_domestically: value.phone_domestically,
          phone_abroad: value.phone_abroad,
          receiving_factory_id: value.receiving_factory_id,
          dispatching_company_id: value.dispatching_company_id,
          description: value.description,
          create_at: value.create_at,
          create_by: value.create_by,
          update_at: null,
          update_by: value.update_by,
          delete_at: null,
          flag: 1,
        }
        dispatch(updateApi(obj))

        // Xac dinh so luong numStatusDetail ban dau : a
        // xem so luong selectedMultiStatus moi cap nhat : b
        // neu a > b => 0 - b : se UPDATE , b -> a : se DELETE
        // neu a = b => thi tat ca deu la UPDATE
        // neu a < b => a : se UPDATE , b-a : se SET
        // console.log("numStatusDetail.length", numStatusDetail.length)
        // console.log("selectedMultiStatus.length", selectedMultiStatus.length)

        if (numStatusDetail.length > 0) {
          if (numStatusDetail.length > selectedMultiStatus.length) {
            for (let i = 0; i < numStatusDetail.length; i++) {
              let ticketStatusId = numStatusDetail[i].id
              if (i < selectedMultiStatus.length) {
                const newStatusDetail = {
                  ...numStatusDetail[i],
                  status_id: selectedMultiStatus[i].id,
                }
                const { name, colors, ...ns } = newStatusDetail
                dispatch(updateStatusDetail(ns))
              } else {
                dispatch(deleteStatusDetail(ticketStatusId))
              }
            }
          } else if (numStatusDetail.length == selectedMultiStatus.length) {
            for (let i = 0; i < numStatusDetail.length; i++) {
              const newStatusDetail = {
                ...numStatusDetail[i],
                status_id: selectedMultiStatus[i].id,
              }
              const { name, colors, ...ns } = newStatusDetail
              dispatch(updateStatusDetail(ns))
            }
          } else {
            for (let i = 0; i < selectedMultiStatus.length; i++) {
              if (i < numStatusDetail.length) {
                const newStatusDetail = {
                  ...numStatusDetail[i],
                  status_id: selectedMultiStatus[i].id,
                }
                const { name, colors, ...ns } = newStatusDetail
                // console.log('ns', ns)
                dispatch(updateStatusDetail(ns))
              } else {
                const newStatusDetail = {
                  ...statusDetailObj,
                  intern_id: value.id,
                  status_id: selectedMultiStatus[i].id,
                }
                dispatch(setStatusDetail(newStatusDetail))
              }
            }
          }
        } else {
          // neu ban dau chua co du lieu thi ghi toan bo vao db
          for (let i = 0; i < selectedMultiStatus.length; i++) {
            const newStatusDetail = {
              ...statusDetailObj,
              intern_id: value.id,
              status_id: selectedMultiStatus[i].id,
            }
            dispatch(setStatusDetail(newStatusDetail))
          }
        }

        // check alien card
        // neu card chua co thi ghi moi
        // neu card da ton tai thi update
        if (alienCard != null) {
          const newCrad = {
            ...alienCard,
            key_license_id: user.key_license_id,
            card_number: value.alien_registration_card_number,
            status_of_residence_id: value.status_of_residence_id,
            license_date: value.license_date,
            expiration_date: value.expiration_date,
          }
          dispatch(updateAlienRegistrationCard(newCrad))
        } else {
          const newCrad = {
            ...alienCard,
            intern_id: item.id,
            key_license_id: user.key_license_id,
            card_number: value.alien_registration_card_number,
            status_of_residence_id: value.status_of_residence_id,
            license_date: value.license_date,
            expiration_date: value.expiration_date,
          }
          dispatch(setAlienRegistrationCard(newCrad))
        }

        // kiem tra account
        // truong hop 1: chua co account thi tao account moi
        if (!isHasAccount) {
          if (isLogin) {
            const newAccount = {
              key_license_id: value.key_license_id,
              role: "user",
              object_type: "intern",
              object_id: item.id,
              username: value.username,
              password_hash: hashPassword(value.password),
              active: 1,
              description: "",
              create_at: null,
              create_by: user.id,
              update_at: null,
              update_by: user.id,
              delete_at: null,
              flag: 1,
            }
            dispatch(setUsers(newAccount))
          }
        } else {
          // da co account , isLogin = false tuc la tat quyen truy cap cua intern vao he thong
          if (!isLogin) {
            const { full_name_en, label, logo, value, ...acc } = account
            const newAccount = { ...acc, active: 0 }
            dispatch(updateUsers(newAccount))
          } else {
            // da co account , isLogin = true tuc la co quyen truy cap vao he thong hoac moi bat lai quyen truy cap
            // neu truoc do user dang khoa thi mo khoa
            if (account.active == 0) {
              const { full_name_en, label, logo, value, ...acc } = account
              const newAccount = { ...acc, active: 1 }
              dispatch(updateUsers(newAccount))
            }
          }
        }

        setselectedMultiStatus([])
        setOn(false)
        formik.resetForm()
        item = null
        setSelectedFile(null)
        setF5Data(true)
        setIsLogin(false)
        setAccount(null)
        tog_fullscreen()
        // dispatch(getAlienRegistrationCardAll())
      } else {
        // truong hop them du lieu moi
        let obj = {
          key_license_id: value.key_license_id,
          syndication_id: value.syndication_id,
          type: "intern",
          country: value.country,
          avata: value.avata,
          avata_update_at: value.avata_update_at,
          first_name_jp: value.first_name_jp,
          middle_name_jp: value.middle_name_jp,
          last_name_jp: value.last_name_jp,
          first_name_en: value.first_name_en,
          middle_name_en: value.middle_name_en,
          last_name_en: value.last_name_en,
          gender: value.gender,
          dob: value.dob,
          career_id: value.career_id,
          passport_code: value.passport_code,
          passport_license_date: value.passport_license_date,
          passport_expiration_date: value.passport_expiration_date,
          entry_date: value.entry_date,
          alert: value.alert,
          phone_domestically: value.phone_domestically,
          phone_abroad: value.phone_abroad,
          receiving_factory_id: value.receiving_factory_id,
          dispatching_company_id: value.dispatching_company_id,
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
      }
      // }

      // upload anh len server
      if (selectedFile) {
        const formData = new FormData()
        formData.append("image", selectedFile)
        dispatch(uploadImageRequest(formData))
        // dispatch(uploadFile(formData));
      }
      console.log("submit done")
    },
  })

  // thuc thi formik
  const handleSubmit = () => {
    console.log("submit")
    formik.handleSubmit()
    // console.log(multiStatus)
  }

  //--------------------------------------------------------------------------------//

  useEffect(() => {
    if (f5Data) {
      dispatch(getInternUserId(user.id))
      setF5Data(false)
    }
  }, [f5Data])

  //--------------------------------------------------------------------------------//

  // useEffect(() => {
  //   const f = usersData.find(u => u.username == formik.values.username)
  //   console.log(f);
  //   if(f != undefined) {
  //     formik.errors.username = 'Ten dang nhap da ton tai'
  //   } else {
  //     formik.errors.username = null
  //   }
  // }, [formik.values.username])

  //--------------------------------------------------------------------------------//
  // nap du lieu cho dia chi neu la chinh sua
  useEffect(() => {
    // console.log('check');
    if (isEditIntern) {
      if (item !== null) {
        const arr = addressData.filter(
          address =>
            address.object_id == item.id && address.user_type == "intern"
        )
        // console.log('arr', arr)
        updateAddressDataIntern(arr)
      }
    }
  }, [isEditIntern])

  //---------------------------------------------------------------------------------------------------------------
  // GHi du lieu dia chi,status, user vao database
  useEffect(() => {
    if (internCreate) {
      if (isCreateAddress && !loadingIntern) {
        const internId = internCreate["id"]
        // console.log('id:', id);

        // ghi alien card
        if (
          formik.values.alien_registration_card_number != "" &&
          formik.values.status_of_residence_id != "" &&
          formik.values.license_date != null &&
          formik.values.expiration_date != null
        ) {
          const card = {
            ...cardObj,
            card_number: formik.values.alien_registration_card_number,
            status_of_residence_id: formik.values.status_of_residence_id,
            license_date: formik.values.license_date,
            expiration_date: formik.values.expiration_date,
            key_license_id: formik.values.key_license_id,
            intern_id: internId,
          }
          dispatch(setAlienRegistrationCard(card))
        }

        // lay danh sach Status automation, cac trang thai nay se duwoc ghi tu dogn vao thuc tap sinh
        const arr1 = statusData.filter(
          status => status.status_type == "automatic"
        )
        // console.log('arr1', arr1);
        // tao mang moi chua cac status tu dong va cac status ma nguoi dung chon :
        const newStatusArray = [...arr1, ...selectedMultiStatus]

        // ghi status
        const multiStatus = newStatusArray.map(status => {
          return {
            ...statusDetailObj,
            status_id: status.id,
            intern_id: internId,
            key_license_id: formik.values.key_license_id,
          }
        })

        console.log("newStatusArray", newStatusArray)
        multiStatus.forEach(st => {
          dispatch(setStatusDetail(st))
        })

        // Check va xu ly thong bao
        // Lay cac status tu dong
        // kiem tra các điều kiện

        // lap cac status tu dong de tim ra ngay can gui thong bao
        // kiem tra dieu kien
        arr1.forEach(status => {
          console.log("Start write schedulate notification")
          let dateAlert
          if (status.condition_date == "before") {
            switch (status.condition_milestone) {
              case "residence status expiration date":
                dateAlert = moment(formik.values.expiration_date).subtract(
                  status.condition_value,
                  "days"
                )
                const newNoti1 = {
                  ...notiObj,
                  key_license_id: user.key_license_id,
                  user_id: internId,
                  date_noti: dateAlert,
                  title: "residence status expiration date",
                  content: `residence status expiration date: ${formik.values.expiration_date}`,
                }
                dispatch(setNoti(newNoti1))
              case "entry date":
                dateAlert = moment(formik.values.entry_date).subtract(
                  status.condition_value,
                  "days"
                )
                const newNoti2 = {
                  ...notiObj,
                  key_license_id: user.key_license_id,
                  user_id: internId,
                  // date_noti: moment(dateAlert).format('YYYY-MM-DDTHH:mm:ss'),
                  date_noti: "2024-04-05T00:23:00",
                  title: "entry date",
                  content: `entry date: ${formik.values.entry_date}`,
                }
                dispatch(setNoti(newNoti2))
              case "visa expiration date":
                dateAlert = moment(
                  formik.values.passport_expiration_date
                ).subtract(status.condition_value, "days")
                const newNoti3 = {
                  ...notiObj,
                  key_license_id: user.key_license_id,
                  user_id: internId,
                  date_noti: dateAlert,
                  title: "visa expiration date",
                  content: `visa expiration date: ${formik.values.passport_expiration_date}`,
                }
                dispatch(setNoti(newNoti3))
            }
          } else {
            switch (status.condition_milestone) {
              case "residence status expiration date":
                dateAlert = moment(formik.values.expiration_date).add(
                  status.condition_value,
                  "days"
                )
                const newNoti1 = {
                  ...notiObj,
                  key_license_id: user.key_license_id,
                  user_id: internId,
                  date_noti: dateAlert,
                  title: "residence status expiration date",
                  content: `residence status expiration date: ${formik.values.expiration_date}`,
                }
                dispatch(setNoti(newNoti1))
              case "entry date":
                dateAlert = moment(formik.values.entry_date).add(
                  status.condition_value,
                  "days"
                )
                const newNoti2 = {
                  ...notiObj,
                  key_license_id: user.key_license_id,
                  user_id: internId,
                  date_noti: dateAlert,
                  title: "entry date",
                  content: `entry date: ${formik.values.entry_date}`,
                }
                dispatch(setNoti(newNoti2))
              case "visa expiration date":
                dateAlert = moment(formik.values.passport_expiration_date).add(
                  status.condition_value,
                  "days"
                )
                const newNoti3 = {
                  ...notiObj,
                  key_license_id: user.key_license_id,
                  user_id: internId,
                  date_noti: dateAlert,
                  title: "visa expiration date",
                  content: `visa expiration date: ${formik.values.passport_expiration_date}`,
                }
                dispatch(setNoti(newNoti3))
            }
          }
        })

        // ghi address
        if (addressDataIntern.length > 0) {
          addressDataIntern.forEach((address, index) => {
            const newAddress = {
              ...address,
              key_license_id: formik.values.key_license_id,
              object_id: internId,
              is_default: selectAddressDefault == index ? 1 : 0,
            }
            dispatch(setAddress(newAddress))
          })
        }

        // ghi user
        if (isLogin) {
          const password = formik.values.password
          const hashedPassword = hashPassword(password)
          const newUser = {
            ...userObj,
            key_license_id: user.key_license_id,
            object_type: "intern",
            object_id: internId,
            username: formik.values.username,
            password_hash: hashedPassword,
          }
          dispatch(setUsers(newUser))
        }

        setIsCreateAddress(false)
        setselectedMultiStatus([])
        setOn(false)
        tog_fullscreen()
        formik.resetForm()
        item = null
        setSelectedFile(null)
        setIsLogin(false)
        setAccount(null)

        dispatch(getInternUserId(user.id))
      }
    }
  }, [internCreate, isCreateAddress])
  //----------------------------------------------------------------------------------------------------------------

  // xu ly khi them form nhap dia chi
  const handleAddForm = () => {
    updateAddressDataIntern([...addressDataIntern, addressIntern])
  }

  // xu ly khi xoa form nhap dia chi
  const handleDeleteColumn = getIndex => {
    const arr = [...addressDataIntern]
    arr.splice(getIndex, 1)
    updateAddressDataIntern(arr)
  }

  //---------------------------------------------------------------------------------------

  // dem so ky tu o nhap note
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

  //---------------------------------------------------------------------------------------

  // render lua chon tinh, huyen, xa

  const [selectNation, setSelectNation] = useState(null)
  const [selectProvince, setSelectProvince] = useState(null)
  const [selectDistrict, setSelectDistrict] = useState(null)
  const [selectCommune, setSelectCommune] = useState(null)

  const [provinceOptions, setProvinceOptions] = useState([])
  const [districtOptions, setDistrictOptions] = useState([])
  const [communeOptions, setCommuneOptions] = useState([])

  // Tai du lieu thanh pho
  useEffect(() => {
    if (selectNation) {
      dispatch(getProvinceByNationId(selectNation.value))
      // setSelectProvince([]);
    }
  }, [selectNation])

  //---------------------------------------------------------------------------------------

  // tao danh sach lua chon tinh/thanh pho
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

  //---------------------------------------------------------------------------------------

  // Xu ly danh sach district
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

  //---------------------------------------------------------------------------------------
  // xu ly tai danh sach commune
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
  //---------------------------------------------------------------------------------------

  // console.log("formik:", formik.values)
  // console.log('alienCardData:', alienCardData)
  // console.log('user:', user.object_type)
  // console.log('isEditIntern:', isEditIntern)
  // console.log('loadingIntern:', loadingIntern)
  // console.log("selectedMultiStatus:", selectedMultiStatus)
  // console.log("selectedFile:", selectedFile)
  // console.log("isRefresh:", isRefresh)
  // console.log("item:", item)
  // console.log("alienCard:", alienCard)
  // console.log("isLogin:", isLogin)
  // console.log("isHasAccount:", isHasAccount)
  // console.log("dataStatus:", statusData)

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
          <div className="modal-header bg-primary">
            <h5 className="modal-title mt-0" id="exampleModalFullscreenLabel">
              {isEditIntern ? t("Edit") : t("Add Intern")}
            </h5>
            <button
              onClick={() => {
                setmodal_fullscreen(false)
                setIsEditIntern(false)
                setselectedMultiStatus([])
                setOn(false)
                setSelectedFile(null)
                setIsLogin(false)
                setAccount(null)
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body" style={{ paddingBottom: "200px" }}>
            <Row>
              <Col lg={12}>
                {/* <Card> */}
                {/* <CardBody> */}

                {/* <Card>
                  <CardBody className="bg-light"> */}
                    <Row>
                      <Col lg={2} xl={2} sm={4}>
                        <div className="d-flex justify-content-center">
                          <Card style={{ width: "70%" }}>
                            <CardBody className="d-flex flex-column">
                              <div style={{ aspectRatio: 1 }}>
                                <img
                                  style={{ width: "100%", height: "100%" }}
                                  className="rounded-circle img-thumbnail"
                                  alt="avata"
                                  src={showAvata}
                                />
                              </div>
                              <CardTitle tag="h5" className="text-center mt-2">
                                Admin
                              </CardTitle>
                              <Button
                                onClick={() => fileInputRef.current.click()}
                              >
                                {t("Upload Avata")}
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
                        </div>
                        <Divider />
                        <div>
                          <Card>
                            <CardBody>

                          
                          <div className="mb-3">
                            <Switch
                              name="status_type"
                              uncheckedIcon={<Offsymbol />}
                              checkedIcon={<OnSymbol />}
                              className="me-3 mb-sm-8"
                              onColor="#626ed4"
                              onChange={value => {
                                setIsLogin(value)
                              }}
                              checked={isLogin}
                            />
                            <Label>{t("Login System")}</Label>
                          </div>
                          {isLogin && (
                            <div className="">
                              <div>
                                <div className="mb-3">
                                  <Input
                                    name="username"
                                    placeholder={t("Username")}
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                    className="mt-2"
                                    disabled={isHasAccount ? true : false}
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

                                {!isHasAccount && (
                                  <>
                                    <div className="mb-3">
                                      <Input
                                        name="password"
                                        placeholder={t("Password")}
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        className="mt-2"
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
                                      <Input
                                        name="confirmPassword"
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
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                            </CardBody>
                          </Card>
                        </div>
                      </Col>

                      <Col lg={5} xl={5}>
                        <Card className="h-100">
                          <CardBody>
                            <Row>
                              <Col lg={4} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Last Name")}
                                  </Label>
                                  <Input
                                    name="first_name_jp"
                                    placeholder={t("Last Name")}
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.first_name_jp || ""}
                                    invalid={
                                      formik.touched.first_name_jp &&
                                      formik.errors.first_name_jp
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.first_name_jp &&
                                  formik.errors.first_name_jp ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.first_name_jp}
                                    </FormFeedback>
                                  ) : null}
                                </div>

                                <div className="mb-3">
                                  <Input
                                    name="first_name_en"
                                    type="text"
                                    autoComplete="off"
                                    placeholder={t("Last Name (English)")}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.first_name_en || ""}
                                    invalid={
                                      formik.touched.first_name_en &&
                                      formik.errors.first_name_en
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.first_name_en &&
                                  formik.errors.first_name_en ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.first_name_en}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={4} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Middle Name")}
                                  </Label>
                                  <Input
                                    name="middle_name_jp"
                                    type="text"
                                    autoComplete="off"
                                    placeholder={t("Middle Name")}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.middle_name_jp || ""}
                                    invalid={
                                      formik.touched.middle_name_jp &&
                                      formik.errors.middle_name_jp
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.middle_name_jp &&
                                  formik.errors.middle_name_jp ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.middle_name_jp}
                                    </FormFeedback>
                                  ) : null}
                                </div>

                                <div className="mb-3">
                                  <Input
                                    name="middle_name_en"
                                    placeholder={t("Middle Name (English)")}
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.middle_name_en || ""}
                                    invalid={
                                      formik.touched.middle_name_en &&
                                      formik.errors.middle_name_en
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.middle_name_en &&
                                  formik.errors.middle_name_en ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.middle_name_en}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={4} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("First Name")}
                                  </Label>
                                  <Input
                                    name="last_name_jp"
                                    type="text"
                                    autoComplete="off"
                                    placeholder={t("First Name")}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.last_name_jp || ""}
                                    invalid={
                                      formik.touched.last_name_jp &&
                                      formik.errors.last_name_jp
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.last_name_jp &&
                                  formik.errors.last_name_jp ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.last_name_jp}
                                    </FormFeedback>
                                  ) : null}
                                </div>

                                <div className="mb-3">
                                  <Input
                                    name="last_name_en"
                                    placeholder={t("First Name (English)")}
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.last_name_en || ""}
                                    invalid={
                                      formik.touched.last_name_en &&
                                      formik.errors.last_name_en
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.last_name_en &&
                                  formik.errors.last_name_en ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.last_name_en}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={4} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Country")}
                                  </Label>
                                  <Select
                                    name="country"
                                    placeholder={t("Country")}
                                    value={optionGroup.find(
                                      option =>
                                        option.value === formik.values.country
                                    )}
                                    onChange={item => {
                                      formik.setFieldValue(
                                        "country",
                                        item.value
                                      )
                                    }}
                                    options={optionGroup}
                                    // components={{ Option: CustomOption }}
                                    // isClearable
                                  />
                                </div>
                              </Col>
                              <Col lg={4} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Gender")}
                                  </Label>
                                  <Select
                                    name="gender"
                                    placeholder={t("Gender")}
                                    value={optionGender.find(
                                      option =>
                                        option.value === formik.values.gender
                                    )}
                                    onChange={item => {
                                      formik.setFieldValue(
                                        "gender",
                                        item == null ? null : item.value
                                      )
                                    }}
                                    options={optionGender}
                                    // isClearable
                                  />
                                </div>
                              </Col>
                              <Col lg={4} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Date of Birth")}
                                  </Label>
                                  <Input
                                    name="dob"
                                    placeholder={t("Date of Birth")}
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dob || null}
                                    invalid={
                                      formik.touched.dob && formik.errors.dob
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.dob && formik.errors.dob ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.dob}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={6} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Domestic Phone Number")}
                                  </Label>
                                  <Input
                                    name="phone_domestically"
                                    placeholder={t("Domestic Phone Number")}
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.phone_domestically || ""
                                    }
                                    invalid={
                                      formik.touched.phone_domestically &&
                                      formik.errors.phone_domestically
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.phone_domestically &&
                                  formik.errors.phone_domestically ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.phone_domestically}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={6} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Phone Number")}
                                  </Label>
                                  <Input
                                    name="phone_abroad"
                                    placeholder={t("Phone Number")}
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone_abroad || ""}
                                    invalid={
                                      formik.touched.phone_abroad &&
                                      formik.errors.phone_abroad
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.phone_abroad &&
                                  formik.errors.phone_abroad ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.phone_abroad}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={12} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Passport Number")}
                                  </Label>
                                  <Input
                                    name="passport_code"
                                    placeholder={t("Passport Number")}
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.passport_code || ""}
                                    invalid={
                                      formik.touched.passport_code &&
                                      formik.errors.passport_code
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.passport_code &&
                                  formik.errors.passport_code ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.passport_code}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={6} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Date of Issue")}
                                  </Label>
                                  <Input
                                    name="passport_license_date"
                                    placeholder={t("Date of Issue")}
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.passport_license_date || ""
                                    }
                                    invalid={
                                      formik.touched.passport_license_date &&
                                      formik.errors.passport_license_date
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.passport_license_date &&
                                  formik.errors.passport_license_date ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.passport_license_date}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={6} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Expiry Date")}
                                  </Label>
                                  <Input
                                    name="passport_expiration_date"
                                    placeholder={t("Expiry Date")}
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.passport_expiration_date ||
                                      ""
                                    }
                                    invalid={
                                      formik.touched.passport_expiration_date &&
                                      formik.errors.passport_expiration_date
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.passport_expiration_date &&
                                  formik.errors.passport_expiration_date ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.passport_expiration_date}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>

                      <Col lg={5} xl={5}>
                        <Card className="h-100">
                          <CardBody>
                            <Row>
                              <Col lg={6} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Dispatching Company")}
                                  </Label>
                                  <Select
                                    name="dispatching_company_id"
                                    placeholder={t("Dispatching Company")}
                                    value={companyData.find(
                                      option =>
                                        option.value ===
                                        formik.values.dispatching_company_id
                                    )}
                                    onChange={item => {
                                      formik.setFieldValue(
                                        "dispatching_company_id",
                                        item.value
                                      )
                                    }}
                                    options={companyData}
                                    // isClearable
                                  />
                                </div>
                              </Col>

                              {user &&
                                user.object_type == "receiving_factory" && (
                                  <Col lg={6} className="gx-1">
                                    <div className="mb-3">
                                      <Label className="form-label fw-bold">
                                        {t("Syndication")}
                                      </Label>
                                      <Select
                                        name="syndication_id"
                                        placeholder={t("Syndication")}
                                        value={syndicationData.find(
                                          option =>
                                            option.value ===
                                            formik.values.syndication_id
                                        )}
                                        onChange={item => {
                                          formik.setFieldValue(
                                            "syndication_id",
                                            item == null ? null : item.value
                                          )
                                        }}
                                        options={syndicationData}
                                        // isClearable
                                      />
                                    </div>
                                  </Col>
                                )}

                              {user && user.object_type == "syndication" && (
                                <Col lg={6} className="gx-1">
                                  <div className="mb-3">
                                    <Label className="form-label fw-bold">
                                      {t("Receiving Factory")}
                                    </Label>
                                    <Select
                                      name="receiving_factory_id"
                                      placeholder={t("Receiving Factory")}
                                      value={factoryData.find(
                                        option =>
                                          option.value ===
                                          formik.values.receiving_factory_id
                                      )}
                                      onChange={item => {
                                        formik.setFieldValue(
                                          "receiving_factory_id",
                                          item == null ? null : item.value
                                        )
                                      }}
                                      options={factoryData}
                                      // isClearable
                                    />
                                  </div>
                                </Col>
                              )}
                            </Row>
                            <Row className="">
                              <Col lg={6} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Status")}
                                  </Label>
                                  <Select
                                    placeholder={t("Status")}
                                    value={selectedMultiStatus}
                                    isMulti={true}
                                    onChange={value => {
                                      // console.log(value);
                                      handleMulti(value)
                                    }}
                                    options={statusData.filter(
                                      status => status.status_type == "manual"
                                    )}
                                    className="select2-selection"
                                    isLoading={true}
                                  />
                                </div>
                              </Col>
                              <Col lg={6} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Industry")}
                                  </Label>
                                  <Select
                                    name="career_id"
                                    placeholder={t("Industry")}
                                    value={careerData.find(
                                      option =>
                                        option.value === formik.values.career_id
                                    )}
                                    onChange={item => {
                                      formik.setFieldValue(
                                        "career_id",
                                        item == null ? null : item.value
                                      )
                                    }}
                                    options={careerData}
                                    // isClearable
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={6} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Foreigner Registration No.")}
                                  </Label>
                                  <Input
                                    name="alien_registration_card_number"
                                    placeholder={t(
                                      "Foreigner Registration No."
                                    )}
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values
                                        .alien_registration_card_number || ""
                                    }
                                    invalid={
                                      formik.touched
                                        .alien_registration_card_number &&
                                      formik.errors
                                        .alien_registration_card_number
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched
                                    .alien_registration_card_number &&
                                  formik.errors
                                    .alien_registration_card_number ? (
                                    <FormFeedback type="invalid">
                                      {
                                        formik.errors
                                          .alien_registration_card_number
                                      }
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={6} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Residence Status")}
                                  </Label>
                                  <Select
                                    name="status_of_residence_id"
                                    placeholder={t("Residence Status")}
                                    value={statusOfResidenceData.find(
                                      option =>
                                        option.value ===
                                        formik.values.status_of_residence_id
                                    )}
                                    onChange={item => {
                                      formik.setFieldValue(
                                        "status_of_residence_id",
                                        item == null ? null : item.value
                                      )
                                    }}
                                    options={statusOfResidenceData}
                                    // isClearable
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={4} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Date of Issue")}
                                  </Label>
                                  <Input
                                    name="license_date"
                                    placeholder={t("Date of Issue")}
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.license_date || ""}
                                    invalid={
                                      formik.touched.license_date &&
                                      formik.errors.license_date
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.license_date &&
                                  formik.errors.license_date ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.license_date}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={4} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Expiry Date")}
                                  </Label>
                                  <Input
                                    name="expiration_date"
                                    type="date"
                                    autoComplete="off"
                                    placeholder={t("Expiry Date")}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.expiration_date || ""}
                                    invalid={
                                      formik.touched.expiration_date &&
                                      formik.errors.expiration_date
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.expiration_date &&
                                  formik.errors.expiration_date ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.expiration_date}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={4} className="gx-1">
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">
                                    {t("Entry date")}
                                  </Label>
                                  <Input
                                    name="entry_date"
                                    type="date"
                                    autoComplete="off"
                                    placeholder={t("Entry date")}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.entry_date || ""}
                                    invalid={
                                      formik.touched.entry_date &&
                                      formik.errors.entry_date
                                        ? true
                                        : false
                                    }
                                  />
                                  {formik.touched.entry_date &&
                                  formik.errors.entry_date ? (
                                    <FormFeedback type="invalid">
                                      {formik.errors.entry_date}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={12} className="gx-1">
                                <div className="mt-2">
                                  <Label className="form-label fw-bold">
                                    {t("Note")}
                                  </Label>
                                  <Input
                                    name="description"
                                    type="textarea"
                                    id="textarea"
                                    onChange={e => {
                                      textareachange(e)
                                      formik.setFieldValue(
                                        "description",
                                        e.target.value
                                      )
                                    }}
                                    value={formik.values.description || ""}
                                    maxLength="225"
                                    rows="3"
                                    placeholder={t("Note")}
                                  />
                                  {textareabadge ? (
                                    <span className="badgecount badge bg-success">
                                      {" "}
                                      {textcount} / 225{" "}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  {/* </CardBody>
                </Card> */}

                {!isEditIntern && (
                  <Card style={{ minWidth: "1100px", marginTop: "30px" }}>
                    <CardBody className="bg-light">
                      <h4 className="fw-bold">{t("Contact Information")}</h4>
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

                        {addressDataIntern.map((address, index) => {
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
                                            const arr = [...addressDataIntern]
                                            arr[index] = {
                                              ...arr[index],
                                              nation_id: item.value,
                                            }
                                            updateAddressDataIntern(arr)
                                          }}
                                          options={NationList}
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
                                            isEditIntern
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
                                            const arr = [...addressDataIntern]
                                            arr[index] = {
                                              ...arr[index],
                                              province_id: item.StateID,
                                            }
                                            updateAddressDataIntern(arr)
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
                                            isEditIntern
                                              ? districtOptions.find(
                                                  item =>
                                                    item.DistrictID ==
                                                    address.district_id
                                                )
                                              : ""
                                          }
                                          onChange={item => {
                                            setSelectDistrict(item)
                                            const arr = [...addressDataIntern]
                                            arr[index] = {
                                              ...arr[index],
                                              district_id: item.DistrictID,
                                            }
                                            updateAddressDataIntern(arr)
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
                                            isEditIntern
                                              ? communeOptions.find(
                                                  item =>
                                                    item.WardID ==
                                                    address.commune_id
                                                )
                                              : ""
                                          }
                                          onChange={item => {
                                            setSelectCommune(item)
                                            const arr = [...addressDataIntern]
                                            arr[index] = {
                                              ...arr[index],
                                              commune_id: item.WardID,
                                            }
                                            updateAddressDataIntern(arr)
                                          }}
                                          options={communeOptions}
                                          className="select2-selection"
                                          // isClearable
                                        />
                                      </div>
                                    </Col>

                                    <Col lg={3} sm={3} className="mt-2 fw-bold">
                                      <div className="mb-3">
                                        <Input
                                          name="detail"
                                          type="text"
                                          placeholder={t(
                                            "House Number, Street, etc."
                                          )}
                                          value={address.detail || ""}
                                          onChange={e => {
                                            const arr = [...addressDataIntern]
                                            arr[index] = {
                                              ...arr[index],
                                              detail: e.target.value,
                                            }
                                            updateAddressDataIntern(arr)
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

                {isEditIntern && (
                  // <Card>
                  //   <CardBody>
                  <>
                    {isRefresh && <AddressDatas item={item} user={user} />}
                    {!isRefresh && (
                      <div className="d-flex gap-3 mt-1 ">
                        <h4 className="fw-bold text-success">update data</h4>{" "}
                        <Spinner
                          type="grow"
                          size="sm"
                          className="ms-2 mt-1"
                          color="primary"
                        />{" "}
                      </div>
                    )}
                  </>
                  //   </CardBody>
                  // </Card>
                )}

                {/* </CardBody> */}
                {/* </Card> */}
              </Col>
            </Row>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                item = null
                formik.resetForm()
                setIsEditIntern(false)
                updateAddressDataIntern([])
                setselectedMultiStatus([])
                setOn(false)
                setSelectedFile(null)
                tog_fullscreen()
                setIsLogin(false)
                setIsHasAccount(false)
                setAccount(null)
              }}
              className="btn btn-secondary "
              style={{ minWidth: "80px" }}
              data-dismiss="modal"
            >
              {t("Cancel")}
            </button>
            <button
              type="button"
              className="btn btn-primary "
              onClick={handleSubmit}
              style={{ minWidth: "100px" }}
            >
              {t("Save")}
            </button>
            {/* <button
              onClick={() => {
                tog_resresh()
              }}
            >
              refresh
            </button> */}
          </div>
        </Modal>
      </Form>
    </>
  )
}

ModalDatas.propTypes = {
  t: PropTypes.any,
}

// export default ModalDatas;
export default withTranslation()(ModalDatas)
