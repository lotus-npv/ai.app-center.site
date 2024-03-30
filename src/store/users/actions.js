import {
  GET_USERS_USER_ID_AND_TYPE,
  GET_USERS_USER_ID_AND_TYPE_SUCCESS,
  GET_USERS_USER_ID_AND_TYPE_FAIL,
  GET_USERS_ALL,
  GET_USERS_ALL_SUCCESS,
  GET_USERS_ALL_FAIL,
  GET_USERS_LOGIN,
  GET_USERS_LOGIN_SUCCESS,
  GET_USERS_LOGIN_FAIL,
  GET_USERS_ID,
  GET_USERS_ID_SUCCESS,
  GET_USERS_ID_FAIL,
  SET_USERS,
  SET_USERS_SUCCESS,
  SET_USERS_FAIL,
  UPDATE_USERS,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_FAIL,
  DELETE_USERS,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
} from "./actionTypes";

export const getUsersUserIdAndType = ({id, type}) => ({
  type: GET_USERS_USER_ID_AND_TYPE,
  payload: {id, type}
});
export const getUsersUserIdAndTypeSuccess = (data) => ({
  type: GET_USERS_USER_ID_AND_TYPE_SUCCESS,
  payload: data,
});
export const getUsersUserIdAndTypeFail = error => ({
  type: GET_USERS_USER_ID_AND_TYPE_FAIL,
  payload: error,
});

export const getUsersAll = () => ({
  type: GET_USERS_ALL,
});
export const getUsersAllSuccess = (data) => ({
  type: GET_USERS_ALL_SUCCESS,
  payload: data,
});
export const getUsersAllFail = error => ({
  type: GET_USERS_ALL_FAIL,
  payload: error,
});

// export const getUsersLogin = (username, password) => ({
//   type: GET_USERS_LOGIN,
//   payload: { username, password }
// });

export const getUsersLogin = (user, history) => ({
  type: GET_USERS_LOGIN,
  payload: { user, history }
});

export const getUsersLoginSuccess = user => ({
  type: GET_USERS_LOGIN_SUCCESS,
  payload: user,
});

export const getUsersLoginFail = error => ({
  type: GET_USERS_LOGIN_FAIL,
  payload: error,
});

export const getUsersId = id => ({
  type: GET_USERS_ID,
  payload: id,
});

export const getUsersIdSuccess = data => ({
  type: GET_USERS_ID_SUCCESS,
  payload: data,
});

export const getUsersIdFail = error => ({
  type: GET_USERS_ID_FAIL,
  payload: error,
});

export const setUsers = data => ({
  type: SET_USERS,
  payload: data
});

export const setUsersSuccess = data => ({
  type: SET_USERS_SUCCESS,
  payload: data,
});

export const setUsersFail = error => ({
  type: SET_USERS_FAIL,
  payload: error,
});

export const updateUsers = (data) => ({
  type: UPDATE_USERS,
  payload: data
});

export const updateUsersSuccess = data => ({
  type: UPDATE_USERS_SUCCESS,
  payload: data,
});

export const updateUsersFail = error => ({
  type: UPDATE_USERS_FAIL,
  payload: error,
});

export const deleteUsers = (data) => ({
  type: DELETE_USERS,
  payload: data
});

export const deleteUsersSuccess = data => ({
  type: DELETE_USERS_SUCCESS,
  payload: data,
});

export const deleteUsersFail = error => ({
  type: DELETE_USERS_FAIL,
  payload: error,
});