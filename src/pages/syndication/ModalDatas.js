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
  Form,
  UncontrolledTooltip,
  Modal,
  CloseButton
} from "reactstrap";

import Select from "react-select";
import moment from 'moment';

import * as Yup from "yup";
import { useFormik } from "formik";

// import context
import DataContext from "../../data/DataContext";
import avata from '../../assets/images/users/avatar-1.jpg'

const optionGroup = [
  { label: "Mustard", value: "Mustard" },
  { label: "Ketchup", value: "Ketchup" },
  { label: "Relish", value: "Relish" }
];

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getProvinceByNationId, getDistrictByProvinceId, getCommuneByDistrictId, setAddress, uploadImageRequest, uploadFile } from "store/actions";

const ModalDatas = ({ item, setApi, updateApi, getApi, addressData }) => {
  const dispatch = useDispatch();

  // data context
  const { modal_fullscreen, setmodal_fullscreen, tog_fullscreen, isEditFactory, setIsEditFactory, addressFactory, addressDataFactory, updateAddressDataFactory, } = useContext(DataContext);


  // Radio button
  const [selectAddressDefault, setSelectAddressDefault] = useState(0)
  const handleChangeDefault = (event) => {
    setSelectAddressDefault(event.target.value)
  }

  // kiem tra trang thai xem co duoc ghi dia chi 
  const [isCreateAddress, setIsCreateAddress] = useState(false);

  const { provinceDataByNationId, districtDataByProvinceId, communeDataByDistrictId, factoryCreate, factoryData, factoryCreateLoading } = useSelector(state => (
    {
      provinceDataByNationId: state.Province.dataByNationId,
      districtDataByProvinceId: state.District.dataByProvinceId,
      communeDataByDistrictId: state.Commune.dataByDistrictId,
      factoryCreate: state.ReceivingFactory.data,
      factoryData: state.ReceivingFactory.datas,
      factoryCreateLoading: state.ReceivingFactory.loading,
    }
  ), shallowEqual)

  // Tai du lieu thanh pho 
  useEffect(() => {
    dispatch(getProvinceByNationId(1));
  }, [])

  // nap du lieu cho dia chi neu la chinh sua
  useEffect(() => {
    // console.log('check');
    if (isEditFactory) {
      const arr = addressData.filter(address => address.object_id == item.id && address.user_type == 'receiving_factory');
      console.log('arr', arr)
      updateAddressDataFactory(arr)
    }
  }, [isEditFactory])


  // xu ly form nhap anh
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAvata, setShowAvata] = useState(avata);
  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue('logo', file.name);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setShowAvata(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: item != null ? item.id : '',
      key_license_id: item != null ? item.key_license_id : 1,
      syndication_id: item != null ? item.syndication_id : 1,
      logo: item != null ? item.logo : 'avatar-null.png',
      name_jp: item != null ? item.name_jp : '',
      name_en: item != null ? item.name_en : '',
      tax_code: item != null ? item.tax_code : '',
      date_of_joining_syndication: item != null ? moment(item.date_of_joining_syndication).utcOffset('+07:00').format("YYYY-MM-DD") : '',
      description: item !== null ? item.description : '',
      create_at: item !== null ? item.create_at : '',
      create_by: item !== null ? item.create_by : 1,
      update_at: item !== null ? item.update_at : '',
      update_by: item !== null ? item.update_by : 1,

      // description_address: "",
    },
    validationSchema: Yup.object().shape({
      name_jp: Yup.string().required(
        "This value is required"
      ),
      name_en: Yup.string().required(
        "This value is required"
      ),
      date_of_joining_syndication: Yup.date().required(
        "Please select date"
      ),
      // description: Yup.string().required(
      //   "Please Enter Your Textarea"
      // ),
      // tax_code: Yup.string().required(
      //   "Please Enter Your Tax code"
      // ),
      // description_address: Yup.string().required(
      //   "Please Enter Your Textarea"
      // ),
      // email: Yup.string()
      //   .email("Must be a valid Email")
      //   .max(255)
      //   .required("Email is required"),
    }),

    onSubmit: async (value) => {

      if (isEditFactory) {
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
          flag: 1
        }
        dispatch(updateApi(obj));
      } else {
        let obj = {
          key_license_id: 1,
          syndication_id: 1,
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

      // dispatch(getApi());
      formik.resetForm();
      console.log('submit done');
      tog_fullscreen();
    }
  });

  useEffect(() => {
    if (factoryCreate != null) {
      const id = factoryCreate['id'];
      addressDataFactory.forEach((address, index) => {
        const newAddress = { ...address, object_id: id, is_default: selectAddressDefault == index ? 1 : 0 }
        if (id != null || id != undefined) {
          if (isCreateAddress) {
            dispatch(setAddress(newAddress));
          }
          setIsCreateAddress(false);
        }
      })
    }

  }, [factoryCreate])

  const handleSubmit = () => {
    console.log('submit');
    formik.handleSubmit();
  }

  // xu ly them form address
  const handleAddForm = () => {
    updateAddressDataFactory([...addressDataFactory, addressFactory])
  };

  const handleDeleteColumn = (getIndex) => {
    const arr = [...addressDataFactory];
    arr.splice(getIndex, 1);
    updateAddressDataFactory(arr);
  }


  // show so ky tu nhap 
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

  const [selectProvince, setSelectProvince] = useState(null)
  const [selectDistrict, setSelectDistrict] = useState(null)
  const [selectCommune, setSelectCommune] = useState(null)


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

  // console.log('provinceDataByNationId:', provinceDataByNationId);
  // console.log('provinceOptions:', provinceOptions);
  // console.log('districtOptions:', districtOptions)
  // console.log('selectAddressDefault:', selectAddressDefault)
  // console.log('formik:', formik.values)
  // console.log('selectAddressDefault:', selectAddressDefault)
  // console.log('addressDataFactory:', addressDataFactory)
  // console.log('isEditFactory:', isEditFactory)
  // console.log('selectedFile:', selectedFile);





  return (
    <>
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
            {isEditFactory ? `Chỉnh sửa xí nghiệp` : 'Thêm xí nghiệp'}
          </h5>
          <button
            onClick={() => {
              setmodal_fullscreen(false);
              setIsEditFactory(false);
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

                  <Form>
                    <Row>
                      <Col lg={1} xl={1} sm={3}>
                        <Card
                          style={{
                            width: '100%',
                           
                          }}
                        >
                          <CardBody className='d-flex flex-column bg-light'>
                            <div style={{ aspectRatio: 1, display: 'flex', justifyContent: 'center' }}>
                              <img
                                style={{ width: '90%', height: '90%' }}
                                className='rounded-circle img-thumbnail'
                                alt="avata"
                                src={isEditFactory ? `https://api.lotusocean-jp.com/uploads/${formik.values.logo}` : showAvata}
                              />
                            </div>

                            <CardTitle tag="h5" className='text-center mt-2'>
                              Admin
                            </CardTitle>
                            <Button onClick={() => fileInputRef.current.click()}>
                              {isEditFactory ? 'Change avata' : 'Set avata'}
                            </Button>{" "}
                            <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' hidden />
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={11} xl={11} sm={12}>
                        <Card className='bg-light h-100'>
                          <CardBody >
                            <Row>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">Tên xí nghiệp (Tiếng Nhật)</Label>
                                  <Input
                                    name="name_jp"
                                    placeholder="Nhập tên xí nghiệp (Tiếng Nhật)"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name_jp || ""}
                                    invalid={
                                      formik.touched.name_jp && formik.errors.name_jp ? true : false
                                    }
                                  />
                                  {formik.touched.name_jp && formik.errors.name_jp ? (
                                    <FormFeedback type="invalid">{formik.errors.name_jp}</FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">Tên xí nghiệp (Tiếng Anh)</Label>
                                  <Input
                                    name="name_en"
                                    type="text"
                                    placeholder="Nhập tên xí nghiệp (Tiếng Anh)"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name_en || ""}
                                    invalid={
                                      formik.touched.name_en && formik.errors.name_en ? true : false
                                    }
                                  />
                                  {formik.touched.name_en && formik.errors.name_en ? (
                                    <FormFeedback type="invalid">{formik.errors.name_en}</FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">Ngày gia nhập</Label>
                                  <Input
                                    name="date_of_joining_syndication"
                                    type="date"
                                    placeholder="Chọn ngày"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.date_of_joining_syndication || ""}
                                    invalid={
                                      formik.touched.date_of_joining_syndication && formik.errors.date_of_joining_syndication ? true : false
                                    }
                                  />
                                  {formik.touched.date_of_joining_syndication && formik.errors.date_of_joining_syndication ? (
                                    <FormFeedback type="invalid">{formik.errors.date_of_joining_syndication}</FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <Label className="form-label fw-bold">Mã số thuế</Label>
                                  <Input
                                    name="tax_code"
                                    placeholder="Nhập mã số thuế"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.tax_code || ""}
                                    invalid={
                                      formik.touched.tax_code && formik.errors.tax_code ? true : false
                                    }
                                  />
                                  {formik.touched.tax_code && formik.errors.tax_code ? (
                                    <FormFeedback type="invalid">{formik.errors.tax_code}</FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col>
                                <div className="mt-2">
                                  <Label className="form-label fw-bold">Ghi chú</Label>
                                  <Input
                                    name='description'
                                    type="textarea"
                                    id="textarea"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description || ""}
                                    maxLength="225"
                                    rows="3"
                                    placeholder="Nhập nội dung"
                                    invalid={
                                      formik.touched.description && formik.errors.description ? true : false
                                    }
                                  />
                                  {formik.touched.description && formik.errors.description ? (
                                    <FormFeedback type="invalid">{formik.errors.description}</FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>

                    {/* </Form> */}


                    {/* <Form> */}
                    <Card>
                    {!isEditFactory && <CardBody className='bg-light mt-2'>

                        <Row className='border border-secondary '>
                          <div>
                            <Row className='bg-secondary text-light'>
                              <Col lg={8}>
                                <Row>
                                  <Col lg={2} className='text-center mt-2 fw-bold'>
                                    <p>Quốc gia</p>
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

                              <Col lg={1} className='text-center mt-2 fw-bold'>
                                <p>Số điện thoại</p>
                              </Col>
                              <Col lg={1} className='text-center mt-2 fw-bold'>
                                <p>Fax</p>
                              </Col>
                              <Col lg={2} className='text-center mt-2 fw-bold'>
                                <Row>
                                  <Col lg={8}>
                                    <p>Email</p>
                                  </Col>
                                  <Col lg={4}>
                                    <p>Mặc định</p>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>

                          {addressDataFactory.map((address, index) => {
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
                                            const arr = [...addressDataFactory];
                                            arr[index] = { ...arr[index], description: e.target.value }
                                            updateAddressDataFactory(arr);
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
                                          defaultValue={provinceOptions.find(item => item.StateID == address.province_id) || ''}
                                          // value={isEditFactory ? provinceOptions.find(item => item.StateID == address.province_id) : ''}
                                          onChange={(item) => {
                                            setSelectProvince(item);
                                            const arr = [...addressDataFactory];
                                            arr[index] = { ...arr[index], province_id: item.StateID }
                                            updateAddressDataFactory(arr);
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
                                          // value={isEditFactory ? districtOptions.find(item => item.DistrictID == address.district_id) : ''}
                                          defaultValue={districtOptions.find(item => item.DistrictID == address.district_id) || ''}
                                          onChange={(item) => {
                                            setSelectDistrict(item);
                                            const arr = [...addressDataFactory];
                                            arr[index] = { ...arr[index], district_id: item.DistrictID }
                                            updateAddressDataFactory(arr);
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
                                          // value={isEditFactory ? communeOptions.find(item => item.WardID == address.commune_id) : ''}
                                          defaultValue={communeOptions.find(item => item.WardID == address.commune_id) || ''}
                                          onChange={(item) => {
                                            setSelectCommune(item);
                                            const arr = [...addressDataFactory];
                                            arr[index] = { ...arr[index], commune_id: item.WardID }
                                            updateAddressDataFactory(arr);
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
                                          value={address.detail || ""}
                                          onChange={(e) => {
                                            const arr = [...addressDataFactory];
                                            arr[index] = { ...arr[index], detail: e.target.value }
                                            updateAddressDataFactory(arr);
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
                                      value={address.phone_number || ""}
                                      onChange={(e) => {
                                        const arr = [...addressDataFactory];
                                        arr[index] = { ...arr[index], phone_number: e.target.value }
                                        updateAddressDataFactory(arr);
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
                                      value={address.fax || ""}
                                      onChange={(e) => {
                                        const arr = [...addressDataFactory];
                                        arr[index] = { ...arr[index], fax: e.target.value }
                                        updateAddressDataFactory(arr);
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
                                            onChange={(e) => {
                                              const arr = [...addressDataFactory];
                                              arr[index] = { ...arr[index], email: e.target.value }
                                              updateAddressDataFactory(arr);
                                            }}
                                            value={address.email || ""}
                                          />
                                        </div>
                                      </div>
                                    </Col>
                                    <Col lg={3} className='d-flex justify-content-center gap-2'>
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
                  </Form>

                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>


        <div className="modal-footer">
          <button
            type="button"
            onClick={() => {
              tog_fullscreen();
              formik.resetForm();
              setIsEditFactory(false);
              // updateAddressDataFactory([addressFactory])
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
    </>
  )
}

export default ModalDatas;