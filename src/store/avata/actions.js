import {
  GET_AVATA_ALL,
  GET_AVATA_ALL_SUCCESS,
  GET_AVATA_ALL_FAIL,
  GET_AVATA_ID,
  GET_AVATA_ID_SUCCESS,
  GET_AVATA_ID_FAIL,
  SET_AVATA,
  SET_AVATA_SUCCESS,
  SET_AVATA_FAIL,
  UPDATE_AVATA,
  UPDATE_AVATA_SUCCESS,
  UPDATE_AVATA_FAIL,
  DELETE_AVATA,
  DELETE_AVATA_SUCCESS,
  DELETE_AVATA_FAIL
} from "./actionTypes";

export const getAvataAll = () => ({
  type: GET_AVATA_ALL,
});

export const getAvataAllSuccess = data => ({
  type: GET_AVATA_ALL_SUCCESS,
  payload: data,
});

export const getAvataAllFail = error => ({
  type: GET_AVATA_ALL_FAIL,
  payload: error,
});

export const getAvataId = id => ({
  type: GET_AVATA_ID,
  payload: id,
});

export const getAvataIdSuccess = data => ({
  type: GET_AVATA_ID_SUCCESS,
  payload: data,
});

export const getAvataIdFail = error => ({
  type: GET_AVATA_ID_FAIL,
  payload: error,
});

export const setAvata = data => ({
  type: SET_AVATA,
  payload: data
});

export const setAvataSuccess = data => ({
  type: SET_AVATA_SUCCESS,
  payload: data,
});

export const setAvataFail = error => ({
  type: SET_AVATA_FAIL,
  payload: error,
});

export const updateAvata = (data) => ({
  type: UPDATE_AVATA,
  payload: data
});

export const updateAvataSuccess = data => ({
  type: UPDATE_AVATA_SUCCESS,
  payload: data,
});

export const updateAvataFail = error => ({
  type: UPDATE_AVATA_FAIL,
  payload: error,
});

export const deleteAvata = (data) => ({
  type: DELETE_AVATA,
  payload: data
});

export const deleteAvataSuccess = data => ({
  type: DELETE_AVATA_SUCCESS,
  payload: data,
});

export const deleteAvataFail = error => ({
  type: DELETE_AVATA_FAIL,
  payload: error,
});