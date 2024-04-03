import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

let config = {
  headers: {
      "Content-Type": "application/json",
  },
};

let config_upload_file = {
  headers: {
      'Content-Type': 'multipart/form-data'
  }
};

// demo api
export const getDemoData = () => get(url.GET_DEMO_DATA);

// career
export const getCareerDataAll = () => get(url.GET_CAREER_ALL);
export const getCareerDataId = (id) => get(`${url.GET_CAREER_ID}/${id}`,{ params: { id } }, config);
export const addNewDataCareer = data => post(url.SET_CAREER, data, config);
export const updateDataCareer = data => put(url.UPDATE_CAREER, data, config);
export const deleteDataCareer = (id) => del(`${url.DELETE_CAREER}/${id}`, { params: { id } }, config);


// Status
export const getStatusDataAll = () => get(url.GET_STATUS_ALL);
export const getStatusDataId = (id) => get(`${url.GET_STATUS_ID}/${id}`,{ params: { id } }, config);
export const addNewDataStatus = data => post(url.SET_STATUS, data, config);
export const updateDataStatus = data => put(url.UPDATE_STATUS, data, config);
export const deleteDataStatus = (id) => del(`${url.DELETE_STATUS}/${id}`, { params: { id } }, config);

// intern
export const getInternDataAll = () => get(url.GET_INTERN_ALL);
export const getInternDataAllInfo = () => get(url.GET_INTERN_ALLINFO);
export const getInternDataUserId = (id) => get(`${url.GET_INTERN_USERID}/${id}`,{ params: { id } }, config);
export const getInternDataKeyId = (id) => get(`${url.GET_INTERN_KEYID}/${id}`,{ params: { id } }, config);
export const getInternDataId = () => get(url.GET_INTERN_ID);
export const addNewDataIntern = data => post(url.SET_INTERN, data, config);
export const updateDataIntern = data => put(url.UPDATE_INTERN, data, config);
export const deleteDataIntern = (id) => del(`${url.DELETE_INTERN}/${id}`, { params: { id } }, config);

// syndication
export const getSyndicationDataAll = () => get(url.GET_SYNDICATION_ALL);
export const getSyndicationDataUserId = (id) => get(`${url.GET_SYNDICATION_USERID}/${id}`,{ params: { id } }, config);
export const getSyndicationDataId = () => get(url.GET_SYNDICATION_ID);
export const addNewDataSyndication = data => post(url.SET_SYNDICATION, data, config);
export const updateDataSyndication = data => put(url.UPDATE_SYNDICATION, data, config);
export const deleteDataSyndication = (id) => del(`${url.DELETE_SYNDICATION}/${id}`, { params: { id } }, config);

// receiving_factory
export const getReceivingFactoryDataAll = () => get(url.GET_RECEIVINGFACTORY_ALL);
export const getReceivingFactoryDataUserId = (id) => get(`${url.GET_RECEIVINGFACTORY_USERID}/${id}`,{ params: { id } }, config);
export const getReceivingFactoryDataId = () => get(url.GET_RECEIVINGFACTORY_ID);
export const addNewDataReceivingFactory = data => post(url.SET_RECEIVINGFACTORY, data, config);
export const updateDataReceivingFactory = data => put(url.UPDATE_RECEIVINGFACTORY, data, config);
export const deleteDataReceivingFactory = (id) => del(`${url.DELETE_RECEIVINGFACTORY}/${id}`, { params: { id } }, config);

// dispatching_company
export const getDispatchingCompanyDataAll = () => get(url.GET_DISPATCHINGCOMPANY_ALL);
export const getDispatchingCompanyDataUserId = (id) => get(`${url.GET_DISPATCHINGCOMPANY_USERID}/${id}`,{ params: { id } }, config);
export const getDispatchingCompanyDataId = () => get(url.GET_DISPATCHINGCOMPANY_ID);
export const addNewDataDispatchingCompany = data => post(url.SET_DISPATCHINGCOMPANY, data, config);
export const updateDataDispatchingCompany = data => put(url.UPDATE_DISPATCHINGCOMPANY, data, config);
export const deleteDataDispatchingCompany = (id) => del(`${url.DELETE_DISPATCHINGCOMPANY}/${id}`, { params: { id } }, config);

