import {
  GET_RECEIVINGFACTORY_ALL,
  GET_RECEIVINGFACTORY_ALL_SUCCESS,
  GET_RECEIVINGFACTORY_ALL_FAIL,
  GET_RECEIVINGFACTORY_USERID,
  GET_RECEIVINGFACTORY_USERID_SUCCESS,
  GET_RECEIVINGFACTORY_USERID_FAIL,
  GET_RECEIVINGFACTORY_ID_SUCCESS,
  GET_RECEIVINGFACTORY_ID_FAIL,
  SET_RECEIVINGFACTORY,
  SET_RECEIVINGFACTORY_SUCCESS,
  SET_RECEIVINGFACTORY_FAIL,
  UPDATE_RECEIVINGFACTORY,
  UPDATE_RECEIVINGFACTORY_SUCCESS,
  UPDATE_RECEIVINGFACTORY_FAIL,
  DELETE_RECEIVINGFACTORY_SUCCESS,
  DELETE_RECEIVINGFACTORY_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    data: null,
    loading: false
  };
  
  const ReceivingFactory = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_RECEIVINGFACTORY_ALL:
        return {
          ...state,
        };
      case GET_RECEIVINGFACTORY_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_RECEIVINGFACTORY_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_RECEIVINGFACTORY_USERID:
        return {
          ...state,
          loading: true,
        };
      case GET_RECEIVINGFACTORY_USERID_SUCCESS:
        return {
          ...state,
          loading: false,
          datas: action.payload,
        };
  
      case GET_RECEIVINGFACTORY_USERID_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case SET_RECEIVINGFACTORY:
        return {
          ...state,
          loading: true
          // data: action.payload,
        };
      case SET_RECEIVINGFACTORY_SUCCESS:
        return {
          ...state,
          data: action.payload,
          loading: false
        };
  
      case SET_RECEIVINGFACTORY_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_RECEIVINGFACTORY:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_RECEIVINGFACTORY_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_RECEIVINGFACTORY_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_RECEIVINGFACTORY_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_RECEIVINGFACTORY_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default ReceivingFactory;