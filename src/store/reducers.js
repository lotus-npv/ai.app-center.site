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
// Avata
import Avata from "./avata/reducer";
// AlienRegistrationCard
import AlienRegistrationCard from "./alien_registration_card/reducer";
import Violate from "./violate/reducer";
import ViolateList from "./violate_list/reducer";
import ViolateType from "./violate_type/reducer";
import Users from "./users/reducer";
import Employee from "./employee/reducer";
import Nation from "./nation/reducer";
import Province from "./province/reducer";
import District from "./district/reducer";
import Commune from "./commune/reducer";
import StatusOfResidence from "./status_of_residence/reducer";
import Ticket from "./ticket/reducer";
import TicketDetail from "./ticket_detail/reducer";
import Syndication from "./syndication/reducer";
import KeyLicense from "./key_license/reducer";
import Noti from "./notification/reducer";

//mails
import mails from "./mails/reducer";


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
  Avata,
  AlienRegistrationCard,
  Violate,
  ViolateList,
  ViolateType,
  Users,
  Employee,
  Nation,
  Province,
  District,
  Commune,
  StatusOfResidence,
  Ticket,
  TicketDetail,
  Syndication,
  mails,
  KeyLicense,
  Noti
});

export default rootReducer;