// address
export const getAddressDataAll = (id) => get(`${url.GET_ADDRESS_ALL}/${id}`,{ params: { id } }, config);
export const getAddressDataId = () => get(url.GET_ADDRESS_ID);
export const addNewDataAddress = data => post(url.SET_ADDRESS, data, config);
export const updateDataAddress = data => put(url.UPDATE_ADDRESS, data, config);
export const deleteDataAddress = (id) => del(`${url.DELETE_ADDRESS}/${id}`, { params: { id } }, config);

// alien_registration_card
export const getAlienRegistrationCardDataAll = () => get(url.GET_ALIENREGISTRATIONCARD_ALL);
export const getAlienRegistrationCardDataAllInfo = () => get(url.GET_ALIENREGISTRATIONCARD_ALLINFO);
export const getAlienRegistrationCardDataId = () => get(url.GET_ALIENREGISTRATIONCARD_ID);
export const addNewDataAlienRegistrationCard = data => post(url.SET_ALIENREGISTRATIONCARD, data, config);
export const updateDataAlienRegistrationCard = data => put(url.UPDATE_ALIENREGISTRATIONCARD, data, config);
export const deleteDataAlienRegistrationCard = (id) => del(`${url.DELETE_ALIENREGISTRATIONCARD}/${id}`, { params: { id } }, config);

