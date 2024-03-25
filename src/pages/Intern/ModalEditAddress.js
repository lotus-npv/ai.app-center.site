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
} from "store/actions"

const optionGroup = [
  { label: "Viet Nam", value: 1 },
  { label: "Japan", value: 2 },
]

import moment from "moment"

const ModalEditAddress = ({address, isEditDetail}) => {
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
  } = useSelector(
    state => ({
      provinceDataByNationId: state.Province.dataByNationId,
      districtDataByProvinceId: state.District.dataByProvinceId,
      communeDataByDistrictId: state.Commune.dataByDistrictId,
    }),
    shallowEqual
  )

  // Get du lieu lan dau
  useEffect(() => {}, [dispatch])

  //   Xac dinh ham thuc thi
  const handleSave = () => {}

  // render lua chon tinh, huyen, xa

  const [selectNation, setSelectNation] = useState('')
  const [selectProvince, setSelectProvince] = useState('')
  const [selectDistrict, setSelectDistrict] = useState('')
  const [selectCommune, setSelectCommune] = useState('')
  const [detail, setDetail] = useState('')

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
                value={communeOptions.find(item => item.WardID == address.commune_id) || ''}
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
              tog_standard()
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
