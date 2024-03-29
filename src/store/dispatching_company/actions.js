import {
  GET_DISPATCHINGCOMPANY_ALL,
  GET_DISPATCHINGCOMPANY_ALL_SUCCESS,
  GET_DISPATCHINGCOMPANY_ALL_FAIL,
  GET_DISPATCHINGCOMPANY_USERID,
  GET_DISPATCHINGCOMPANY_USERID_SUCCESS,
  GET_DISPATCHINGCOMPANY_USERID_FAIL,
  GET_DISPATCHINGCOMPANY_ID,
  GET_DISPATCHINGCOMPANY_ID_SUCCESS,
  GET_DISPATCHINGCOMPANY_ID_FAIL,
  SET_DISPATCHINGCOMPANY,
  SET_DISPATCHINGCOMPANY_SUCCESS,
  SET_DISPATCHINGCOMPANY_FAIL,
  UPDATE_DISPATCHINGCOMPANY,
  UPDATE_DISPATCHINGCOMPANY_SUCCESS,
  UPDATE_DISPATCHINGCOMPANY_FAIL,
  DELETE_DISPATCHINGCOMPANY,
  DELETE_DISPATCHINGCOMPANY_SUCCESS,
  DELETE_DISPATCHINGCOMPANY_FAIL
} from "./actionTypes";

export const getDispatchingCompanyAll = () => ({
  type: GET_DISPATCHINGCOMPANY_ALL,
});

export const getDispatchingCompanyAllSuccess = data => ({
  type: GET_DISPATCHINGCOMPANY_ALL_SUCCESS,
  payload: data,
});

export const getDispatchingCompanyAllFail = error => ({
  type: GET_DISPATCHINGCOMPANY_ALL_FAIL,
  payload: error,
});

export const getDispatchingCompanyUserId = (id) => ({
  type: GET_DISPATCHINGCOMPANY_USERID,
  payload: id
});

export const getDispatchingCompanyUserIdSuccess = data => ({
  type: GET_DISPATCHINGCOMPANY_USERID_SUCCESS,
  payload: data,
});

export const getDispatchingCompanyUserIdFail = error => ({
  type: GET_DISPATCHINGCOMPANY_USERID_FAIL,
  payload: error,
});

export const getDispatchingCompanyId = () => ({
  type: GET_DISPATCHINGCOMPANY_ID,
});

export const getDispatchingCompanyIdSuccess = data => ({
  type: GET_DISPATCHINGCOMPANY_ID_SUCCESS,
  payload: data,
});

export const getDispatchingCompanyIdFail = error => ({
  type: GET_DISPATCHINGCOMPANY_ID_FAIL,
  payload: error,
});

export const setDispatchingCompany = data => ({
  type: SET_DISPATCHINGCOMPANY,
  payload: data
});

export const setDispatchingCompanySuccess = data => ({
  type: SET_DISPATCHINGCOMPANY_SUCCESS,
  payload: data,
});

export const setDispatchingCompanyFail = error => ({
  type: SET_DISPATCHINGCOMPANY_FAIL,
  payload: error,
});

export const updateDispatchingCompany = (data) => ({
  type: UPDATE_DISPATCHINGCOMPANY,
  payload: data
});

export const updateDispatchingCompanySuccess = data => ({
  type: UPDATE_DISPATCHINGCOMPANY_SUCCESS,
  payload: data,
});

export const updateDispatchingCompanyFail = error => ({
  type: UPDATE_DISPATCHINGCOMPANY_FAIL,
  payload: error,
});

export const deleteDispatchingCompany = (data) => ({
  type: DELETE_DISPATCHINGCOMPANY,
  payload: data
});

export const deleteDispatchingCompanySuccess = data => ({
  type: DELETE_DISPATCHINGCOMPANY_SUCCESS,
  payload: data,
});

export const deleteDispatchingCompanyFail = error => ({
  type: DELETE_DISPATCHINGCOMPANY_FAIL,
  payload: error,
});