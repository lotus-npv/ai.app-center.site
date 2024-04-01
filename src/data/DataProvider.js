import React, { useState, useEffect } from "react"
import DataContext from "./DataContext"


const DataProvider = ({ children}) => {
  // get user info
  const [user, setUser] = useState(null)

  // socket io
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState();
  const [skTicket, setSkTicket] = useState("");
  const [updateUserCount, setUpdateUserCount] = useState()



  const updateViolateDatas = newData => {
    setViolateDatas(newData)
  }
    // address receiving fatory
    const addressSyndication = {
      key_license_id: null,
      user_type: "syndication",
      object_id: null,
      nation_id: 2,
      province_id: null,
      district_id: null,
      commune_id: null,
      detail: null,
      phone_number: null,
      email: null,
      fax: null,
      is_default: false,
      description: null,
      create_at: null,
      create_by: 1,
      update_at: null,
      update_by: 1,
      delete_at: null,
      flag: 1,
    }
    const [addressDataSyndication, setAddressDataSyndication] = useState([addressSyndication])
  
    const updateAddressDataSyndication = newData => {
      setAddressDataSyndication(newData)
    }

  // address receiving fatory
  const addressFactory = {
    key_license_id: null,
    user_type: "receiving_factory",
    object_id: null,
    nation_id: 2,
    province_id: null,
    district_id: null,
    commune_id: null,
    detail: null,
    phone_number: null,
    email: null,
    fax: null,
    is_default: false,
    description: null,
    create_at: null,
    create_by: 1,
    update_at: null,
    update_by: 1,
    delete_at: null,
    flag: 1,
  }
  const [addressDataFactory, setAddressDataFactory] = useState([addressFactory])

  const updateAddressDataFactory = newData => {
    setAddressDataFactory(newData)
  }
  // address dispatching company
  const addressCompany = {
    key_license_id: null,
    user_type: "dispatching_company",
    object_id: null,
    nation_id: 1,
    province_id: null,
    district_id: null,
    commune_id: null,
    detail: null,
    phone_number: null,
    email: null,
    fax: null,
    is_default: null,
    description: null,
    create_at: null,
    create_by: 1,
    update_at: null,
    update_by: 1,
    delete_at: null,
    flag: 1,
  }
  const [addressDataCompany, setAddressDataCompany] = useState([])

  const updateAddressDataCompany = newData => {
    setAddressDataCompany(newData)
  }

  // address intern
  const addressIntern = {
    key_license_id: null,
    user_type: "intern",
    object_id: null,
    nation_id: null,
    province_id: null,
    district_id: null,
    commune_id: null,
    detail: null,
    phone_number: null,
    email: null,
    fax: null,
    is_default: false,
    description: null,
    create_at: null,
    create_by: 1,
    update_at: null,
    update_by: 1,
    delete_at: null,
    flag: 1,
  }
  const [addressDataIntern, setAddressDataIntern] = useState([addressIntern])

  const updateAddressDataIntern = newData => {
    setAddressDataIntern(newData)
  }

  // get screen
  const screenAvailHeight = window.innerHeight
  const [vh, setVh] = useState(null)

  window.addEventListener("resize", function () {
    var screenHeight = window.innerHeight
    let wh = screenHeight - 250
    setVh(`${wh}px`)
    // setWindowHeight(screenHeight);
  })

  useEffect(() => {
    let wh = screenAvailHeight - 250
    setVh(`${wh}px`)
  }, [])

  const [modal_standard, setmodal_standard] = useState(false)
  const [modal_xlarge, setmodal_xlarge] = useState(false)
  const [modal_fullscreen, setmodal_fullscreen] = useState(false)
  const [modal_add_address, setmodal_add_address] = useState(false)

  function tog_standard() {
    setmodal_standard(!modal_standard)
    removeBodyCss()
  }

  function tog_xlarge() {
    setmodal_xlarge(!modal_xlarge)
    removeBodyCss()
  }

  function tog_fullscreen() {
    setmodal_fullscreen(!modal_fullscreen)
    removeBodyCss()
  }

  function tog_add_address() {
    setmodal_add_address(!modal_add_address)
    removeBodyCss()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  // edit Syndication
  const [isEditSyndication, setIsEditSyndication] = useState(false)
  // edit factory
  const [isEditFactory, setIsEditFactory] = useState(false)
  // edit company
  const [isEditCompany, setIsEditCompany] = useState(false)
  // edit intern
  const [isEditIntern, setIsEditIntern] = useState(false)
  // edit status
  const [isEditStatus, setIsEditStatus] = useState(false)
  // edit violate
  const [isEditViolate, setIsEditViolate] = useState(false)

  // select row table intern
  const [rowsSelectedInternData, setRowSelectedInternData] = useState([])

  // dashboard
  const [loadData, setLoadData] = useState(true)

  const UserTypeList = [
    {label: 'Thực tập sinh', value: 'intern'},
    {label: 'Nghiệp đoàn', value: 'syndication'},
    {label: 'Công ty phái cử', value: 'dispatching_company'},
    {label: 'Xí nghiệp tiếp nhận', value: 'receiving_factory'}
  ]

  const NationList = [
    { label: "Vietnam", value: 1, country: "Viet Nam", data: 0, violate: 2 },
    { label: "Japan", value: 2, country: "Nhat Ban", data: 0, violate: 4 },
    { label: "Korea", value: 3, country: "Han Quoc", data: 0, violate: 6 },
  ]

  // edit address
  const [isRefresh, setIsRefresh] = useState(true)
  const updateRefresh = value => {
    setIsRefresh(value)
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function tog_resresh() {
    updateRefresh(!isRefresh)
    await delay(4000)
    updateRefresh(isRefresh)
  }

  //Ticket
  const [isReponse, setIsReponse] = useState(false)
  const [modal, setmodal] = useState(false)
  const [ticketRowData, setTicketRowData] = useState(null)
  const [isEditTicket, setIsEditTicket] = useState(false)
  const [isInbox, setIsInbox] = useState(true)
  const [isOutbox, setIsOutbox] = useState(false)

  return (
    <DataContext.Provider
      value={{
        socket, setSocket,
        message, setMessage,
        skTicket, setSkTicket,
        updateUserCount, setUpdateUserCount,


        
        //----------//
        UserTypeList,
        addressSyndication,
        addressDataSyndication,
        updateAddressDataSyndication,
        addressFactory,
        addressDataFactory,
        updateAddressDataFactory,
        addressCompany,
        addressDataCompany,
        updateAddressDataCompany,
        addressIntern,
        addressDataIntern,
        updateAddressDataIntern,
        vh,
        modal_standard,
        setmodal_standard,
        tog_standard,
        modal_xlarge,
        setmodal_xlarge,
        tog_xlarge,
        modal_fullscreen,
        setmodal_fullscreen,
        tog_fullscreen,
        modal_add_address,tog_add_address,setmodal_add_address,
        isEditSyndication, setIsEditSyndication,
        isEditIntern,
        setIsEditIntern,
        isEditFactory,
        setIsEditFactory,
        isEditCompany,
        setIsEditCompany,
        isEditStatus,
        setIsEditStatus,
        isEditViolate,
        setIsEditViolate,
        rowsSelectedInternData,
        setRowSelectedInternData,
        NationList,
        loadData,
        setLoadData,
        isRefresh,
        updateRefresh,
        tog_resresh,
        isReponse,
        setIsReponse,
        modal,
        setmodal,
        ticketRowData,
        setTicketRowData,
        user, setUser,
        isEditTicket, setIsEditTicket,
        isInbox, setIsInbox,
        isOutbox, setIsOutbox
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
