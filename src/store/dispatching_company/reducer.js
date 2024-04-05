import {
  GET_DISPATCHINGCOMPANY_ALL,
  GET_DISPATCHINGCOMPANY_ALL_SUCCESS,
  GET_DISPATCHINGCOMPANY_ALL_FAIL,
  GET_DISPATCHINGCOMPANY_USERID,
  GET_DISPATCHINGCOMPANY_USERID_SUCCESS,
  GET_DISPATCHINGCOMPANY_USERID_FAIL,
  GET_DISPATCHINGCOMPANY_ID_SUCCESS,
  GET_DISPATCHINGCOMPANY_ID_FAIL,
  SET_DISPATCHINGCOMPANY,
  SET_DISPATCHINGCOMPANY_SUCCESS,
  SET_DISPATCHINGCOMPANY_FAIL,
  UPDATE_DISPATCHINGCOMPANY,
  UPDATE_DISPATCHINGCOMPANY_SUCCESS,
  UPDATE_DISPATCHINGCOMPANY_FAIL,
  DELETE_DISPATCHINGCOMPANY_SUCCESS,
  DELETE_DISPATCHINGCOMPANY_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    dataAll: [],
    datas: [],
    data: {}
  };
  
  const DispatchingCompany = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_DISPATCHINGCOMPANY_ALL:
        return {
          ...state,
        };
      case GET_DISPATCHINGCOMPANY_ALL_SUCCESS:
        return {
          ...state,
          dataAll: action.payload,
        };
  
      case GET_DISPATCHINGCOMPANY_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_DISPATCHINGCOMPANY_USERID:
        return {
          ...state,
        };
      case GET_DISPATCHINGCOMPANY_USERID_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_DISPATCHINGCOMPANY_USERID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_DISPATCHINGCOMPANY:
        return {
          ...state,
          data: action.payload,
        };
      case SET_DISPATCHINGCOMPANY_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_DISPATCHINGCOMPANY_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_DISPATCHINGCOMPANY:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_DISPATCHINGCOMPANY_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_DISPATCHINGCOMPANY_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_DISPATCHINGCOMPANY_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_DISPATCHINGCOMPANY_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default DispatchingCompany;