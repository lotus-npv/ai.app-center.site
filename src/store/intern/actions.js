import {
  GET_INTERN_ALL,
  GET_INTERN_ALL_SUCCESS,
  GET_INTERN_ALL_FAIL,
  GET_INTERN_ALLINFO,
  GET_INTERN_ALLINFO_SUCCESS,
  GET_INTERN_ALLINFO_FAIL,
  GET_INTERN_ID,
  GET_INTERN_ID_SUCCESS,
  GET_INTERN_ID_FAIL,
  SET_INTERN,
  SET_INTERN_SUCCESS,
  SET_INTERN_FAIL,
  UPDATE_INTERN,
  UPDATE_INTERN_SUCCESS,
  UPDATE_INTERN_FAIL,
  DELETE_INTERN,
  DELETE_INTERN_SUCCESS,
  DELETE_INTERN_FAIL,
  OPEN_MODAL
} from "./actionTypes";

export const getInternAll = () => ({
  type: GET_INTERN_ALL,
});

export const getInternAllSuccess = data => ({
  type: GET_INTERN_ALL_SUCCESS,
  payload: data,
});

export const getInternAllFail = error => ({
  type: GET_INTERN_ALL_FAIL,
  payload: error,
});
export const getInternAllInfo = () => ({
  type: GET_INTERN_ALLINFO,
});

export const getInternAllInfoSuccess = data => ({
  type: GET_INTERN_ALLINFO_SUCCESS,
  payload: data,
});

export const getInternAllInfoFail = error => ({
  type: GET_INTERN_ALLINFO_FAIL,
  payload: error,
});

export const getInternId = () => ({
  type: GET_INTERN_ID,
});

export const getInternIdSuccess = data => ({
  type: GET_INTERN_ID_SUCCESS,
  payload: data,
});

export const getInternIdFail = error => ({
  type: GET_INTERN_ID_FAIL,
  payload: error,
});

export const setIntern = data => ({
  type: SET_INTERN,
  payload: data
});

export const setInternSuccess = data => ({
  type: SET_INTERN_SUCCESS,
  payload: data,
});

export const setInternFail = error => ({
  type: SET_INTERN_FAIL,
  payload: error,
});

export const updateIntern = (data) => ({
  type: UPDATE_INTERN,
  payload: data
});

export const updateInternSuccess = data => ({
  type: UPDATE_INTERN_SUCCESS,
  payload: data,
});

export const updateInternFail = error => ({
  type: UPDATE_INTERN_FAIL,
  payload: error,
});

export const deleteIntern = (data) => ({
  type: DELETE_INTERN,
  payload: data
});

export const deleteInternSuccess = data => ({
  type: DELETE_INTERN_SUCCESS,
  payload: data,
});

export const deleteInternFail = error => ({
  type: DELETE_INTERN_FAIL,
  payload: error,
});

export const openModal = (data) => ({
  type: OPEN_MODAL,
  payload: data
});