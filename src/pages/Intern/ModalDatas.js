import React, { useState, useEffect, useContext, useRef } from 'react';
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
  UncontrolledTooltip,
  Modal,
  CloseButton,
  Form
} from "reactstrap";

import Switch from "react-switch";
import Select, { components } from 'react-select';

import * as Yup from "yup";
import { useFormik } from "formik";

// import context
import DataContext from "../../data/DataContext";
import avata from '../../assets/images/users/avatar-1.jpg'

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getProvinceByNationId, getDistrictByProvinceId, getCommuneByDistrictId, setAddress, uploadImageRequest,  } from "store/actions";


const optionGroup = [
  { label: "Viet Nam", value: 1 },
  { label: "Japan", value: 2 },
];
const optionGender = [
  { label: "Male", value: 'male' },
  { label: "Female", value: 'female' },
];



const ModalDatas = ({ item, setApi, updateApi, addressData }) => {

  const dispatch = useDispatch();

  // data context
  const { modal_fullscreen, setmodal_fullscreen, tog_fullscreen, isEditIntern, setIsEditIntern, addressIntern, addressDataIntern, updateAddressDataIntern, } = useContext(DataContext)

  // Radio button
  const [selectAddressDefault, setSelectAddressDefault] = useState(0)
  const handleChangeDefault = (event) => {
    setSelectAddressDefault(event.target.value)
  }

  // kiem tra trang thai xem co duoc ghi dia chi 
  const [isCreateAddress, setIsCreateAddress] = useState(false);

  const { provinceDataByNationId, districtDataByProvinceId, communeDataByDistrictId, companyCreate, companyData, companyCreateLoading } = useSelector(state => (
    {
      provinceDataByNationId: state.Province.dataByNationId,
      districtDataByProvinceId: state.District.dataByProvinceId,
      communeDataByDistrictId: state.Commune.dataByDistrictId,
      companyCreate: state.DispatchingCompany.data,
      companyData: state.DispatchingCompany.datas,
      companyCreateLoading: state.DispatchingCompany.loading,
    }
  ), shallowEqual)

  // xu ly form nhap anh
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAvata, setShowAvata] = useState(avata);
  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue('avata', file.name);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setShowAvata(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  console.log('selectedFile:', selectedFile);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: item != null ? item.id : '',
      key_license_id: item != null ? item.key_license_id : 1,
      syndication_id: item != null ? item.syndication_id : 1,
      type: 'intern',
      avata: item != null ? item.avata : '',
      avata_update_at: item != null ? item.avata_update_at : null,
      first_name_jp: item != null ? item.first_name_jp : '',
      middle_name_jp: item != null ? item.middle_name_jp : '',
      last_name_jp: item != null ? item.last_name_jp : '',
      first_name_en: item != null ? item.first_name_en : '',
      middle_name_en: item != null ? item.middle_name_en : '',
      last_name_en: item != null ? item.last_name_en : '',
      gender: item != null ? item.gender : 'male',
      dob: item != null ? item.dob : '',
      career_id: item != null ? item.career_id : '',
      passport_code: item != null ? item.passport_code : '',
      passport_license_date: item != null ? item.passport_license_date : '',
      passport_expiration_date: item != null ? item.passport_expiration_date : '',
      alert: item != null ? item.alert : 0,
      phone_domestically: item != null ? item.phone_domestically : '',
      phone_abroad: item != null ? item.phone_abroad : '',
      receiving_factory_id: item != null ? item.receiving_factory_id : '',
      dispatching_company_id: item != null ? item.dispatching_company_id : '',
      description: item != null ? item.description : '',
      create_at: item != null ? item.create_at : '',
      create_by: item != null ? item.create_by : 1,
      update_at: item != null ? item.update_at : '',
      update_by: item != null ? item.update_by : 1,

      nation_id: 1,
      status_of_residence_id: '', // trạng thái
      alien_registration_card_number: '', // số thẻ ngoại kiều
      status_of_residence_id: '',  // Tư cách lưu trú
      license_date: '',
      expiration_date: '',
      status_id: ''
    },
    validationSchema: Yup.object().shape({
      first_name_jp: Yup.string().required(
        "This value is required"
      ),
      last_name_jp: Yup.string().required(
        "This value is required"
      ),
      first_name_en: Yup.string().required(
        "This value is required"
      ),
      last_name_en: Yup.string().required(
        "This value is required"
      ),
      gender: Yup.string().required(
        "This value is required"
      ),
      dob: Yup.date().required(
        "Please select date"
      ),
      career_id: Yup.string().required(
        "This value is required"
      ),
      passport_code: Yup.string().required(
        "This value is required"
      ),
      passport_license_date: Yup.date().required(
        "Please select date"
      ),
      passport_expiration_date: Yup.date().required(
        "Please select date"
      ),
      // phone_domestically: Yup.string().required(
      //   "This value is required"
      // ),
      // phone_abroad: Yup.string().required(
      //   "This value is required"
      // ),
      receiving_factory_id: Yup.string().required(
        "This value is required"
      ),
      dispatching_company_id: Yup.string().required(
        "This value is required"
      ),

      license_date: Yup.date().required(
        "Please select date"
      ),
      expiration_date: Yup.date().required(
        "Please select date"
      ),

    }),

    onSubmit: async (value) => {

      if (isEditIntern) {
        let obj = {
          id: value.id,
          key_license_id: value.key_license_id,
          syndication_id: value.syndication_id,
          type: 'intern',
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
          flag: 1
        }
        dispatch(updateApi(obj));
        if (selectedFile) {
          const formData = new FormData();
          formData.append('image', selectedFile);
          dispatch(uploadImageRequest(formData));
          // dispatch(uploadFile(formData));
        }
      } else {
        let obj = {
          key_license_id: value.key_license_id,
          syndication_id: value.syndication_id,
          type: 'intern',
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
          flag: 1
        }
        dispatch(setApi(obj));
        setIsCreateAddress(true);
        // upload anh len server
        if (selectedFile) {
          const formData = new FormData();
          formData.append('image', selectedFile);
          dispatch(uploadImageRequest(formData));
          // dispatch(uploadFile(formData));
        }
      }


      // formik.resetForm();
      // console.log('submit done');
      tog_fullscreen();
    }
  });

  // Tai du lieu thanh pho 
  useEffect(() => {
    dispatch(getProvinceByNationId(formik.values.nation));
  }, [formik.values.nation])

  // nap du lieu cho dia chi neu la chinh sua
  useEffect(() => {
    // console.log('check');
    if (isEditIntern) {
      if (item !== null) {
        const arr = addressData.filter(address => address.object_id == item.id && address.user_type == 'intern');
        // console.log('arr', arr)
        updateAddressDataCompany(arr)
      }
    }
  }, [isEditIntern])

  // GHi du lieu dia chi vao database
  useEffect(() => {
    if (companyCreate != null) {
      const id = companyCreate['id'];
      addressDataIntern.forEach((address, index) => {
        const newAddress = { ...address, object_id: id, is_default: selectAddressDefault == index ? 1 : 0 }
        if (id != null || id != undefined) {
          if (isCreateAddress) {
            dispatch(setAddress(newAddress));
          }
          setIsCreateAddress(false);
        }
      })
    }
  }, [companyCreate])

  // thuc thi formik
  const handleSubmit = () => {
    console.log('submit');
    formik.handleSubmit();
  }

  // xu ly them form address
  const handleAddForm = () => {
    updateAddressDataIntern([...addressDataIntern, addressIntern])
  };

  const handleDeleteColumn = (getIndex) => {
    const arr = [...addressDataIntern];
    arr.splice(getIndex, 1);
    updateAddressDataIntern(arr);
  }



  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  function textareachange(event) {
    const count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    settextcount(event.target.value.length);
  }

  // render lua chon tinh, huyen, xa
  const [selectProvince, setSelectProvince] = useState(null)
  const [selectDistrict, setSelectDistrict] = useState(null)
  const [selectCommune, setSelectCommune] = useState(null)

  // tao danh sach lua chon tinh/thanh pho
  const [provinceOptions, setProvinceOptions] = useState([])
  useEffect(() => {
    if (provinceDataByNationId) {
      const data = provinceDataByNationId.map(province => {
        return { ...province, label: province.StateName_ja, value: province.StateName_ja }
      })
      setProvinceOptions(data)
    }
  }, [provinceDataByNationId])

  // Xu ly danh sach district
  const [districtOptions, setDistrictOptions] = useState([])

  useEffect(() => {
    if (selectProvince !== null) {
      dispatch(getDistrictByProvinceId(selectProvince.StateID));
      setSelectDistrict('');
    }
  }, [selectProvince])

  useEffect(() => {
    if (districtDataByProvinceId !== null) {
      const data = districtDataByProvinceId.map(district => {
        return { ...district, label: district.DistrictName_ja, value: district.DistrictName_ja }
      })
      setDistrictOptions(data)
    }
  }, [districtDataByProvinceId])

  // xu ly tai danh sach commune
  const [communeOptions, setCommuneOptions] = useState([])
  useEffect(() => {
    if (selectDistrict !== null) {
      dispatch(getCommuneByDistrictId(selectDistrict.DistrictID));
      setSelectCommune('');
    }
  }, [selectDistrict])

  useEffect(() => {
    if (communeDataByDistrictId !== null) {
      const data = communeDataByDistrictId.map(commune => {
        return { ...commune, label: commune.WardName_ja, value: commune.WardName_ja }
      })
      setCommuneOptions(data)
    }
  }, [communeDataByDistrictId])





  // console.log('formik:', formik.values)


  return (
    <>
      <Form>
        <Modal
          size="xl"
          isOpen={modal_fullscreen}
          toggle={() => {
            tog_fullscreen();
          }}
          className="modal-fullscreen"
        >
          <div className="modal-header">
            <h5
              className="modal-title mt-0"
              id="exampleModalFullscreenLabel"
            >
              {isEditIntern ? 'Sửa thông tin' : 'Thêm thực tập sinh'}
            </h5>
            <button
              onClick={() => {
                setmodal_fullscreen(false);
                setIsEditIntern(false);
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
            <Form>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>

                      <Card >
                        <CardBody>
                          <Row >
                            <Col lg={1} xl={1}>
                              <Card
                              // style={{ width: '90%' }}
                              >
                                <CardBody className='d-flex flex-column'>
                                  <div style={{ aspectRatio: 1 }}>
                                    <img
                                      style={{ width: '100%', height: '100%' }}
                                      className='rounded-circle img-thumbnail'
                                      alt="avata"
                                      src={selectedFile}
                                    />
                                  </div>
                                  <CardTitle tag="h5" className='text-center mt-2'>
                                    Admin
                                  </CardTitle>
                                  <Button onClick={() => fileInputRef.current.click()}>
                                    Tải ảnh
                                  </Button>{" "}
                                  <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' hidden />
                                </CardBody>
                              </Card>
                            </Col>

                            <Col lg={6} xl={6} className='h-100'>
                              <Card>
                                <CardBody>
                                  <Row >
                                    <Col lg={4} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Họ</Label>
                                        <Input
                                          name="first_name_jp"
                                          placeholder="Họ"
                                          type="text"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.first_name_jp || ""}
                                          invalid={
                                            formik.touched.first_name_jp && formik.errors.first_name_jp ? true : false
                                          }
                                        />
                                        {formik.touched.first_name_jp && formik.errors.first_name_jp ? (
                                          <FormFeedback type="invalid">{formik.errors.first_name_jp}</FormFeedback>
                                        ) : null}
                                      </div>

                                      <div className="mb-3">
                                        <Input
                                          name="first_name_en"
                                          type="text"
                                          autoComplete="off"
                                          placeholder="Họ (En)"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.first_name_en || ""}
                                          invalid={
                                            formik.touched.first_name_en && formik.errors.first_name_en ? true : false
                                          }
                                        />
                                        {formik.touched.first_name_en && formik.errors.first_name_en ? (
                                          <FormFeedback type="invalid">{formik.errors.first_name_en}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col lg={4} className='gx-1'>
                                      <div className="mb-3">
                                        <Label>Tên đệm</Label>
                                        <Input
                                          name="middle_name_jp"
                                          type="text"
                                          autoComplete="off"
                                          placeholder="Tên đệm"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.middle_name_jp || ""}
                                          invalid={
                                            formik.touched.middle_name_jp && formik.errors.middle_name_jp ? true : false
                                          }
                                        />
                                        {formik.touched.middle_name_jp && formik.errors.middle_name_jp ? (
                                          <FormFeedback type="invalid">{formik.errors.middle_name_jp}</FormFeedback>
                                        ) : null}
                                      </div>

                                      <div className="mb-3">
                                        <Input
                                          name="middle_name_en"
                                          placeholder="Tên đệm (En)"
                                          type="text"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.middle_name_en || ""}
                                          invalid={
                                            formik.touched.middle_name_en && formik.errors.middle_name_en ? true : false
                                          }
                                        />
                                        {formik.touched.middle_name_en && formik.errors.middle_name_en ? (
                                          <FormFeedback type="invalid">{formik.errors.middle_name_en}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col lg={4} className='gx-1'>
                                      <div className="mb-3">
                                        <Label>Tên</Label>
                                        <Input
                                          name="last_name_jp"
                                          type="text"
                                          autoComplete="off"
                                          placeholder="Tên"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.last_name_jp || ""}
                                          invalid={
                                            formik.touched.last_name_jp && formik.errors.last_name_jp ? true : false
                                          }
                                        />
                                        {formik.touched.last_name_jp && formik.errors.last_name_jp ? (
                                          <FormFeedback type="invalid">{formik.errors.last_name_jp}</FormFeedback>
                                        ) : null}
                                      </div>

                                      <div className="mb-3">
                                        <Input
                                          name="last_name_en"
                                          placeholder="Tên (En)"
                                          type="text"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.last_name_en || ""}
                                          invalid={
                                            formik.touched.last_name_en && formik.errors.last_name_en ? true : false
                                          }
                                        />
                                        {formik.touched.last_name_en && formik.errors.last_name_en ? (
                                          <FormFeedback type="invalid">{formik.errors.last_name_en}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row >
                                    <Col lg={4} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Quốc gia</Label>
                                        <Select
                                          name='nation_id'
                                          placeholder='Chọn quốc gia'
                                          value={optionGroup.find(option => option.value === formik.values.nation_id)}
                                          onChange={(item) => {
                                            formik.setFieldValue('nation_id', item.value);
                                          }}
                                          options={optionGroup}
                                        // components={{ Option: CustomOption }}
                                        // isClearable
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={4} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Giới tính</Label>
                                        <Select
                                          name='gender'
                                          placeholder='Chọn giới tính'
                                          value={optionGender.find(option => option.value === formik.values.gender)}
                                          onChange={(item) => {
                                            formik.setFieldValue('gender', item == null ? null : item.value);
                                          }}
                                          options={optionGender}
                                        // isClearable
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={4} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Ngày sinh</Label>
                                        <Input
                                          name="dob"
                                          placeholder="Chọn ngày sinh"
                                          type="date"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.dob || ""}
                                          invalid={
                                            formik.touched.dob && formik.errors.dob ? true : false
                                          }
                                        />
                                        {formik.touched.dob && formik.errors.dob ? (
                                          <FormFeedback type="invalid">{formik.errors.dob}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row >
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Số điện thoại trong nước</Label>
                                        <Input
                                          name="phone_domestically"
                                          placeholder="Nhập số điện thoại"
                                          type="text"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.phone_domestically || ""}
                                          invalid={
                                            formik.touched.phone_domestically && formik.errors.phone_domestically ? true : false
                                          }
                                        />
                                        {formik.touched.phone_domestically && formik.errors.phone_domestically ? (
                                          <FormFeedback type="invalid">{formik.errors.phone_domestically}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Số điện thoại ngoài nước</Label>
                                        <Input
                                          name="phone_abroad"
                                          placeholder="Nhập số điện thoại"
                                          type="text"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.phone_abroad || ""}
                                          invalid={
                                            formik.touched.phone_abroad && formik.errors.phone_abroad ? true : false
                                          }
                                        />
                                        {formik.touched.phone_abroad && formik.errors.phone_abroad ? (
                                          <FormFeedback type="invalid">{formik.errors.phone_abroad}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row >
                                    <Col lg={12} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Số hộ chiếu</Label>
                                        <Input
                                          name="passport_code"
                                          placeholder="Nhập số hộ chiếu"
                                          type="text"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.passport_code || ""}
                                          invalid={
                                            formik.touched.passport_code && formik.errors.passport_code ? true : false
                                          }
                                        />
                                        {formik.touched.passport_code && formik.errors.passport_code ? (
                                          <FormFeedback type="invalid">{formik.errors.passport_code}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row >
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Ngày cấp</Label>
                                        <Input
                                          name="passport_license_date"
                                          placeholder="Ngày cấp"
                                          type="date"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.passport_license_date || ""}
                                          invalid={
                                            formik.touched.passport_license_date && formik.errors.passport_license_date ? true : false
                                          }
                                        />
                                        {formik.touched.passport_license_date && formik.errors.passport_license_date ? (
                                          <FormFeedback type="invalid">{formik.errors.passport_license_date}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Ngày hết hạn</Label>
                                        <Input
                                          name="passport_expiration_date"
                                          placeholder="Ngày hết hạn"
                                          type="date"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.passport_expiration_date || ""}
                                          invalid={
                                            formik.touched.passport_expiration_date && formik.errors.passport_expiration_date ? true : false
                                          }
                                        />
                                        {formik.touched.passport_expiration_date && formik.errors.passport_expiration_date ? (
                                          <FormFeedback type="invalid">{formik.errors.passport_expiration_date}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </Col>


                            {/* <Col lg={1} className='d-flex justify-content-center'>
                          <div style={{ width: '2px', height: '100%' }} className='border border-left border-secondary'></div>
                        </Col> */}

                            <Col lg={5} xl={5} className=''>
                              <Card>
                                <CardBody>
                                  <Row>
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Công ty phái cử</Label>
                                        <Select
                                          name='dispatching_company_id'
                                          placeholder='Chọn công ty phái cử'
                                          value={optionGroup.find(option =>  option.value === formik.values.dispatching_company_id)}
                                          onChange={(item) => {
                                            formik.setFieldValue('dispatching_company_id', item.value);
                                          }}
                                          options={optionGroup}
                                        // isClearable
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Xí nghiệp tiếp nhận</Label>
                                        <Select
                                          name='receiving_factory_id'
                                          placeholder='Chọn xí nghiệp tiếp nhận'
                                          value={optionGroup.find(option => option.value === formik.values.receiving_factory_id)}
                                          onChange={(item) => {
                                            formik.setFieldValue('receiving_factory_id', item == null ? null : item.value);
                                          }}
                                          options={optionGroup}
                                        // isClearable
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Số thẻ ngoại kiều</Label>
                                        <Input
                                          name="alien_registration_card_number"
                                          placeholder="Nhập số thẻ ngoại kiều"
                                          type="text"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.alien_registration_card_number || ""}
                                          invalid={
                                            formik.touched.alien_registration_card_number && formik.errors.alien_registration_card_number ? true : false
                                          }
                                        />
                                        {formik.touched.alien_registration_card_number && formik.errors.alien_registration_card_number ? (
                                          <FormFeedback type="invalid">{formik.errors.alien_registration_card_number}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Tư cách lưu trú</Label>
                                        <Select
                                          name='status_of_residence_id'
                                          placeholder='Chọn tư cách lưu trú'
                                          value={optionGroup.find(option => option.value === formik.values.status_of_residence_id)}
                                          onChange={(item) => {
                                            formik.setFieldValue('status_of_residence_id', item == null ? null : item.value);
                                          }}
                                          options={optionGroup}
                                        // isClearable
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Ngày cấp</Label>
                                        <Input
                                          name="license_date"
                                          placeholder="Chọn ngày cấp"
                                          type="date"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.license_date || ""}
                                          invalid={
                                            formik.touched.license_date && formik.errors.license_date ? true : false
                                          }
                                        />
                                        {formik.touched.license_date && formik.errors.license_date ? (
                                          <FormFeedback type="invalid">{formik.errors.license_date}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label>Ngày hết hạn</Label>
                                        <Input
                                          name="expiration_date"
                                          type="date"
                                          autoComplete="off"
                                          placeholder="Chọn ngày hết hạn"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.expiration_date || ""}
                                          invalid={
                                            formik.touched.expiration_date && formik.errors.expiration_date ? true : false
                                          }
                                        />
                                        {formik.touched.expiration_date && formik.errors.expiration_date ? (
                                          <FormFeedback type="invalid">{formik.errors.expiration_date}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row className='mb-3'>
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Trạng thái</Label>
                                        <Select
                                          name='status_id'
                                          placeholder='Chọn trạng thái'
                                          value={optionGroup.find(option => option.value === formik.values.status_id)}
                                          onChange={(item) => {
                                            formik.setFieldValue('status_id', item == null ? null : item.value);
                                          }}
                                          options={optionGroup}
                                        // isClearable
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={6} className='gx-1'>
                                      <div className="mb-3">
                                        <Label className="form-label fw-bold">Ngành nghề</Label>
                                        <Select
                                          name='career_id'
                                          placeholder='Chọn ngành nghề'
                                          value={optionGroup.find(option => option.value === formik.values.career_id)}
                                          onChange={(item) => {
                                            formik.setFieldValue('career_id', item == null ? null : item.value);
                                          }}
                                          options={optionGroup}
                                        // isClearable
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col lg={12} className='gx-1'>
                                      <div className="mt-2">
                                        <Label className="form-label fw-bold">Ghi chú</Label>
                                        <Input
                                          name='description'
                                          type="textarea"
                                          id="textarea"
                                          onChange={e => {
                                            textareachange(e);
                                            formik.setFieldValue('description', e.target.value)
                                          }}
                                          maxLength="225"
                                          rows="3"
                                          placeholder="Nhập ghi chú"
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
                        </CardBody>
                      </Card>

                      <Card>
                        {!isEditIntern && <CardBody>

                          <Row className='border border-secondary mt-3' >
                            <div>
                              <Row className='bg-secondary text-light'>
                                <Col lg={8} sm={8}>
                                  <Row>
                                    <Col lg={2} className='text-center mt-2 fw-bold'>
                                      <p>Chi nhánh</p>
                                    </Col>
                                    <Col lg={2} className='text-center mt-2 fw-bold'>
                                      <p>Tỉnh</p>
                                    </Col>
                                    <Col lg={2} className='text-center mt-2 fw-bold'>
                                      <p>Quận/ Huyện</p>
                                    </Col>
                                    <Col lg={2} className='text-center mt-2 fw-bold'>
                                      <p>Xã/ Phường</p>
                                    </Col>
                                    <Col lg={4} className='text-center mt-2 fw-bold'>
                                      <p>Số nhà, đường, phố...</p>
                                    </Col>
                                  </Row>
                                </Col>

                                <Col lg={1} sm={1} className='text-center mt-2 fw-bold'>
                                  <p>Số điện thoại</p>
                                </Col>
                                <Col lg={1} sm={1} className='text-center mt-2 fw-bold'>
                                  <p>Fax</p>
                                </Col>
                                <Col lg={2} sm={2} className='text-center mt-2 fw-bold'>
                                  <Row>
                                    <Col lg={9}>
                                      <p>Email</p>
                                    </Col>
                                    <Col lg={3}>
                                      <p>Mặc định</p>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </div>

                            {addressDataIntern.map((address, index) => {
                              return (
                                <Row className='mt-2' key={index} id={"nested" + index}>
                                  <Col lg={8}>
                                    <Row>
                                      <Col lg={2} className='d-flex justify-content-center gap-2 mt-2'>

                                        <CloseButton className='mt-2' onClick={() => {
                                          handleDeleteColumn(index);
                                        }} />

                                        <div className="mb-3">
                                          <Input
                                            name="description_address"
                                            type="text"
                                            placeholder='Branch name'
                                            onChange={(e) => {
                                              const arr = [...addressDataIntern];
                                              arr[index] = { ...arr[index], description: e.target.value }
                                              updateAddressDataIntern(arr);
                                            }}
                                            value={address.description || ''}
                                          />
                                        </div>

                                      </Col>

                                      <Col lg={2} className='mt-2 fw-bold '>
                                        <div className="mb-3">
                                          <Select
                                            name='province_id'
                                            placeholder='Tỉnh'
                                            // value={selectProvince || ""}
                                            defaultValue={isEditIntern ? provinceOptions.find(item => item.StateID == address.province_id) : ''}
                                            // value={provinceOptions.find(item => item.StateID == address.province_id) || ''}
                                            onChange={(item) => {
                                              setSelectProvince(item);
                                              const arr = [...addressDataIntern];
                                              arr[index] = { ...arr[index], province_id: item.StateID }
                                              updateAddressDataIntern(arr);
                                            }}
                                            options={provinceOptions}
                                          // isClearable
                                          />
                                        </div>
                                      </Col>

                                      <Col lg={2} className='mt-2 fw-bold '>
                                        <div className="mb-3">
                                          <Select
                                            name='district'
                                            placeholder='Quận/Huyện'
                                            // value={districtOptions.find(item => item.DistrictID == address.district_id) || ''}
                                            defaultValue={isEditIntern ? districtOptions.find(item => item.DistrictID == address.district_id) : ''}
                                            onChange={(item) => {
                                              setSelectDistrict(item);
                                              const arr = [...addressDataIntern];
                                              arr[index] = { ...arr[index], district_id: item.DistrictID }
                                              updateAddressDataIntern(arr);
                                            }}
                                            options={districtOptions}
                                            className="select2-selection"
                                          // isClearable
                                          />
                                        </div>
                                      </Col>

                                      <Col lg={2} className='mt-2 fw-bold '>
                                        <div className="mb-3">
                                          <Select
                                            name='commune'
                                            placeholder='Xã/Phường'
                                            // value={communeOptions.find(item => item.WardID == address.commune_id) || ''}
                                            defaultValue={isEditIntern ? communeOptions.find(item => item.WardID == address.commune_id) : ''}
                                            onChange={(item) => {
                                              setSelectCommune(item);
                                              const arr = [...addressDataIntern];
                                              arr[index] = { ...arr[index], commune_id: item.WardID }
                                              updateAddressDataIntern(arr);
                                            }}
                                            options={communeOptions}
                                            className="select2-selection"
                                          // isClearable
                                          />
                                        </div>
                                      </Col>

                                      <Col lg={4} className='mt-2 fw-bold'>
                                        <div className="mb-3">
                                          <Input
                                            name="detail"
                                            type="text"
                                            placeholder='Số nhà, đường, phố...'
                                            value={address.detail || ''}
                                            onChange={(e) => {
                                              const arr = [...addressDataIntern];
                                              arr[index] = { ...arr[index], detail: e.target.value }
                                              updateAddressDataIntern(arr);
                                            }}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </Col>

                                  <Col lg={1} className='mt-2 fw-bold'>
                                    <div className="mb-3">
                                      <Input
                                        name="phone_number"
                                        type="text"
                                        placeholder='Điện thoại'
                                        value={address.phone_number || ''}
                                        onChange={(e) => {
                                          const arr = [...addressDataIntern];
                                          arr[index] = { ...arr[index], phone_number: e.target.value }
                                          updateAddressDataIntern(arr);
                                        }}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={1} className='mt-2 fw-bold'>
                                    <div className="mb-3">
                                      <Input
                                        name="fax"
                                        type="text"
                                        placeholder='Fax'
                                        value={address.fax || ''}
                                        onChange={(e) => {
                                          const arr = [...addressDataIntern];
                                          arr[index] = { ...arr[index], fax: e.target.value }
                                          updateAddressDataIntern(arr);
                                        }}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={2} className='mt-2'>
                                    <Row>
                                      <Col lg={9} className='text-center fw-bold gx-1'>
                                        <div className=" d-flex gap-1">
                                          <div>
                                            <Input
                                              name="email"
                                              type="email"
                                              placeholder='Email'
                                              value={address.email || ''}
                                              onChange={(e) => {
                                                const arr = [...addressDataIntern];
                                                arr[index] = { ...arr[index], email: e.target.value }
                                                updateAddressDataIntern(arr);
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </Col>
                                      <Col lg={3} className='d-flex justify-content-center'>
                                        <div className='ms-2'>
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="exampleRadios"
                                            id={`radio-${index}`}
                                            value={index}
                                            style={{ marginTop: '12px' }}
                                            onChange={handleChangeDefault}
                                          />
                                          <UncontrolledTooltip placement="top" target={`radio-${index}`}>
                                            Đặt làm mặc định
                                          </UncontrolledTooltip>
                                        </div>

                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              )
                            })}
                            <Row className='mb-2 mt-2'>
                              <Col lg={6} className='d-flex gap-2'>
                                <Button onClick={handleAddForm} color="secondary" className='ms-4'>
                                  <i className="mdi mdi-plus font-size-18" id="deletetooltip" />
                                </Button>
                              </Col>
                            </Row>
                          </Row>
                        </CardBody>}

                      </Card>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              {/* <div className="d-flex flex-wrap justify-content-end gap-2 mt-2">
                <Button type="submit" color="primary" >
                  Submit
                </Button>{" "}
                <Button type="reset" color="secondary" >
                  Cancel
                </Button>
              </div> */}

            </Form>

          </div>


          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                tog_fullscreen();
                // formik.resetForm();
                setIsEditIntern(false);
                updateAddressDataIntern([])
              }}
              className="btn btn-secondary "
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
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

export default ModalDatas;