// status_of_residence
export const        getStatusOfResidenceDataAll = () =>     get(url.GET_STATUSOFRESIDENCE_ALL);
export const        getStatusOfResidenceDataId = (id) => get(`${url.GET_STATUSOFRESIDENCE_ID}/${id}`,{ params: { id } }, config);
export const addNewDataStatusOfResidence = data =>         post(url.SET_STATUSOFRESIDENCE, data, config);
export const updateDataStatusOfResidence = data =>       put(url.UPDATE_STATUSOFRESIDENCE, data, config);
export const deleteDataStatusOfResidence = (id) =>    del(`${url.DELETE_STATUSOFRESIDENCE}/${id}`, { params: { id } }, config);
// status_detail
export const        getStatusDetailDataAll = () =>     get(url.GET_STATUSDETAIL_ALL);
export const        getStatusDetailDataId = (id) => get(`${url.GET_STATUSDETAIL_ID}/${id}`,{ params: { id } }, config);
export const addNewDataStatusDetail = data =>         post(url.SET_STATUSDETAIL, data, config);
export const updateDataStatusDetail = data =>       put(url.UPDATE_STATUSDETAIL, data, config);
export const deleteDataStatusDetail = (id) =>    del(`${url.DELETE_STATUSDETAIL}/${id}`, { params: { id } }, config);
// violate_list
export const        getViolateListDataAll = () =>     get(url.GET_VIOLATELIST_ALL);
export const        getViolateListDataId = (id) => get(`${url.GET_VIOLATELIST_ID}/${id}`,{ params: { id } }, config);
export const addNewDataViolateList = data =>         post(url.SET_VIOLATELIST, data, config);
export const updateDataViolateList = data =>       put(url.UPDATE_VIOLATELIST, data, config);
export const deleteDataViolateList = (id) =>    del(`${url.DELETE_VIOLATELIST}/${id}`, { params: { id } }, config);
// violate
export const        getViolateDataAll = () =>     get(url.GET_VIOLATE_ALL);
export const        getViolateDataUserId = (id) =>     get(`${url.GET_VIOLATE_USERID}/${id}`,{ params: { id } }, config);
export const        getViolateDataId = (id) => get(`${url.GET_VIOLATE_ID}/${id}`,{ params: { id } }, config);
export const addNewDataViolate = data =>         post(url.SET_VIOLATE, data, config);
export const updateDataViolate = data =>       put(url.UPDATE_VIOLATE, data, config);
export const deleteDataViolate = (id) =>    del(`${url.DELETE_VIOLATE}/${id}`, { params: { id } }, config);
// violate_type
export const        getViolateTypeDataAll = () =>     get(url.GET_VIOLATETYPE_ALL);
export const        getViolateTypeDataId = (id) => get(`${url.GET_VIOLATETYPE_ID}/${id}`,{ params: { id } }, config);
export const addNewDataViolateType = data =>         post(url.SET_VIOLATETYPE, data, config);
export const updateDataViolateType = data =>       put(url.UPDATE_VIOLATETYPE, data, config);
export const deleteDataViolateType = (id) =>    del(`${url.DELETE_VIOLATETYPE}/${id}`, { params: { id } }, config);
// ticket
export const        getTicketDataAll = () =>     get(url.GET_TICKET_ALL);
export const        getTicketDataAllInfo = () =>     get(url.GET_TICKET_ALLINFO);
export const        getTicketDataUserId = (id) =>     get(`${url.GET_TICKET_USERID}/${id}`,{ params: { id } }, config);
export const        getTicketDataId = (id) => get(`${url.GET_TICKET_ID}/${id}`,{ params: { id } }, config);
export const addNewDataTicket = data =>         post(url.SET_TICKET, data, config);
export const updateDataTicket = data =>       put(url.UPDATE_TICKET, data, config);
export const deleteDataTicket = (id) =>    del(`${url.DELETE_TICKET}/${id}`, { params: { id } }, config);
// ticket_detail
export const        getTicketDetailDataAll = () =>     get(url.GET_TICKETDETAIL_ALL);
export const        getTicketDetailDataByTicketId = (id) => get(`${url.GET_TICKETDETAIL_BY_TICKET_ID}/${id}`,{ params: { id } }, config);
export const        getTicketDetailDataId = (id) => get(`${url.GET_TICKETDETAIL_ID}/${id}`,{ params: { id } }, config);
export const addNewDataTicketDetail = data =>         post(url.SET_TICKETDETAIL, data, config);
export const updateDataTicketDetail = data =>       put(url.UPDATE_TICKETDETAIL, data, config);
export const deleteDataTicketDetail = (id) =>    del(`${url.DELETE_TICKETDETAIL}/${id}`, { params: { id } }, config);
// positions
export const        getPositionsDataAll = () =>     get(url.GET_POSITIONS_ALL);
export const        getPositionsDataId = (id) => get(`${url.GET_POSITIONS_ID}/${id}`,{ params: { id } }, config);
export const addNewDataPositions = data =>         post(url.SET_POSITIONS, data, config);
export const updateDataPositions = data =>       put(url.UPDATE_POSITIONS, data, config);
export const deleteDataPositions = (id) =>    del(`${url.DELETE_POSITIONS}/${id}`, { params: { id } }, config);
// employee
export const        getEmployeeDataAll = () =>     get(url.GET_EMPLOYEE_ALL);
export const        getEmployeeDataId = (id) => get(`${url.GET_EMPLOYEE_ID}/${id}`,{ params: { id } }, config);
export const addNewDataEmployee = data =>         post(url.SET_EMPLOYEE, data, config);
export const updateDataEmployee = data =>       put(url.UPDATE_EMPLOYEE, data, config);
export const deleteDataEmployee = (id) =>    del(`${url.DELETE_EMPLOYEE}/${id}`, { params: { id } }, config);
// permission
export const        getPermissionDataAll = () =>     get(url.GET_PERMISSION_ALL);
export const        getPermissionDataId = (id) => get(`${url.GET_PERMISSION_ID}/${id}`,{ params: { id } }, config);
export const addNewDataPermission = data =>         post(url.SET_PERMISSION, data, config);
export const updateDataPermission = data =>       put(url.UPDATE_PERMISSION, data, config);
export const deleteDataPermission = (id) =>    del(`${url.DELETE_PERMISSION}/${id}`, { params: { id } }, config);
// users
export const        getUsersDataAll = () =>     get(url.GET_USERS_ALL);
export const        getUsersDataId = (id) => get(`${url.GET_USERS_ID}/${id}`,{ params: { id } }, config);
export const     getUsersDataLogin = (username, password) => get(`${url.GET_USERS_LOGIN}?username=${username}&password=${password}` ,config);
export const     getUsersDataUserIdAndType = (id, type) => get(`${url.GET_USERS_USER_ID_AND_TYPE}?id=${id}&type=${type}` ,config);
export const addNewDataUsers = data =>         post(url.SET_USERS, data, config);
export const updateDataUsers = data =>       put(url.UPDATE_USERS, data, config);
export const deleteDataUsers = (id) =>    del(`${url.DELETE_USERS}/${id}`, { params: { id } }, config);
// key_license
export const        getKeyLicenseDataAll = () =>     get(url.GET_KEYLICENSE_ALL);
export const        getKeyLicenseDataId = (id) => get(`${url.GET_KEYLICENSE_ID}/${id}`,{ params: { id } }, config);
export const addNewDataKeyLicense = data =>         post(url.SET_KEYLICENSE, data, config);
export const updateDataKeyLicense = data =>       put(url.UPDATE_KEYLICENSE, data, config);
export const deleteDataKeyLicense = (id) =>    del(`${url.DELETE_KEYLICENSE}/${id}`, { params: { id } }, config);
// avata
export const        getAvataDataAll = () =>     get(url.GET_AVATA_ALL);
export const        getAvataDataId = (id) => get(`${url.GET_AVATA_ID}/${id}`,{ params: { id } }, config);
export const addNewDataAvata = data =>         post(url.SET_AVATA, data, config);
export const updateDataAvata = data =>       put(url.UPDATE_AVATA, data, config);
export const deleteDataAvata = (id) =>    del(`${url.DELETE_AVATA}/${id}`, { params: { id } }, config);
//upload avata
export const uploadDataAvata = data =>         post(url.UPLOAD_AVATA, data, config_upload_file);

