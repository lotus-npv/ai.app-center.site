import {
  GET_RECEIVINGFACTORY_ALL,
  GET_RECEIVINGFACTORY_ALL_SUCCESS,
  GET_RECEIVINGFACTORY_ALL_FAIL,
  GET_RECEIVINGFACTORY_USERID,
  GET_RECEIVINGFACTORY_USERID_SUCCESS,
  GET_RECEIVINGFACTORY_USERID_FAIL,
  GET_RECEIVINGFACTORY_ID,
  GET_RECEIVINGFACTORY_ID_SUCCESS,
  GET_RECEIVINGFACTORY_ID_FAIL,
  SET_RECEIVINGFACTORY,
  SET_RECEIVINGFACTORY_SUCCESS,
  SET_RECEIVINGFACTORY_FAIL,
  UPDATE_RECEIVINGFACTORY,
  UPDATE_RECEIVINGFACTORY_SUCCESS,
  UPDATE_RECEIVINGFACTORY_FAIL,
  DELETE_RECEIVINGFACTORY,
  DELETE_RECEIVINGFACTORY_SUCCESS,
  DELETE_RECEIVINGFACTORY_FAIL
} from "./actionTypes";

export const getReceivingFactoryAll = () => ({
  type: GET_RECEIVINGFACTORY_ALL,
});

export const getReceivingFactoryAllSuccess = data => ({
  type: GET_RECEIVINGFACTORY_ALL_SUCCESS,
  payload: data,
});

export const getReceivingFactoryAllFail = error => ({
  type: GET_RECEIVINGFACTORY_ALL_FAIL,
  payload: error,
});
export const getReceivingFactoryUserId = (id) => ({
  type: GET_RECEIVINGFACTORY_USERID,
  payload: id
});

export const getReceivingFactoryUserIdSuccess = data => ({
  type: GET_RECEIVINGFACTORY_USERID_SUCCESS,
  payload: data,
});

export const getReceivingFactoryUserIdFail = error => ({
  type: GET_RECEIVINGFACTORY_USERID_FAIL,
  payload: error,
});

export const getReceivingFactoryId = () => ({
  type: GET_RECEIVINGFACTORY_ID,
});

export const getReceivingFactoryIdSuccess = data => ({
  type: GET_RECEIVINGFACTORY_ID_SUCCESS,
  payload: data,
});

export const getReceivingFactoryIdFail = error => ({
  type: GET_RECEIVINGFACTORY_ID_FAIL,
  payload: error,
});

export const setReceivingFactory = data => ({
  type: SET_RECEIVINGFACTORY,
  payload: data
});

export const setReceivingFactorySuccess = data => ({
  type: SET_RECEIVINGFACTORY_SUCCESS,
  payload: data,
});

export const setReceivingFactoryFail = error => ({
  type: SET_RECEIVINGFACTORY_FAIL,
  payload: error,
});

export const updateReceivingFactory = (data) => ({
  type: UPDATE_RECEIVINGFACTORY,
  payload: data
});

export const updateReceivingFactorySuccess = data => ({
  type: UPDATE_RECEIVINGFACTORY_SUCCESS,
  payload: data,
});

export const updateReceivingFactoryFail = error => ({
  type: UPDATE_RECEIVINGFACTORY_FAIL,
  payload: error,
});

export const deleteReceivingFactory = (data) => ({
  type: DELETE_RECEIVINGFACTORY,
  payload: data
});

export const deleteReceivingFactorySuccess = data => ({
  type: DELETE_RECEIVINGFACTORY_SUCCESS,
  payload: data,
});

export const deleteReceivingFactoryFail = error => ({
  type: DELETE_RECEIVINGFACTORY_FAIL,
  payload: error,
});