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


const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Dashboard,
  projects,
  Demo
});

export default rootReducer;
