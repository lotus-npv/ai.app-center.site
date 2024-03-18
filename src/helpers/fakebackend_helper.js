import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

let config = {
  headers: {
      "Content-Type": "application/json",
  },
};

// demo api
const getDemoData = () => get(url.GET_DEMO_DATA);
export { getDemoData };

// career
const getCareerDataAll = () => get(url.GET_CAREER_ALL);
export { getCareerDataAll };

const getCareerDataId = (id) => get(`${url.GET_CAREER_ID}/${id}`,{ params: { id } }, config);
export { getCareerDataId };

const addNewDataCareer = data => post(url.SET_CAREER, data, config);
export { addNewDataCareer };

const updateDataCareer = data => put(url.UPDATE_CAREER, data, config);
export {updateDataCareer};

const deleteDataCareer = (id) => del(`${url.DELETE_CAREER}/${id}`, { params: { id } }, config);
export {deleteDataCareer};

// Status
const getStatusDataAll = () => get(url.GET_STATUS_ALL);
export { getStatusDataAll };

const getStatusDataId = () => get(url.GET_STATUS_ID);
export { getStatusDataId };

const addNewDataStatus = data => post(url.SET_STATUS, data, config);
export { addNewDataStatus };

const updateDataStatus = data => put(url.UPDATE_STATUS, data, config);
export {updateDataStatus};

const deleteDataStatus = (id) => del(`${url.DELETE_STATUS}/${id}`, { params: { id } }, config);
export {deleteDataStatus};

// intern
const getInternDataAll = () => get(url.GET_INTERN_ALL);
export { getInternDataAll };

const getInternDataId = () => get(url.GET_INTERN_ID);
export { getInternDataId };

const addNewDataIntern = data => post(url.SET_INTERN, data, config);
export { addNewDataIntern };

const updateDataIntern = data => put(url.UPDATE_INTERN, data, config);
export {updateDataIntern};

const deleteDataIntern = (id) => del(`${url.DELETE_INTERN}/${id}`, { params: { id } }, config);
export {deleteDataIntern};
// syndication
const getSyndicationDataAll = () => get(url.GET_SYNDICATION_ALL);
export { getSyndicationDataAll };

const getSyndicationDataId = () => get(url.GET_SYNDICATION_ID);
export { getSyndicationDataId };

const addNewDataSyndication = data => post(url.SET_SYNDICATION, data, config);
export { addNewDataSyndication };

const updateDataSyndication = data => put(url.UPDATE_SYNDICATION, data, config);
export {updateDataSyndication};

const deleteDataSyndication = (id) => del(`${url.DELETE_SYNDICATION}/${id}`, { params: { id } }, config);
export {deleteDataSyndication};
// receiving_factory
const getReceivingFactoryDataAll = () => get(url.GET_RECEIVINGFACTORY_ALL);
export { getReceivingFactoryDataAll };

const getReceivingFactoryDataId = () => get(url.GET_RECEIVINGFACTORY_ID);
export { getReceivingFactoryDataId };

const addNewDataReceivingFactory = data => post(url.SET_RECEIVINGFACTORY, data, config);
export { addNewDataReceivingFactory };

const updateDataReceivingFactory = data => put(url.UPDATE_RECEIVINGFACTORY, data, config);
export {updateDataReceivingFactory};

const deleteDataReceivingFactory = (id) => del(`${url.DELETE_RECEIVINGFACTORY}/${id}`, { params: { id } }, config);
export {deleteDataReceivingFactory};
// dispatching_company
const getDispatchingCompanyDataAll = () => get(url.GET_DISPATCHINGCOMPANY_ALL);
export { getDispatchingCompanyDataAll };

const getDispatchingCompanyDataId = () => get(url.GET_DISPATCHINGCOMPANY_ID);
export { getDispatchingCompanyDataId };

const addNewDataDispatchingCompany = data => post(url.SET_DISPATCHINGCOMPANY, data, config);
export { addNewDataDispatchingCompany };

const updateDataDispatchingCompany = data => put(url.UPDATE_DISPATCHINGCOMPANY, data, config);
export {updateDataDispatchingCompany};

const deleteDataDispatchingCompany = (id) => del(`${url.DELETE_DISPATCHINGCOMPANY}/${id}`, { params: { id } }, config);
export {deleteDataDispatchingCompany};
// address
const getAddressDataAll = () => get(url.GET_ADDRESS_ALL);
export { getAddressDataAll };

const getAddressDataId = () => get(url.GET_ADDRESS_ID);
export { getAddressDataId };

const addNewDataAddress = data => post(url.SET_ADDRESS, data, config);
export { addNewDataAddress };

const updateDataAddress = data => put(url.UPDATE_ADDRESS, data, config);
export {updateDataAddress};

const deleteDataAddress = (id) => del(`${url.DELETE_ADDRESS}/${id}`, { params: { id } }, config);
export {deleteDataAddress};
// alien_registration_card
const getAlienRegistrationCardDataAll = () => get(url.GET_ALIENREGISTRATIONCARD_ALL);
export { getAlienRegistrationCardDataAll };

const getAlienRegistrationCardDataId = () => get(url.GET_ALIENREGISTRATIONCARD_ID);
export { getAlienRegistrationCardDataId };

const addNewDataAlienRegistrationCard = data => post(url.SET_ALIENREGISTRATIONCARD, data, config);
export { addNewDataAlienRegistrationCard };

const updateDataAlienRegistrationCard = data => put(url.UPDATE_ALIENREGISTRATIONCARD, data, config);
export {updateDataAlienRegistrationCard};

const deleteDataAlienRegistrationCard = (id) => del(`${url.DELETE_ALIENREGISTRATIONCARD}/${id}`, { params: { id } }, config);
export {deleteDataAlienRegistrationCard};


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
