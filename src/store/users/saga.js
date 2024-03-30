import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_USERS_ALL,GET_USERS_ID, SET_USERS, UPDATE_USERS,DELETE_USERS,GET_USERS_LOGIN,LOGOUT_USER,GET_USERS_USER_ID_AND_TYPE
} from "./actionTypes"
import {
    getUsersUserIdAndTypeFail,
    getUsersUserIdAndTypeSuccess,

    getUsersAllFail,
    getUsersAllSuccess,

    getUsersLoginFail,
    getUsersLoginSuccess,
    getUsersIdSuccess,
    getUsersIdFail,
    setUsersSuccess,
    setUsersFail,
    updateUsersSuccess,
    updateUsersFail,
    deleteUsersSuccess,
    deleteUsersFail
} from "./actions"
                                      
import { getUsersDataAll,getUsersDataId ,addNewDataUsers, updateDataUsers, deleteDataUsers, getUsersDataLogin,getUsersDataUserIdAndType } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetUsersData() {
  try {
    const response = yield call(getUsersDataAll);
    yield put(getUsersAllSuccess(response));
  } catch (error) {
    yield put(getUsersAllFail(error))
  }
}

function* fetUsersDataUserIdAndType({ payload: { id, type } }) {
  try {
    const response = yield call(getUsersDataUserIdAndType, id,type);
    yield put(getUsersUserIdAndTypeSuccess(response));
  } catch (error) {
    yield put(getUsersUserIdAndTypeFail(error))
  }
}

function* fetUsersDataLogin({ payload: { user, history } }) {
  try {
    const response = yield call(getUsersDataLogin, user.email,user.password);
    yield put(getUsersLoginSuccess(response));
    if(response.length == 1) {
      localStorage.setItem("authUser", JSON.stringify(response));
    }
    history('/dashboard');
  } catch (error) {
    yield put(getUsersLoginFail(error))
  }
}

function* fetUsersDataId({payload: id}) {
  try {
    const response = yield call(getUsersDataId, id);
    yield put(getUsersIdSuccess(response));
  } catch (error) {
    yield put(getUsersIdFail(error))
  }
}

function* onAddNewUsers({ payload: data }) {
  try {
      const response = yield call(addNewDataUsers, data);
      yield put(setUsersSuccess(response));
      toast.success("Users Added Successfully", { autoClose: 2000 });
      yield call(refreshUsersData);
  } catch (error) {
      yield put(setUsersFail(error));
      toast.error("Users Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateUsers({ payload: data }) {
  try {
      const response = yield call(updateDataUsers, data)
      yield put(updateUsersSuccess(response));
      toast.success("Users Updated Successfully", { autoClose: 2000 });
      yield call(refreshUsersData);
  } catch (error) {
      yield put(updateUsersFail(error))
      toast.error("Users Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteUsers({ payload: id }) {
  try {
      const response = yield call(deleteDataUsers, id)
      yield put(deleteUsersSuccess(response));
      toast.success("Users Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteUsersFail(error))
      toast.error("Users Delete Failed", { autoClose: 2000 });
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* refreshUsersData() {
  const response = yield call(getUsersDataAll);
  yield put(getUsersAllSuccess(response));
}
                                      

function* UsersSaga() {
  yield takeEvery(GET_USERS_USER_ID_AND_TYPE, fetUsersDataUserIdAndType)
  yield takeEvery(GET_USERS_ALL, fetUsersData)
  yield takeEvery(GET_USERS_LOGIN, fetUsersDataLogin)
  yield takeEvery(GET_USERS_ID, fetUsersDataId)
  yield takeEvery(SET_USERS, onAddNewUsers)
  yield takeEvery(UPDATE_USERS, onUpdateUsers)
  yield takeEvery(DELETE_USERS, onDeleteUsers)
}
                                      
export default UsersSaga;