import {
  GET_KEYLICENSE_ALL,
  GET_KEYLICENSE_ALL_SUCCESS,
  GET_KEYLICENSE_ALL_FAIL,
  GET_KEYLICENSE_ID,
  GET_KEYLICENSE_ID_SUCCESS,
  GET_KEYLICENSE_ID_FAIL,
  SET_KEYLICENSE,
  SET_KEYLICENSE_SUCCESS,
  SET_KEYLICENSE_FAIL,
  UPDATE_KEYLICENSE,
  UPDATE_KEYLICENSE_SUCCESS,
  UPDATE_KEYLICENSE_FAIL,
  DELETE_KEYLICENSE,
  DELETE_KEYLICENSE_SUCCESS,
  DELETE_KEYLICENSE_FAIL
} from "./actionTypes";

export const getKeyLicenseAll = () => ({
  type: GET_KEYLICENSE_ALL,
});

export const getKeyLicenseAllSuccess = data => ({
  type: GET_KEYLICENSE_ALL_SUCCESS,
  payload: data,
});

export const getKeyLicenseAllFail = error => ({
  type: GET_KEYLICENSE_ALL_FAIL,
  payload: error,
});

export const getKeyLicenseId = key => ({
  type: GET_KEYLICENSE_ID,
  payload: key,
});

export const getKeyLicenseIdSuccess = data => ({
  type: GET_KEYLICENSE_ID_SUCCESS,
  payload: data,
});

export const getKeyLicenseIdFail = error => ({
  type: GET_KEYLICENSE_ID_FAIL,
  payload: error,
});

export const setKeyLicense = data => ({
  type: SET_KEYLICENSE,
  payload: data
});

export const setKeyLicenseSuccess = data => ({
  type: SET_KEYLICENSE_SUCCESS,
  payload: data,
});

export const setKeyLicenseFail = error => ({
  type: SET_KEYLICENSE_FAIL,
  payload: error,
});

export const updateKeyLicense = (data) => ({
  type: UPDATE_KEYLICENSE,
  payload: data
});

export const updateKeyLicenseSuccess = data => ({
  type: UPDATE_KEYLICENSE_SUCCESS,
  payload: data,
});

export const updateKeyLicenseFail = error => ({
  type: UPDATE_KEYLICENSE_FAIL,
  payload: error,
});

export const deleteKeyLicense = (data) => ({
  type: DELETE_KEYLICENSE,
  payload: data
});

export const deleteKeyLicenseSuccess = data => ({
  type: DELETE_KEYLICENSE_SUCCESS,
  payload: data,
});

export const deleteKeyLicenseFail = error => ({
  type: DELETE_KEYLICENSE_FAIL,
  payload: error,
});