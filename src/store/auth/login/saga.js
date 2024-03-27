import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN, GET_USERS_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess,getUsersLoginFail,getUsersLoginSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
  getUsersDataLogin
} from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      );
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(getUsersDataLogin, {
        email: user.email,
        password: user.password,
      });
      const user = response[0];
      user.password_hash = '';
      console.log(user)
      localStorage.setItem("authUser", JSON.stringify(user));
      yield put(loginSuccess(user));
    }
    history('/dashboard');
  } catch (error) {
    yield put(apiError(error));
  }
}

// function* loginUser({ payload: { user, history } }) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const response = yield call(
//         fireBaseBackend.loginUser,
//         user.email,
//         user.password
//       );
//       yield put(loginSuccess(response));
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
//       const response = yield call(postJwtLogin, {
//         email: user.email,
//         password: user.password,
//       });
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
//       const response = yield call(postFakeLogin, {
//         email: user.email,
//         password: user.password,
//       });
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     }
//     history('/dashboard');
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    yield put(logoutUserSuccess());
    history('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { type, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.socialLoginUser, type);
      if (response) {
        history("/dashboard");
      } else {
        history("/login");
      }
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    if(response)
    history("/dashboard");
  } catch (error) {
    console.log("error",error)
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
