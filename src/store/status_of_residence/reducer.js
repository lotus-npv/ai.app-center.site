import {
  GET_STATUSOFRESIDENCE_ALL,
  GET_STATUSOFRESIDENCE_ALL_SUCCESS,
  GET_STATUSOFRESIDENCE_ALL_FAIL,
  GET_STATUSOFRESIDENCE_ID,
  GET_STATUSOFRESIDENCE_ID_SUCCESS,
  GET_STATUSOFRESIDENCE_ID_FAIL,
  SET_STATUSOFRESIDENCE,
  SET_STATUSOFRESIDENCE_SUCCESS,
  SET_STATUSOFRESIDENCE_FAIL,
  UPDATE_STATUSOFRESIDENCE,
  UPDATE_STATUSOFRESIDENCE_SUCCESS,
  UPDATE_STATUSOFRESIDENCE_FAIL,
  DELETE_STATUSOFRESIDENCE_SUCCESS,
  DELETE_STATUSOFRESIDENCE_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: {}
  };
  
  const StatusOfResidence = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_STATUSOFRESIDENCE_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_STATUSOFRESIDENCE_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_STATUSOFRESIDENCE_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_STATUSOFRESIDENCE_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_STATUSOFRESIDENCE:
        return {
          ...state,
          data: action.payload,
        };
      case SET_STATUSOFRESIDENCE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_STATUSOFRESIDENCE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_STATUSOFRESIDENCE:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_STATUSOFRESIDENCE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_STATUSOFRESIDENCE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_STATUSOFRESIDENCE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_STATUSOFRESIDENCE_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default StatusOfResidence;