// nation
export const        getNationDataAll = () =>     get(url.GET_NATION_ALL);
export const        getNationDataId = (id) => get(`${url.GET_NATION_ID}/${id}`,{ params: { id } }, config);
export const addNewDataNation = data =>         post(url.SET_NATION, data, config);
export const updateDataNation = data =>       put(url.UPDATE_NATION, data, config);
export const deleteDataNation = (id) =>    del(`${url.DELETE_NATION}/${id}`, { params: { id } }, config);

// province
export const        getProvinceDataAll = () =>     get(url.GET_PROVINCE_ALL);
export const        getProvinceDataId = (id) => get(`${url.GET_PROVINCE_ID}/${id}`, config);
export const        getProvinceByNationDataId = (id) => get(`${url.GET_PROVINCE_BY_NATION_ID}/${id}`, config);
export const addNewDataProvince = data =>         post(url.SET_PROVINCE, data, config);
export const updateDataProvince = data =>       put(url.UPDATE_PROVINCE, data, config);
export const deleteDataProvince = (id) =>    del(`${url.DELETE_PROVINCE}/${id}`, { params: { id } }, config);

// district
export const        getDistrictDataAll = () =>     get(url.GET_DISTRICT_ALL);
export const        getDistrictDataId = (id) => get(`${url.GET_DISTRICT_ID}/${id}`,{ params: { id } }, config);
export const        getDistrictByProvinceDataId = (id) => get(`${url.GET_DISTRICT_BY_PROVINCE_ID}/${id}`,{ params: { id } }, config);
export const addNewDataDistrict = data =>         post(url.SET_DISTRICT, data, config);
export const updateDataDistrict = data =>       put(url.UPDATE_DISTRICT, data, config);
export const deleteDataDistrict = (id) =>    del(`${url.DELETE_DISTRICT}/${id}`, { params: { id } }, config);

// commune
export const        getCommuneDataAll = () =>     get(url.GET_COMMUNE_ALL);
export const        getCommuneDataId = (id) => get(`${url.GET_COMMUNE_ID}/${id}`,{ params: { id } }, config);
export const        getCommuneByDistrictDataId = (id) => get(`${url.GET_COMMUNE_BY_DISTRICT_ID}/${id}`,{ params: { id } }, config);
export const addNewDataCommune = data =>         post(url.SET_COMMUNE, data, config);
export const updateDataCommune = data =>       put(url.UPDATE_COMMUNE, data, config);
export const deleteDataCommune = (id) =>    del(`${url.DELETE_COMMUNE}/${id}`, { params: { id } }, config);

// notification
export const getNotiDataAll = (id) =>      get(`${url.GET_NOTI_ALL}/${id}`,{ params: { id } }, config);
export const getNotiDataByUserId = (id) => get(`${url.GET_NOTI_BY_USER_ID}/${id}`,{ params: { id } }, config);
export const addNewDataNoti = (data) =>       post(url.SET_NOTI, data, config);
export const updateDataNoti = (data) =>       put(url.UPDATE_NOTI, data, config);


// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
const postFakeRegister = data => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data;
      throw response.data;
    })
    .catch(err => {
      let message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data);

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data);

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data);

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data;
      throw response.data;
    })
    .catch(err => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data);

// get Products
export const getProducts = () => get(url.GET_PRODUCTS);

// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } });

// get Events
export const getEvents = () => get(url.GET_EVENTS);

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } });

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES);

// get chats
export const getChats = () => get(url.GET_CHATS);

// get groups
export const getGroups = () => get(url.GET_GROUPS);

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS);

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// post messages
export const getselectedmails = (selectedmails) => post(url.GET_SELECTED_MAILS, selectedmails);

//post setfolderonmails
export const setfolderonmails = (selectedmails, folderId, activeTab) => post(url.SET_FOLDER_SELECTED_MAILS, { selectedmails, folderId, activeTab });

// get orders
export const getOrders = () => get(url.GET_ORDERS);

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order);

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order);

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } });

// get cart data
export const getCartData = () => get(url.GET_CART_DATA);

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS);

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer);

// update CUSTOMER
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer);

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } });

// get shops
export const getShops = () => get(url.GET_SHOPS);

// get wallet
export const getWallet = () => get(url.GET_WALLET);

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS);

// get crypto product
export const getCryptoProduct = () => get(url.GET_CRYPTO_PRODUCTS);

// get invoices
export const getInvoices = () => get(url.GET_INVOICES);

// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } });

// get jobs
export const getJobList = () => get(url.GET_JOB_LIST);

// get Apply Jobs
export const getApplyJob = () => get(url.GET_APPLY_JOB);

// get project
export const getProjects = () => get(url.GET_PROJECTS);

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } });

// get tasks
export const getTasks = () => get(url.GET_TASKS);

// add CardData Kanban
export const addCardData = cardData => post(url.ADD_CARD_DATA, cardData);

// update jobs
export const updateCardData = card => put(url.UPDATE_CARD_DATA, card);

// delete Kanban
export const deleteKanban = kanban => del(url.DELETE_KANBAN, { headers: { kanban } });

// get contacts
export const getUsers = () => get(url.GET_USERS);

// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user);

// update user
export const updateUser = user => put(url.UPDATE_USER, user);

// delete user
export const deleteUser = user => del(url.DELETE_USER, { headers: { user } });

// add jobs
export const addNewJobList = job => post(url.ADD_NEW_JOB_LIST, job);

// update jobs
export const updateJobList = job => put(url.UPDATE_JOB_LIST, job);

// delete jobs
export const deleteJobList = job => del(url.DELETE_JOB_LIST, { headers: { job } });

// Delete Apply Jobs
export const deleteApplyJob = data => del(url.DELETE_APPLY_JOB, { headers: { data } });

/** PROJECT */
// add user
export const addNewProject = project => post(url.ADD_NEW_PROJECT, project);

// update user
export const updateProject = project => put(url.UPDATE_PROJECT, project);

// delete user
export const deleteProject = project =>
  del(url.DELETE_PROJECT, { headers: { project } });

export const getUserProfile = () => get(url.GET_USER_PROFILE);

// get maillist
export const getMailsLists = filter => post(url.GET_MAILS_LIST, {
  params: filter,
});

//update mail
export const updateMail = mail => put(url.UPDATE_MAIL, mail);

// get folderlist
export const selectFolders = () => get(url.SELECT_FOLDER);

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message);

// delete message
export const deleteMessage = data => del(url.DELETE_MESSAGE, { headers: { data } });

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA);
export const getYearlyData = () => get(url.GET_YEARLY_DATA);
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA);

export const walletBalanceData = month =>
  get(`${url.GET_WALLET_DATA}/${month}`, { params: { month } });

export const getStatisticData = duration =>
  get(`${url.GET_STATISTICS_DATA}/${duration}`, { params: { duration } });

export const visitorData = duration =>
  get(`${url.GET_VISITOR_DATA}/${duration}`, { params: { duration } });

export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } });

export const getEarningChartsData = month =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } });

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS);

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  });
};
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  });
};

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  });
};

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  });
};

 export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
  getProductComents,
  onLikeComment,
  onLikeReply,
  onAddReply,
  onAddComment,
};
