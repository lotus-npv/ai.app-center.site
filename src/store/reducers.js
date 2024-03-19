import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Dashboard 
import Dashboard from "./dashboard/reducer";

//projects
import projects from "./projects/reducer";

// demo
import Demo from "./demo/reducer"

// career
import Career from "./career/reducer";
// Status
import Status from "./status/reducer";
// intern
import Intern from "./intern/reducer";
// ReceivingFactory
import ReceivingFactory from "./receiving_factory/reducer";
// DispatchingCompany
import DispatchingCompany from "./dispatching_company/reducer";
// Address
import Address from "./address/reducer";
// Address
import StatusDetail from "./status_detail/reducer";
// UploadFile
import UploadFile from "./upload/reducer";

import reducer from "./upload_image/reducer";
import Avata from "./avata/reducer";


const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Dashboard,
  projects,
  Demo,
  Career,
  Status,
  Intern,
  ReceivingFactory,
  DispatchingCompany,
  Address,
  StatusDetail,
  UploadFile,
  reducer,
  Avata
});

export default rootReducer;
