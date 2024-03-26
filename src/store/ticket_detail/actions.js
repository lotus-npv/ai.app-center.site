import {
  GET_TICKETDETAIL_ALL,
  GET_TICKETDETAIL_ALL_SUCCESS,
  GET_TICKETDETAIL_ALL_FAIL,
  GET_TICKETDETAIL_ID,
  GET_TICKETDETAIL_ID_SUCCESS,
  GET_TICKETDETAIL_ID_FAIL,
  SET_TICKETDETAIL,
  SET_TICKETDETAIL_SUCCESS,
  SET_TICKETDETAIL_FAIL,
  UPDATE_TICKETDETAIL,
  UPDATE_TICKETDETAIL_SUCCESS,
  UPDATE_TICKETDETAIL_FAIL,
  DELETE_TICKETDETAIL,
  DELETE_TICKETDETAIL_SUCCESS,
  DELETE_TICKETDETAIL_FAIL
} from "./actionTypes";

export const getTicketDetailAll = () => ({
  type: GET_TICKETDETAIL_ALL,
});

export const getTicketDetailAllSuccess = data => ({
  type: GET_TICKETDETAIL_ALL_SUCCESS,
  payload: data,
});

export const getTicketDetailAllFail = error => ({
  type: GET_TICKETDETAIL_ALL_FAIL,
  payload: error,
});

export const getTicketDetailId = id => ({
  type: GET_TICKETDETAIL_ID,
  payload: id,
});

export const getTicketDetailIdSuccess = data => ({
  type: GET_TICKETDETAIL_ID_SUCCESS,
  payload: data,
});

export const getTicketDetailIdFail = error => ({
  type: GET_TICKETDETAIL_ID_FAIL,
  payload: error,
});

export const setTicketDetail = data => ({
  type: SET_TICKETDETAIL,
  payload: data
});

export const setTicketDetailSuccess = data => ({
  type: SET_TICKETDETAIL_SUCCESS,
  payload: data,
});

export const setTicketDetailFail = error => ({
  type: SET_TICKETDETAIL_FAIL,
  payload: error,
});

export const updateTicketDetail = (data) => ({
  type: UPDATE_TICKETDETAIL,
  payload: data
});

export const updateTicketDetailSuccess = data => ({
  type: UPDATE_TICKETDETAIL_SUCCESS,
  payload: data,
});

export const updateTicketDetailFail = error => ({
  type: UPDATE_TICKETDETAIL_FAIL,
  payload: error,
});

export const deleteTicketDetail = (data) => ({
  type: DELETE_TICKETDETAIL,
  payload: data
});

export const deleteTicketDetailSuccess = data => ({
  type: DELETE_TICKETDETAIL_SUCCESS,
  payload: data,
});

export const deleteTicketDetailFail = error => ({
  type: DELETE_TICKETDETAIL_FAIL,
  payload: error,
});