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
  DELETE_TICKETDETAIL_SUCCESS,
  DELETE_TICKETDETAIL_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: null,
    loading: false
  };
  
  const TicketDetail = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_TICKETDETAIL_ALL:
        return {
          ...state,
          loading: true
        };
      case GET_TICKETDETAIL_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          datas: action.payload,
        };
  
      case GET_TICKETDETAIL_ALL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case GET_TICKETDETAIL_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_TICKETDETAIL_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_TICKETDETAIL:
        return {
          ...state,
          loading: true,
        };
      case SET_TICKETDETAIL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
  
      case SET_TICKETDETAIL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_TICKETDETAIL:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_TICKETDETAIL_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_TICKETDETAIL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_TICKETDETAIL_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_TICKETDETAIL_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default TicketDetail;