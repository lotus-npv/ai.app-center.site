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
import CareerSaga from "./career/saga";
import StatusSaga from "./status/saga";
import InternSaga from "./intern/saga";
import ReceivingFactory from "./receiving_factory/saga";
import DispatchingCompany from "./dispatching_company/saga";
import Address from "./address/saga";
import StatusDetailSaga from "./status_detail/saga";

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
    fork(CareerSaga),
    fork(StatusSaga),
    fork(InternSaga),
    fork(ReceivingFactory),
    fork(DispatchingCompany),
    fork(Address),
    fork(StatusDetailSaga),
  ]);
}
