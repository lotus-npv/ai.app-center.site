import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import dashboardSaga from "./dashboard/saga";
import projectsSaga from "./projects/saga";
import demoSaga from "./demo/saga";
import careerSaga from "./career/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(dashboardSaga),
    fork(projectsSaga),
    fork(demoSaga),
    fork(careerSaga),
  ]);
}
