import React, { useState, useEffect, useContext } from "react"
import { Button } from "primereact/button"
import { DataView } from "primereact/dataview"
import { Rating } from "primereact/rating"
import { Tag } from "primereact/tag"
import { classNames } from "primereact/utils"

import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  getAddressAll,
  getProvinceByNationId,
  getDistrictByProvinceId,
  getCommuneByDistrictId,
  getProvinceId,
  getDistrictId,
  getCommuneId,
  getProvinceAll,
} from "store/actions"

import ModalEditAddress from "./ModalEditAddress"
// import context
import DataContext from "../../../data/DataContext"
import { useTranslation } from "react-i18next"

import map from "../../../assets/images/icon/map.png"

const NationList = [
  { label: "Vietnam", value: 1, country: "Viet Nam", data: 0, violate: 2 },
  { label: "Japan", value: 2, country: "Nhat Ban", data: 0, violate: 4 },
  { label: "Korea", value: 3, country: "Han Quoc", data: 0, violate: 6 },
]

//====================================================================================================//

const AddressDatas = ({ item, user }) => {
  const { t } = useTranslation()

  const addObj = {
    nation: "",
    province: "",
    district: "",
    commune: "",
    detail: "",
  }

  const {
    tog_standard,
    modal_standard,
    setmodal_standard,
    isRefresh,
    updateRefresh,
  } = useContext(DataContext)

  const [isEditDetail, setIsEditDetail] = useState(false)

  const [selectAddress, setSelectAddress] = useState(null)
  const [addresss, setAddresss] = useState([])

  const dispatch = useDispatch()

  const {
    addressData,
    provinceDataId,
    districtDataId,
    communeDataId,
    provinceLoading,
    districtLoading,
    CommuneLoading,
    provinceDataAll,
    updateAddressLoading,
  } = useSelector(
    state => ({
      addressData: state.Address.datas,
      provinceDataId: state.Province.dataId,
      districtDataId: state.District.dataId,
      communeDataId: state.Commune.dataId,
      provinceLoading: state.Province.loading,
      districtLoading: state.District.loading,
      CommuneLoading: state.Commune.loading,
      updateAddressLoading: state.Address.loading,
    }),
    shallowEqual
  )

  useEffect(() => {
    if (user) {
      dispatch(getAddressAll(user.key_license_id))
    }
  }, [dispatch])

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (user) {
        dispatch(getAddressAll(user.key_license_id))
      }
    }, 5000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const [addressOriginal, setAddressOriginal] = useState([])

  const [isReadData, setIsReadData] = useState(false)
  const [isDispath, setIsDitpath] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (addressData) {
      // tim nhung dia chi cua user
      const arr = addressData.filter(
        add => add.object_id == item.id && add.user_type == item.type
      )

      if (arr && isDispath && index < arr.length) {
        // console.log("arr", arr)
        // console.log("index", index)
        setAddressOriginal(arr)

        // lay thong tin dia chi cua mang dia chi user
        dispatch(getProvinceId(arr[index].province_id))
        dispatch(getDistrictId(arr[index].district_id))
        dispatch(getCommuneId(arr[index].commune_id))

        // ghi các dia chi trong mang ra bien khac
        const array = [...addresss]

        // them 1 dia chi mac dinh moi
        array.push(addObj)

        console.log('array', array);

        // nap gia tri country
        if(array[index].nation) {
          array[index].nation = NationList.find(
            nation => nation.value == arr[index].nation_id
          )["country"]
        }
        
        array[index].detail = arr[index].detail

        setAddresss(array)
        setIsDitpath(false)
        setIsReadData(true)
      }

      if (provinceDataId && districtDataId && communeDataId && isReadData) {
        if (!provinceLoading && !districtLoading && !CommuneLoading) {
          console.log("check done")

          const arr = [...addresss]
          arr[index].province = provinceDataId[0].StateName_ja
          arr[index].district = districtDataId[0].DistrictName_ja
          arr[index].commune = communeDataId[0].WardName_ja

          setAddresss(arr)
        }

        if (
          addresss[index].province != "" &&
          addresss[index].district != "" &&
          addresss[index].commune != "" &&
          addresss[index].nation != "" &&
          addresss[index].detail != ""
        ) {
          //   console.log("addresss", addresss)
          setIsReadData(false)
          setIsDitpath(true)
          setIndex(index + 1)
        }
      }
    }
  }, [
    addressData,
    provinceDataId,
    isReadData,
    districtDataId,
    communeDataId,
    isRefresh,
  ])

  // console.log('user', user)
  // console.log('provinceLoading', provinceLoading)
  //   console.log("provinceDataId", provinceDataId)
  //   console.log("districtDataId", districtDataId)
  // console.log("communeDataId", communeDataId)
  //   console.log("isReadData", isReadData)
  // console.log("item", item)

  const getSeverity = address => {
    switch (address.inventoryStatus) {
      case "INSTOCK":
        return "success"

      case "LOWSTOCK":
        return "warning"

      case "OUTOFSTOCK":
        return "danger"

      default:
        return null
    }
  }

  //   console.log(item)

  const itemTemplate = (address, index) => {
    return (
      <div
        className="col-12 d-flex justify-content-center bg-light"
        key={index}
      >
        <div
          className={classNames(
            "flex flex-column xl:flex-row xl:align-items-center p-21 gap-4 col-10",
            { "border-top-1 surface-border": index !== 0 }
          )}
        >
          <img
            className="w-4 sm:w-4rem xl:w-3rem shadow-2 block xl:block mx-auto border-round"
            src={map}
            alt={address.name}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-1">
            <div className="flex flex-column align-items-center sm:align-items-start gap-1">
              <div className="text-2xl font-bold text-700">
                {address.nation}
              </div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{address.detail} -</span>
                  <span className="font-semibold">{address.commune} -</span>
                  <span className="font-semibold">{address.district} -</span>
                  <span className="font-semibold">{address.province} </span>
                </span>
                <Tag
                  value={address.province}
                  severity={getSeverity(address)}
                ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-row align-items-center align-self-center sm:align-items-center gap-3 sm:gap-2">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded"
                aria-label="Cancel"
                text
                rounded
                onClick={() => {
                  setSelectAddress(addressOriginal[index])
                  setIsEditDetail(true)
                  tog_standard()
                }}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const listTemplate = items => {
    if (!items || items.length === 0) return null

    let list = items.map((address, index) => {
      return itemTemplate(address, index)
    })

    return <div className="grid grid-nogutter">{list}</div>
  }

  return (
    <div className="card">
      <h3>{t("Address Info")}</h3>
      <DataView value={addresss} listTemplate={listTemplate} />
      {isEditDetail && (
        <ModalEditAddress
          address={selectAddress}
          isEditDetail={isEditDetail}
          setIsEditDetail={setIsEditDetail}
        />
      )}
    </div>
  )
}

export default AddressDatas
