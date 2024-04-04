import {
  GET_NOTI_ALL,
  GET_NOTI_ALL_SUCCESS,
  GET_NOTI_ALL_FAIL,
  GET_NOTI_USERID,
  GET_NOTI_USERID_SUCCESS,
  GET_NOTI_USERID_FAIL,
  GET_NOTI_ID_SUCCESS,
  GET_NOTI_ID_FAIL,
  SET_NOTI,
  SET_NOTI_SUCCESS,
  SET_NOTI_FAIL,
  UPDATE_NOTI,
  UPDATE_NOTI_SUCCESS,
  UPDATE_NOTI_FAIL,
  DELETE_NOTI_SUCCESS,
  DELETE_NOTI_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    data: null,
    loading: false
  };
  
  const Noti = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_NOTI_ALL:
        return {
          ...state,
        };
      case GET_NOTI_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_NOTI_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_NOTI_USERID:
        return {
          ...state,
          loading: true,
        };
      case GET_NOTI_USERID_SUCCESS:
        return {
          ...state,
          loading: false,
          datas: action.payload,
        };
  
      case GET_NOTI_USERID_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case SET_NOTI:
        return {
          ...state,
          loading: true
          // data: action.payload,
        };
      case SET_NOTI_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
  
      case SET_NOTI_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_NOTI:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_NOTI_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_NOTI_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_NOTI_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_NOTI_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Noti;