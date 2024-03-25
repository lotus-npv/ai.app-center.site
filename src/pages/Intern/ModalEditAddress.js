import React, { useMemo, useState, useEffect, useContext } from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Modal,
  Label,
  Input,
  Button,
} from "reactstrap"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Avatar } from "primereact/avatar"
import { Button as ButtonPrime } from "primereact/button"

import Select from "react-select"
//Import Flatepicker
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"

import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

// import context
import DataContext from "../../data/DataContext"

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  getProvinceByNationId,
  getDistrictByProvinceId,
  getCommuneByDistrictId,
  setAddress,
  uploadImageRequest,
  getDispatchingCompanyAll,
  getReceivingFactoryAll,
  getStatusAll,
  getCareerAll,
  getStatusOfResidenceAll,
  setAlienRegistrationCard,
  setStatusDetail,
  getAlienRegistrationCardAll,
  updateStatus,
  updateAlienRegistrationCard,
  updateStatusDetail,
  deleteStatusDetail,
  getProvinceId,
  getDistrictId,
  getCommuneId,
} from "store/actions"

const optionGroup = [
  { label: "Viet Nam", value: 1 },
  { label: "Japan", value: 2 },
]

import moment from "moment"

const ModalEditAddress = ({address, isEditDetail, setIsEditDetail}) => {



  // data context
  const {
    tog_standard,
    modal_standard,
    setmodal_standard,
  } = useContext(DataContext)

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const {
    provinceDataByNationId,
    districtDataByProvinceId,
    communeDataByDistrictId,
    provinceDataId,
    districtDataId,
    communeDataId
  } = useSelector(
    state => ({
      provinceDataByNationId: state.Province.dataByNationId,
      districtDataByProvinceId: state.District.dataByProvinceId,
      communeDataByDistrictId: state.Commune.dataByDistrictId,
      provinceDataId: state.Province.dataId,
      districtDataId: state.District.dataId,
      communeDataId: state.Commune.dataId,
    }),
    shallowEqual
  )

  // Get du lieu lan dau
  useEffect(() => {
    dispatch(getProvinceByNationId(address.nation_id))
    dispatch(getDistrictByProvinceId(address.province_id))
    dispatch(getCommuneByDistrictId(address.district_id))
    dispatch(getProvinceId(address.province_id))
    dispatch(getDistrictId(address.district_id))
    dispatch(getCommuneId(address.commune_id))
  }, [dispatch, isEditDetail])

  //   Xac dinh ham thuc thi
  const handleSave = () => {
    address.nation_id = selectNation.value
  }

  // render lua chon tinh, huyen, xa
  const [selectNation, setSelectNation] = useState(optionGroup.find(item => item.value == address.nation_id))
  const [selectProvince, setSelectProvince] = useState(provinceDataId[0])
  const [selectDistrict, setSelectDistrict] = useState(districtDataId[0])
  const [selectCommune, setSelectCommune] = useState(communeDataId[0])

  const [provinceOptions, setProvinceOptions] = useState(provinceDataByNationId)
  const [districtOptions, setDistrictOptions] = useState(districtDataByProvinceId)
  const [communeOptions, setCommuneOptions] = useState(communeDataByDistrictId)


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
      setProvinceOptions(provinceDataByNationId)
    }
  }, [provinceDataByNationId])

  //---------------------------------------------------------------------------------------

  // Xu ly danh sach district
  useEffect(() => {
    if (selectProvince !== null) {
      dispatch(getDistrictByProvinceId(selectProvince.StateID))
      // setSelectDistrict("")
    }
  }, [selectProvince])

  useEffect(() => {
    if (districtDataByProvinceId !== null) {
      setDistrictOptions(districtDataByProvinceId)
    }
  }, [districtDataByProvinceId])

  //---------------------------------------------------------------------------------------
  // xu ly tai danh sach commune
  useEffect(() => {
    if (selectDistrict !== null) {
      dispatch(getCommuneByDistrictId(selectDistrict.DistrictID))
      // setSelectCommune("")
    }
  }, [selectDistrict])

  useEffect(() => {
    if (communeDataByDistrictId !== null) {
      setCommuneOptions(communeDataByDistrictId)
    }
  }, [communeDataByDistrictId])
  //---------------------------------------------------------------------------------------


  // console.log('address', address)
  console.log('communeDataId', communeDataId)
  // console.log('address', address)

  return (
    <>
      {isEditDetail && <Modal
        isOpen={modal_standard}
        toggle={() => {
          tog_standard()
        }}
      >
        <div className="modal-header bg-primary">
          <h4 className="modal-title mt-0 text-light" id="myModalLabel">
            Cập nhật trạng thái
          </h4>
          <button
            type="button"
            onClick={() => {
              setmodal_standard(false)
            }}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <Card>
          <CardBody>
            <div className="mb-3 w-100">
              <Select
                name="nation_id"
                placeholder={t("Country")}
                value={selectNation}
                onChange={item => {
                  setSelectNation(item)
                }}
                options={optionGroup}
                className="w-100"
              />
            </div>

            <div className="mb-3">
              <Select
                name="province_id"
                placeholder={t("Province")}
                value={selectProvince}
                onChange={item => {
                  setSelectProvince(item)
                }}
                options={provinceOptions}
                // isClearable
              />
            </div>

            <div className="mb-3">
              <Select
                name="district"
                placeholder={t("District")}
                value={selectDistrict}
                onChange={item => {
                  setSelectDistrict(item)
                }}
                options={districtOptions}
                className="select2-selection"
                // isClearable
              />
            </div>
            <div className="mb-3">
              <Select
                name="commune"
                placeholder={t("Ward")}
                value={selectCommune}
                onChange={item => {
                  setSelectCommune(item)
                }}
                options={communeOptions}
                className="select2-selection"
                // isClearable
              />
            </div>
            <div className="mb-3">
              <Input
                name="detail"
                type="text"
                placeholder={t("House Number, Street, etc.")}
                value={address != null ? address.detail : ""}
                onChange={e => {
                    address.detail = e.target.value;
                }}
              />
            </div>
          </CardBody>
        </Card>
        <div className="modal-footer">
          <button
            type="button"
            onClick={() => {
              tog_standard();
              setSelectNation(null)
              setSelectProvince(null)
              setSelectDistrict(null)
              setSelectCommune(null)
              setIsEditDetail(false)
            }}
            className="btn btn-secondary "
            data-dismiss="modal"
          >
            {t("Cancel")}
          </button>

          <button
            type="button"
            className="btn btn-primary "
            onClick={handleSave}
          >
            {t("Save")}
          </button>
        </div>
      </Modal>}
    </>
  )
}

export default ModalEditAddress
