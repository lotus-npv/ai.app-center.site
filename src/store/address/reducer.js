import {
  GET_ADDRESS_ALL,
  GET_ADDRESS_ALL_SUCCESS,
  GET_ADDRESS_ALL_FAIL,
  GET_ADDRESS_ID_SUCCESS,
  GET_ADDRESS_ID_FAIL,
  SET_ADDRESS,
  SET_ADDRESS_SUCCESS,
  SET_ADDRESS_FAIL,
  UPDATE_ADDRESS,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    data: {},
    loading: false
  };
  
  const Address = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_ADDRESS_ALL:
        return {
          ...state,
          loading: true
        };
      case GET_ADDRESS_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          datas: action.payload,
        };
  
      case GET_ADDRESS_ALL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case SET_ADDRESS:
        return {
          ...state,
          data: action.payload,
        };
      case SET_ADDRESS_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_ADDRESS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_ADDRESS:
        return {
          ...state,
          loading: true,
          // data: action.payload,
        };
      case UPDATE_ADDRESS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case UPDATE_ADDRESS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_ADDRESS_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_ADDRESS_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Address;