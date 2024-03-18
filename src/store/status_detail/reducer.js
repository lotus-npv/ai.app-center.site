import {
  GET_STATUSDETAIL_ALL,
  GET_STATUSDETAIL_ALL_SUCCESS,
  GET_STATUSDETAIL_ALL_FAIL,
  GET_STATUSDETAIL_ID,
  GET_STATUSDETAIL_ID_SUCCESS,
  GET_STATUSDETAIL_ID_FAIL,
  SET_STATUSDETAIL,
  SET_STATUSDETAIL_SUCCESS,
  SET_STATUSDETAIL_FAIL,
  UPDATE_STATUSDETAIL,
  UPDATE_STATUSDETAIL_SUCCESS,
  UPDATE_STATUSDETAIL_FAIL,
  DELETE_STATUSDETAIL_SUCCESS,
  DELETE_STATUSDETAIL_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: {}
  };
  
  const StatusDetail = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_STATUSDETAIL_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_STATUSDETAIL_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_STATUSDETAIL_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_STATUSDETAIL_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_STATUSDETAIL:
        return {
          ...state,
          data: action.payload,
        };
      case SET_STATUSDETAIL_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_STATUSDETAIL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_STATUSDETAIL:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_STATUSDETAIL_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_STATUSDETAIL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_STATUSDETAIL_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_STATUSDETAIL_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default StatusDetail;