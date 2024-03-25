import React, { useState, useEffect } from "react"
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

import map from "../../assets/images/icon/map.png"

const NationList = [
  { label: "Vietnam", value: 1, country: "Viet Nam", data: 0, violate: 2 },
  { label: "Japan", value: 2, country: "Nhat Ban", data: 0, violate: 4 },
  { label: "Korea", value: 3, country: "Han Quoc", data: 0, violate: 6 },
]

const AddressDatas = ({ item }) => {
  const addObj = {
    nation: "",
    province: "",
    district: "",
    commune: "",
  }
  const [addresss, setAddresss] = useState(addObj)

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
  } = useSelector(
    state => ({
      addressData: state.Address.datas,
      provinceDataId: state.Province.dataId,
      //   provinceDataAll: state.Province.datas,
      districtDataId: state.District.dataId,
      communeDataId: state.Commune.dataId,
      provinceLoading: state.Province.loading,
      districtLoading: state.District.loading,
      CommuneLoading: state.Commune.loading,
    }),
    shallowEqual
  )

  const [isReadData, setIsReadData] = useState(false)

  useEffect(() => {
    dispatch(getAddressAll())
    // dispatch(getProvinceId(1))
    // dispatch(getProvinceAll())
  }, [dispatch])

  useEffect(() => {
    if (addressData) {
      const arr = addressData.find(
        add => add.object_id == item.id && add.user_type == "intern"
      )

      if (arr) {
        console.log("arr", arr)
        dispatch(getProvinceId(arr.province_id))
        dispatch(getDistrictId(arr.district_id))
        dispatch(getCommuneId(arr.commune_id))

        setIsReadData(true)
      }

      //   setAddresss(arr)
    }
  }, [addressData])

  useEffect(() => {
    if (provinceDataId && districtDataId && communeDataId) {
      if (
        isReadData &&
        !provinceLoading &&
        !districtLoading &&
        !CommuneLoading
      ) {
        const arr = { ...addresss }
        arr.province = provinceDataId[0].StateName_ja
        arr.district = districtDataId[0].DistrictName_ja
        arr.commune = communeDataId[0].WardName_ja
        setAddresss(arr)
      }
      if (
        addresss.province != "" &&
        addresss.district != "" &&
        addresss.commune != ""
      ) {
        console.log("addresss", addresss)

        setIsReadData(false)
      }
    }
    // if(districtDataId) {
    //     if(isReadData && !districtLoading) {
    //         const arr = {...addresss};
    //         // console.log('districtDataId[0]', districtDataId[0])
    //         arr.district = districtDataId[0].DistrictName_ja;
    //         setAddresss([arr])
    //     }
    // }
    // if(communeDataId) {
    //     if(isReadData && !CommuneLoading) {
    //         const arr = {...addresss};
    //         arr.commune = communeDataId[0].WardName_ja;
    //         setAddresss(arr)
    //     }
    // }
    // if(addresss.province != '' && addresss.district != '' && addresss.commune != '') {
    //     setIsReadData(false);
    // }
  }, [provinceDataId, isReadData, districtDataId, communeDataId])

  // console.log('addresss', addresss)
  // console.log('provinceLoading', provinceLoading)
  //   console.log("provinceDataId", provinceDataId)
  //   console.log("districtDataId", districtDataId)
  //   console.log("communeDataId", communeDataId)

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
      <div className="col-12" key={address.id}>
        <div
          className={classNames(
            "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
            { "border-top-1 surface-border": index !== 0 }
          )}
        >
          <img
            className="w-6 sm:w-8rem xl:w-6rem shadow-2 block xl:block mx-auto border-round"
            src={map}
            alt={address.name}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-2">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{address.name}</div>
              <Rating value={address.rating} readOnly cancel={false}></Rating>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{address.category}</span>
                </span>
                <Tag
                  value={address.inventoryStatus}
                  severity={getSeverity(address)}
                ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${address.price}</span>
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                disabled={address.inventoryStatus === "OUTOFSTOCK"}
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
      {/* <DataView value={addresss} listTemplate={listTemplate} /> */}
    </div>
  )
}

export default AddressDatas
