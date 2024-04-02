import {
  GET_NOTI_ALL,
  GET_NOTI_ALL_SUCCESS,
  GET_NOTI_ALL_FAIL,
  GET_NOTI_USERID,
  GET_NOTI_USERID_SUCCESS,
  GET_NOTI_USERID_FAIL,
  GET_NOTI_ID,
  GET_NOTI_ID_SUCCESS,
  GET_NOTI_ID_FAIL,
  SET_NOTI,
  SET_NOTI_SUCCESS,
  SET_NOTI_FAIL,
  UPDATE_NOTI,
  UPDATE_NOTI_SUCCESS,
  UPDATE_NOTI_FAIL,
  DELETE_NOTI,
  DELETE_NOTI_SUCCESS,
  DELETE_NOTI_FAIL
} from "./actionTypes";

export const getNotiAll = () => ({
  type: GET_NOTI_ALL,
});
export const getNotiAllSuccess = data => ({
  type: GET_NOTI_ALL_SUCCESS,
  payload: data,
});
export const getNotiAllFail = error => ({
  type: GET_NOTI_ALL_FAIL,
  payload: error,
});

export const getNotiUserId = (id) => ({
  type: GET_NOTI_USERID,
  payload: id
});
export const getNotiUserIdSuccess = data => ({
  type: GET_NOTI_USERID_SUCCESS,
  payload: data,
});
export const getNotiUserIdFail = error => ({
  type: GET_NOTI_USERID_FAIL,
  payload: error,
});

export const getNotiId = () => ({
  type: GET_NOTI_ID,
});

export const getNotiIdSuccess = data => ({
  type: GET_NOTI_ID_SUCCESS,
  payload: data,
});

export const getNotiIdFail = error => ({
  type: GET_NOTI_ID_FAIL,
  payload: error,
});

export const setNoti = data => ({
  type: SET_NOTI,
  payload: data
});

export const setNotiSuccess = data => ({
  type: SET_NOTI_SUCCESS,
  payload: data,
});

export const setNotiFail = error => ({
  type: SET_NOTI_FAIL,
  payload: error,
});

export const updateNoti = (data) => ({
  type: UPDATE_NOTI,
  payload: data
});

export const updateNotiSuccess = data => ({
  type: UPDATE_NOTI_SUCCESS,
  payload: data,
});

export const updateNotiFail = error => ({
  type: UPDATE_NOTI_FAIL,
  payload: error,
});

export const deleteNoti = (data) => ({
  type: DELETE_NOTI,
  payload: data
});

export const deleteNotiSuccess = data => ({
  type: DELETE_NOTI_SUCCESS,
  payload: data,
});

export const deleteNotiFail = error => ({
  type: DELETE_NOTI_FAIL,
  payload: error,
});