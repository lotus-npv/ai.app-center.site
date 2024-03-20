import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import authSaga from "./auth/login/saga";
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
import UploadFileSaga from "./upload/saga";
import watchUploadImage from './upload_image/sagas'
import AvataSaga from "./avata/saga";
import AlienRegistrationCardSaga from "./alien_registration_card/saga";
import ProvinceSaga from "./province/saga";
import NationSaga from "./nation/saga";
import ViolateSaga from "./violate/saga";
import ViolateListSaga from "./violate_list/saga";
import ViolateTypeSaga from "./violate_type/saga";
import UsersSaga from "./users/saga";

export default function* rootSaga() {
  yield all([
    //public
    UploadFileSaga(),
    watchUploadImage(),
    fork(AccountSaga),
    fork(authSaga),
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
    fork(AvataSaga),
    fork(AlienRegistrationCardSaga),
    fork(ProvinceSaga),
    fork(NationSaga),
    fork(ViolateSaga),
    fork(ViolateListSaga),
    fork(ViolateTypeSaga),
    fork(UsersSaga),
  ]);
}
