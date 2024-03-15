import {
  GET_STATUS_ALL_SUCCESS,
  GET_STATUS_ALL_FAIL,
  GET_STATUS_ID_SUCCESS,
  GET_STATUS_ID_FAIL,
  SET_STATUS_SUCCESS,
  SET_STATUS_FAIL,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL,
  DELETE_STATUS_SUCCESS,
  DELETE_STATUS_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    data: {}
  };
  
  const Status = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_STATUS_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_STATUS_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_STATUS_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_STATUS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_STATUS_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_STATUS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_STATUS_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_STATUS_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Status;