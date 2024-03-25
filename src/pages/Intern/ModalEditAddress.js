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
  setViolate,
  setViolateList,
  updateAlienRegistrationCard,
  getInternAllInfo,
} from "store/actions"

import moment from "moment"

const ModalEditAddress = () => {
  // data context
  const {
    tog_fullscreen,
    setIsEditIntern,
    tog_standard,
    modal_standard,
    setmodal_standard,
    modal_xlarge,
    tog_xlarge,
    setmodal_xlarge,
    rowsSelectedInternData,
    setRowSelectedInternData,
  } = useContext(DataContext)
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { violateListAddDone, loading, dataInternAll } = useSelector(
    state => ({
      violateListAddDone: state.ViolateList.data,
      loading: state.ViolateList.loading,
      dataInternAll: state.Intern.datas,
    }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(getInternAllInfo())
  }, [dispatch])

  //   Xac dinh ham thuc thi
  const handleSave = () => {}

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

  return (
    <>
      <Modal
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
                options={optionGroup}
                className="w-100"
              />
            </div>
            <div className="mb-3">
              <Select
                name="province_id"
                placeholder={t("Province")}
                // value={selectProvince || ""}
                defaultValue={
                  isEditIntern
                    ? provinceOptions.find(
                        item => item.StateID == address.province_id
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
      </Modal>
    </>
  )
}

export default ModalEditAddress
