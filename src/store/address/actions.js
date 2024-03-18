import {
  GET_ADDRESS_ALL,
  GET_ADDRESS_ALL_SUCCESS,
  GET_ADDRESS_ALL_FAIL,
  GET_ADDRESS_ID,
  GET_ADDRESS_ID_SUCCESS,
  GET_ADDRESS_ID_FAIL,
  SET_ADDRESS,
  SET_ADDRESS_SUCCESS,
  SET_ADDRESS_FAIL,
  UPDATE_ADDRESS,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  DELETE_ADDRESS,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL
} from "./actionTypes";

export const getAddressAll = () => ({
  type: GET_ADDRESS_ALL,
});

export const getAddressAllSuccess = data => ({
  type: GET_ADDRESS_ALL_SUCCESS,
  payload: data,
});

export const getAddressAllFail = error => ({
  type: GET_ADDRESS_ALL_FAIL,
  payload: error,
});

export const getAddressId = () => ({
  type: GET_ADDRESS_ID,
});

export const getAddressIdSuccess = data => ({
  type: GET_ADDRESS_ID_SUCCESS,
  payload: data,
});

export const getAddressIdFail = error => ({
  type: GET_ADDRESS_ID_FAIL,
  payload: error,
});

export const setAddress = data => ({
  type: SET_ADDRESS,
  payload: data
});

export const setAddressSuccess = data => ({
  type: SET_ADDRESS_SUCCESS,
  payload: data,
});

export const setAddressFail = error => ({
  type: SET_ADDRESS_FAIL,
  payload: error,
});

export const updateAddress = (data) => ({
  type: UPDATE_ADDRESS,
  payload: data
});

export const updateAddressSuccess = data => ({
  type: UPDATE_ADDRESS_SUCCESS,
  payload: data,
});

export const updateAddressFail = error => ({
  type: UPDATE_ADDRESS_FAIL,
  payload: error,
});

export const deleteAddress = (data) => ({
  type: DELETE_ADDRESS,
  payload: data
});

export const deleteAddressSuccess = data => ({
  type: DELETE_ADDRESS_SUCCESS,
  payload: data,
});

export const deleteAddressFail = error => ({
  type: DELETE_ADDRESS_FAIL,
  payload: error,
});