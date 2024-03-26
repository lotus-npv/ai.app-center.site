import {
  GET_TICKET_ALL,
  GET_TICKET_ALL_SUCCESS,
  GET_TICKET_ALL_FAIL,
  GET_TICKET_ALLINFO,
  GET_TICKET_ALLINFO_SUCCESS,
  GET_TICKET_ALLINFO_FAIL,
  GET_TICKET_ID,
  GET_TICKET_ID_SUCCESS,
  GET_TICKET_ID_FAIL,
  SET_TICKET,
  SET_TICKET_SUCCESS,
  SET_TICKET_FAIL,
  UPDATE_TICKET,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
  DELETE_TICKET,
  DELETE_TICKET_SUCCESS,
  DELETE_TICKET_FAIL
} from "./actionTypes";

export const getTicketAll = () => ({
  type: GET_TICKET_ALL,
});

export const getTicketAllSuccess = data => ({
  type: GET_TICKET_ALL_SUCCESS,
  payload: data,
});

export const getTicketAllFail = error => ({
  type: GET_TICKET_ALL_FAIL,
  payload: error,
});

export const getTicketAllInfo = () => ({
  type: GET_TICKET_ALLINFO,
});

export const getTicketAllInfoSuccess = data => ({
  type: GET_TICKET_ALLINFO_SUCCESS,
  payload: data,
});

export const getTicketAllInfoFail = error => ({
  type: GET_TICKET_ALLINFO_FAIL,
  payload: error,
});

export const getTicketId = id => ({
  type: GET_TICKET_ID,
  payload: id,
});

export const getTicketIdSuccess = data => ({
  type: GET_TICKET_ID_SUCCESS,
  payload: data,
});

export const getTicketIdFail = error => ({
  type: GET_TICKET_ID_FAIL,
  payload: error,
});

export const setTicket = data => ({
  type: SET_TICKET,
  payload: data
});

export const setTicketSuccess = data => ({
  type: SET_TICKET_SUCCESS,
  payload: data,
});

export const setTicketFail = error => ({
  type: SET_TICKET_FAIL,
  payload: error,
});

export const updateTicket = (data) => ({
  type: UPDATE_TICKET,
  payload: data
});

export const updateTicketSuccess = data => ({
  type: UPDATE_TICKET_SUCCESS,
  payload: data,
});

export const updateTicketFail = error => ({
  type: UPDATE_TICKET_FAIL,
  payload: error,
});

export const deleteTicket = (data) => ({
  type: DELETE_TICKET,
  payload: data
});

export const deleteTicketSuccess = data => ({
  type: DELETE_TICKET_SUCCESS,
  payload: data,
});

export const deleteTicketFail = error => ({
  type: DELETE_TICKET_FAIL,
  payload: error,
});