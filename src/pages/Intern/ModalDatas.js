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
import moment from 'moment';

import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

// import context
import DataContext from "../../data/DataContext";
import avata from '../../assets/images/avata/avatar-null.png'

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  getProvinceByNationId, getDistrictByProvinceId, getCommuneByDistrictId, setAddress, uploadImageRequest, getDispatchingCompanyAll,
  getReceivingFactoryAll, getStatusAll, getCareerAll, getStatusOfResidenceAll, setAlienRegistrationCard, setStatusDetail, getAlienRegistrationCardAll, updateStatus, updateAlienRegistrationCard, updateStatusDetail
} from "store/actions";


const optionGroup = [
  { label: "Viet Nam", value: 1 },
  { label: "Japan", value: 2 },
];
const optionGender = [
  { label: "Male", value: 'male' },
  { label: "Female", value: 'female' },
];

//---------------------------------------------------------------------------------------------------------------------------------------------------//

const ModalDatas = ({ item, setApi, updateApi, addressData, alienCardData, statusDetailData, props }) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();

  // theo doi lua chon status
  const [selectedMultiStatus, setselectedMultiStatus] = useState([]);
  function handleMulti(selectedMultiStatus) {
    setselectedMultiStatus(selectedMultiStatus);
  }

  // Tao doi tuong luu bang the ngoai kieu
  const [alienCard, setAlienCard] = useState({
    key_license_id: 1,
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
    flag: 1
  });

  // Tao doi luong luu bang chi tiet trang thai

  const statusDetailObj = {
    key_license_id: 1,
    intern_id: null,
    status_id: null,
    description: null,
    create_at: null,
    create_by: 1,
    update_at: null,
    update_by: 1,
    delete_at: null,
    flag: 1
  };
  // const [statusDetailObj, setStatusDetailObj] = useState({
  //   key_license_id: 1,
  //   intern_id: null,
  //   status_id: null,
  //   description: null,
  //   create_at: null,
  //   create_by: 1,
  //   update_at: null,
  //   update_by: 1,
  //   delete_at: null,
  //   flag: 1
  // });

  // data context
  const { modal_fullscreen, setmodal_fullscreen, tog_fullscreen, isEditIntern, setIsEditIntern, addressIntern, addressDataIntern, updateAddressDataIntern} = useContext(DataContext)

  // Radio button
  const [selectAddressDefault, setSelectAddressDefault] = useState(0)
  const handleChangeDefault = (event) => {
    setSelectAddressDefault(event.target.value)
  }

  // kiem tra trang thai xem co duoc ghi dia chi 
  const [isCreateAddress, setIsCreateAddress] = useState(false);

  const { provinceDataByNationId, districtDataByProvinceId, communeDataByDistrictId, internCreate, companyData, factoryData, statusData, careerData, statusOfResidenceData, loadingIntern, alienCardDatas } = useSelector(state => (
    {
      provinceDataByNationId: state.Province.dataByNationId,
      districtDataByProvinceId: state.District.dataByProvinceId,
      communeDataByDistrictId: state.Commune.dataByDistrictId,
      internCreate: state.Intern.data,
      loadingIntern: state.Intern.loading,
      companyData: state.DispatchingCompany.datas,
      factoryData: state.ReceivingFactory.datas,
      statusData: state.Status.datas,
      careerData: state.Career.datas,
      statusOfResidenceData: state.StatusOfResidence.datas,
      alienCardDatas: state.AlienRegistrationCard.datas,
    }
  ), shallowEqual);

  // Get du lieu lan dau 
  useEffect(() => {
    dispatch(getDispatchingCompanyAll());
    dispatch(getReceivingFactoryAll());
    dispatch(getStatusAll());
    dispatch(getCareerAll());
    dispatch(getStatusOfResidenceAll());
    dispatch(getAlienRegistrationCardAll());
  }, [dispatch]);


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

  const [on, setOn] = useState(false)
  useEffect(() => {
    // console.log('chay ------------------------------------------------------------------------', on)
    if (item != null && on == false) {
      // console.log('chay ------------------------------------------------------------------------')
      const arr = statusDetailData.filter(sdd => sdd.intern_id == item.id);
      // console.log('arr', arr)
      arr.forEach(e => {
        const status = statusData.find(sd => sd.id == e.status_id);
        // console.log('status', status)
        if (status != null) {
          setselectedMultiStatus([...selectedMultiStatus, status]);
        }
      })

      const card = alienCardDatas.find(item =>  item.intern_id == item.id);
      console.log('card:', card)
      setAlienCard(card);

      setOn(true);
    }
  }, [item])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: item != null ? item.id : '',
      key_license_id: item != null ? item.key_license_id : 1,
      syndication_id: item != null ? item.syndication_id : 1,
      type: 'intern',
      avata: item != null ? item.avata : '',
      avata_update_at: item != null ? moment(item.date_of_joining_syndication).utcOffset('+07:00').format("YYYY-MM-DD") : null,
      first_name_jp: item != null ? item.first_name_jp : '',
      middle_name_jp: item != null ? item.middle_name_jp : '',
      last_name_jp: item != null ? item.last_name_jp : '',
      first_name_en: item != null ? item.first_name_en : '',
      middle_name_en: item != null ? item.middle_name_en : '',
      last_name_en: item != null ? item.last_name_en : '',
      gender: item != null ? item.gender : 'male',
      dob: item != null ? moment(item.date_of_joining_syndication).utcOffset('+07:00').format("YYYY-MM-DD") : null,
      career_id: item != null ? item.career_id : '',
      passport_code: item != null ? item.passport_code : '',
      passport_license_date: item != null ? moment(item.date_of_joining_syndication).utcOffset('+07:00').format("YYYY-MM-DD") : null,
      passport_expiration_date: item != null ? moment(item.date_of_joining_syndication).utcOffset('+07:00').format("YYYY-MM-DD") : null,
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
      alien_registration_card_number: item != null ? (alienCardData.find(i => i.intern_id == item.id) != null ? alienCardData.find(i => i.intern_id == item.id).card_number : '') : '', // số thẻ ngoại kiều
      status_of_residence_id: item != null ? (statusOfResidenceData.find(i => i.name == item.sor_name) != null ? statusOfResidenceData.find(i => i.name == item.sor_name).id : '') : '',  // Tư cách lưu trú
      // license_date: item != null ? moment(alienCardData.find(i => i.intern_id == item.id).license_date).utcOffset('+07:00').format("YYYY-MM-DD") : '',
      license_date: item != null ? (alienCardData.find(i => i.intern_id == item.id) != null ? moment(alienCardData.find(i => i.intern_id == item.id).license_date).utcOffset('+07:00').format("YYYY-MM-DD") : '') : '',
      expiration_date: item != null ? (alienCardData.find(i => i.intern_id == item.id) != null ? moment(alienCardData.find(i => i.intern_id == item.id).expiration_date).utcOffset('+07:00').format("YYYY-MM-DD") : '') : '',
      status_id: item != null ? (statusDetailData.filter(i => i.intern_id == item.id) != null ? statusDetailData.filter(i => i.intern_id == item.id) : '') : '' // trạng thái
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

        // Can phai tim xem cai status detail nao da co san de 
        const multiStatusDetail = selectedMultiStatus.map((status) => {
          return { ...statusDetailObj, status_id: status.id};
        });
        multiStatusDetail.forEach((st) => {
          dispatch(updateStatusDetail(st));
        });

        const newCrad = {...alienCard,card_number: value.alien_registration_card_number, status_of_residence_id: value.status_of_residence_id, license_date: value.license_date, expiration_date: value.expiration_date };
        dispatch(updateAlienRegistrationCard(newCrad));
        // update card 
        // const card = { ...alienCard, card_number: value.alien_registration_card_number, status_of_residence_id: value.status_of_residence_id, license_date: value.license_date, expiration_date: value.expiration_date };
        

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

        const card = { ...alienCard, card_number: value.alien_registration_card_number, status_of_residence_id: value.status_of_residence_id, license_date: value.license_date, expiration_date: value.expiration_date };
        setAlienCard(card);
        setIsCreateAddress(true);
      }
      


      // upload anh len server
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        dispatch(uploadImageRequest(formData));
        // dispatch(uploadFile(formData));
      }


      // formik.resetForm();
      console.log('submit done');
      tog_fullscreen();
    }
  });

  // thuc thi formik
  const handleSubmit = () => {
    console.log('submit');
    formik.handleSubmit();

    // console.log(multiStatus)
  }
  //---------------------------------------------------------------------------------------

  // Tai du lieu thanh pho 
  useEffect(() => {
    dispatch(getProvinceByNationId(formik.values.nation_id));
  }, [formik.values.nation_id])

  // nap du lieu cho dia chi neu la chinh sua
  useEffect(() => {
    // console.log('check');
    if (isEditIntern) {
      if (item !== null) {
        const arr = addressData.filter(address => address.object_id == item.id && address.user_type == 'intern');
        // console.log('arr', arr)
        updateAddressDataIntern(arr)
      }
    }
  }, [isEditIntern])

  //---------------------------------------------------------------------------------------------------------------
  // GHi du lieu dia chi vao database
  useEffect(() => {
    if (internCreate) {
      if (isCreateAddress && !loadingIntern) {
        const id = internCreate['id'];
        // console.log('id:', id);
        const newCard = { ...alienCard, intern_id: id };
        dispatch(setAlienRegistrationCard(newCard));


        const multiStatus = selectedMultiStatus.map((status) => {
          return { ...statusDetailObj, status_id: status.id, intern_id: id };
        });
        multiStatus.forEach((st) => {
          dispatch(setStatusDetail(st));
        })

        addressDataIntern.forEach((address, index) => {
          const newAddress = { ...address, object_id: id, is_default: selectAddressDefault == index ? 1 : 0 }
          dispatch(setAddress(newAddress));
        })
        setIsCreateAddress(false);
      }
    }
  }, [internCreate, isCreateAddress])
  //----------------------------------------------------------------------------------------------------------------

  // xu ly khi them form nhap dia chi
  const handleAddForm = () => {
    updateAddressDataIntern([...addressDataIntern, addressIntern])
  };

  // xu ly khi xoa form nhap dia chi
  const handleDeleteColumn = (getIndex) => {
    const arr = [...addressDataIntern];
    arr.splice(getIndex, 1);
    updateAddressDataIntern(arr);
  }

  //---------------------------------------------------------------------------------------

  // dem so ky tu o nhap note
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


  //---------------------------------------------------------------------------------------

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

  //---------------------------------------------------------------------------------------

  // Xu ly danh sach district
  const [districtOptions, setDistrictOptions] = useState([])
  useEffect(() => {
    if (selectProvince !== null) {
      dispatch(getDistrictByProvinceId(selectProvince.StateID));
      setSelectDistrict('');
    }
  }, [selectProvince]);

  useEffect(() => {
    if (districtDataByProvinceId !== null) {
      const data = districtDataByProvinceId.map(district => {
        return { ...district, label: district.DistrictName_ja, value: district.DistrictName_ja }
      })
      setDistrictOptions(data)
    }
  }, [districtDataByProvinceId]);

  //---------------------------------------------------------------------------------------
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
  //---------------------------------------------------------------------------------------






  // console.log('formik:', formik.values)
  // console.log('alienCardData:', alienCardData)
  // console.log('item:', item)
  // console.log('isEditIntern:', isEditIntern)
  // console.log('loadingIntern:', loadingIntern)
  console.log('selectedMultiStatus:', selectedMultiStatus)


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
          <div className="modal-header bg-primary">
            <h5
              className="modal-title mt-0"
              id="exampleModalFullscreenLabel"
            >
              {isEditIntern ? t('Edit') : t('Add Intern')}
            </h5>
            <button
              onClick={() => {
                setmodal_fullscreen(false);
                setIsEditIntern(false);
                setselectedMultiStatus([]);
                setOn(false);
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
                    {/* <CardBody> */}

                    <Card >
                      <CardBody className='bg-light'>
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
                                    src={showAvata}
                                  />
                                </div>
                                <CardTitle tag="h5" className='text-center mt-2'>
                                  Admin
                                </CardTitle>
                                <Button onClick={() => fileInputRef.current.click()}>
                                  {t('Upload Avata')}
                                </Button>{" "}
                                <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' hidden />
                              </CardBody>
                            </Card>
                          </Col>

                          <Col lg={6} xl={6} >
                            <Card className='h-100'>
                              <CardBody>
                                <Row >
                                  <Col lg={4} className='gx-1'>
                                    <div className="mb-3">
                                      <Label className="form-label fw-bold">{t('Last Name')}</Label>
                                      <Input
                                        name="first_name_jp"
                                        placeholder={t('Last Name')}
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
                                        placeholder={t('Last Name (English)')}
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
                                      <Label className="form-label fw-bold">{t('Middle Name')}</Label>
                                      <Input
                                        name="middle_name_jp"
                                        type="text"
                                        autoComplete="off"
                                        placeholder={t('Middle Name')}
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
                                        placeholder={t('Middle Name (English)')}
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
                                      <Label className="form-label fw-bold">{t('First Name')}</Label>
                                      <Input
                                        name="last_name_jp"
                                        type="text"
                                        autoComplete="off"
                                        placeholder={t('First Name')}
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
                                        placeholder={t('First Name (English)')}
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
                                      <Label className="form-label fw-bold">{t('Country')}</Label>
                                      <Select
                                        name='nation_id'
                                        placeholder={t('Country')}
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
                                      <Label className="form-label fw-bold">{t('Gender')}</Label>
                                      <Select
                                        name='gender'
                                        placeholder={t('Gender')}
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
                                      <Label className="form-label fw-bold">{t('Date of Birth')}</Label>
                                      <Input
                                        name="dob"
                                        placeholder={t('Date of Birth')}
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
                                      <Label className="form-label fw-bold">{t('Domestic Phone Number')}</Label>
                                      <Input
                                        name="phone_domestically"
                                        placeholder={t('Domestic Phone Number')}
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
                                      <Label className="form-label fw-bold">{t('Phone Number')}</Label>
                                      <Input
                                        name="phone_abroad"
                                        placeholder={t('Phone Number')}
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
                                      <Label className="form-label fw-bold">{t('Passport Number')}</Label>
                                      <Input
                                        name="passport_code"
                                        placeholder={t('Passport Number')}
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
                                      <Label className="form-label fw-bold">{t('Date of Issue')}</Label>
                                      <Input
                                        name="passport_license_date"
                                        placeholder={t('Date of Issue')}
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
                                      <Label className="form-label fw-bold">{t('Expiry Date')}</Label>
                                      <Input
                                        name="passport_expiration_date"
                                        placeholder={t('Expiry Date')}
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


                          <Col lg={5} xl={5} >
                            <Card className='h-100'>
                              <CardBody>
                                <Row>
                                  <Col lg={6} className='gx-1'>
                                    <div className="mb-3">
                                      <Label className="form-label fw-bold">{t('Dispatching Company')}</Label>
                                      <Select
                                        name='dispatching_company_id'
                                        placeholder={t('Dispatching Company')}
                                        value={companyData.find(option => option.value === formik.values.dispatching_company_id)}
                                        onChange={(item) => {
                                          formik.setFieldValue('dispatching_company_id', item.value);
                                        }}
                                        options={companyData}
                                      // isClearable
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={6} className='gx-1'>
                                    <div className="mb-3">
                                      <Label className="form-label fw-bold">{t('Receiving Company')}</Label>
                                      <Select
                                        name='receiving_factory_id'
                                        placeholder={t('Receiving Company')}
                                        value={factoryData.find(option => option.value === formik.values.receiving_factory_id)}
                                        onChange={(item) => {
                                          formik.setFieldValue('receiving_factory_id', item == null ? null : item.value);
                                        }}
                                        options={factoryData}
                                      // isClearable
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={6} className='gx-1'>
                                    <div className="mb-3">
                                      <Label className="form-label fw-bold">{t('Foreigner Registration No.')}</Label>
                                      <Input
                                        name="alien_registration_card_number"
                                        placeholder={t('Foreigner Registration No.')}
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
                                      <Label className="form-label fw-bold">{t('Residence Status')}</Label>
                                      <Select
                                        name='status_of_residence_id'
                                        placeholder={t('Residence Status')}
                                        value={statusOfResidenceData.find(option => option.value === formik.values.status_of_residence_id)}
                                        onChange={(item) => {
                                          formik.setFieldValue('status_of_residence_id', item == null ? null : item.value);
                                        }}
                                        options={statusOfResidenceData}
                                      // isClearable
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={6} className='gx-1'>
                                    <div className="mb-3">
                                      <Label className="form-label fw-bold">{t('Date of Issue')}</Label>
                                      <Input
                                        name="license_date"
                                        placeholder={t('Date of Issue')}
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
                                      <Label className="form-label fw-bold">{t('Expiry Date')}</Label>
                                      <Input
                                        name="expiration_date"
                                        type="date"
                                        autoComplete="off"
                                        placeholder={t('Expiry Date')}
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
                                    {/* <div className="mb-3">
                                        <Label className="form-label fw-bold">{t('Status')}</Label>
                                        <Select
                                          name='status_id'
                                          placeholder={t('Status')}
                                          value={statusData.find(option => option.value === formik.values.status_id)}
                                          onChange={(item) => {
                                            formik.setFieldValue('status_id', item == null ? null : item.value);
                                          }}
                                          options={statusData}
                                        // isClearable
                                        />
                                      </div> */}

                                    <div className="mb-3">
                                      <Label className="form-label fw-bold">{t('Status')}</Label>
                                      <Select
                                        placeholder={t('Status')}
                                        value={selectedMultiStatus}
                                        isMulti={true}
                                        onChange={(value) => {
                                          // console.log(value);
                                          handleMulti(value);
                                        }}
                                        options={statusData}
                                        className="select2-selection"
                                        isLoading={true}
                                      />
                                    </div>

                                  </Col>
                                  <Col lg={6} className='gx-1'>
                                    <div className="mb-3">
                                      <Label className="form-label fw-bold">{t('Industry')}</Label>
                                      <Select
                                        name='career_id'
                                        placeholder={t('Industry')}
                                        value={careerData.find(option => option.value === formik.values.career_id)}
                                        onChange={(item) => {
                                          formik.setFieldValue('career_id', item == null ? null : item.value);
                                        }}
                                        options={careerData}
                                      // isClearable
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={12} className='gx-1'>
                                    <div className="mt-2">
                                      <Label className="form-label fw-bold">{t('Note')}</Label>
                                      <Input
                                        name='description'
                                        type="textarea"
                                        id="textarea"
                                        onChange={e => {
                                          textareachange(e);
                                          formik.setFieldValue('description', e.target.value)
                                        }}
                                        value={formik.values.description || ''}
                                        maxLength="225"
                                        rows="3"
                                        placeholder={t('Note')}
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

                    {!isEditIntern && <Card>
                      <CardBody className='bg-light'>
                        <h4 className='fw-bold'>{t('Contact Information')}</h4>
                        <Row className='border border-secondary mt-3' >
                          <div>
                            <Row className='bg-secondary text-light'>
                              <Col lg={8} sm={8}>
                                <Row>
                                  <Col lg={2} className='text-center mt-2 fw-bold'>
                                    <p>{t('Branch')}</p>
                                  </Col>
                                  <Col lg={2} className='text-center mt-2 fw-bold'>
                                    <p>{t('Province')}</p>
                                  </Col>
                                  <Col lg={2} className='text-center mt-2 fw-bold'>
                                    <p>{t('District')}</p>
                                  </Col>
                                  <Col lg={2} className='text-center mt-2 fw-bold'>
                                    <p>{t('Ward')}</p>
                                  </Col>
                                  <Col lg={4} className='text-center mt-2 fw-bold'>
                                    <p>{t('House Number, Street, etc.')}</p>
                                  </Col>
                                </Row>
                              </Col>

                              <Col lg={1} sm={1} className='text-center mt-2 fw-bold'>
                                <p>{t('Phone Number')}</p>
                              </Col>
                              <Col lg={1} sm={1} className='text-center mt-2 fw-bold'>
                                <p>{t('Fax')}</p>
                              </Col>
                              <Col lg={2} sm={2} className='text-center mt-2 fw-bold'>
                                <Row>
                                  <Col lg={9}>
                                    <p>{t('Email')}</p>
                                  </Col>
                                  <Col lg={3}>
                                    <p>{t('Default address')}</p>
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
                                          placeholder={t('Branch')}
                                          onChange={(e) => {
                                            const arr = [...addressDataIntern];
                                            arr[index] = { ...arr[index], description: e.target.value }
                                            updateAddressDataIntern(arr);
                                          }}
                                          value={address.description || ''}
                                        />
                                      </div>

                                    </Col>

                                    <Col lg={2} className='mt-2'>
                                      <div className="mb-3">
                                        <Select
                                          name='province_id'
                                          placeholder={t('Province')}
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

                                    <Col lg={2} className='mt-2 '>
                                      <div className="mb-3">
                                        <Select
                                          name='district'
                                          placeholder={t('District')}
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

                                    <Col lg={2} className='mt-2'>
                                      <div className="mb-3">
                                        <Select
                                          name='commune'
                                          placeholder={t('Ward')}
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
                                          placeholder={t('House Number, Street, etc.')}
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
                                      placeholder={t('Phone Number')}
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
                                      placeholder={t('Fax')}
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
                                            placeholder={t('Email')}
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
                                          {t('Default address')}
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
                      </CardBody>

                    </Card>}

                    {/* </CardBody> */}
                  </Card>
                </Col>
              </Row>

            </Form>

          </div>


          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                tog_fullscreen();
                // formik.resetForm();
                setIsEditIntern(false);
                updateAddressDataIntern([]);
                setselectedMultiStatus([]);
                setOn(false);
                item = null;
              }}
              className="btn btn-secondary "
              style={{ minWidth: '80px' }}
              data-dismiss="modal"
            >
              {t('Cancel')}
            </button>
            <button
              type="button"
              className="btn btn-primary "
              onClick={handleSubmit}
              style={{ minWidth: '100px' }}
            >
              {t('Save')}
            </button>
          </div>
        </Modal>
      </Form>
    </>
  )
}

ModalDatas.propTypes = {
  t: PropTypes.any,
};

// export default ModalDatas;
export default withTranslation()(ModalDatas);