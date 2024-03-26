import {
  GET_SYNDICATION_ALL,
  GET_SYNDICATION_ALL_SUCCESS,
  GET_SYNDICATION_ALL_FAIL,
  GET_SYNDICATION_ID_SUCCESS,
  GET_SYNDICATION_ID_FAIL,
  SET_SYNDICATION,
  SET_SYNDICATION_SUCCESS,
  SET_SYNDICATION_FAIL,
  UPDATE_SYNDICATION,
  UPDATE_SYNDICATION_SUCCESS,
  UPDATE_SYNDICATION_FAIL,
  DELETE_SYNDICATION_SUCCESS,
  DELETE_SYNDICATION_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    data: {},
    loading: false
  };
  
  const Syndication = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_SYNDICATION_ALL:
        return {
          ...state,
          loading: true
        };
      case GET_SYNDICATION_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          datas: action.payload,
        };
  
      case GET_SYNDICATION_ALL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case SET_SYNDICATION:
        return {
          ...state,
          data: action.payload,
        };
      case SET_SYNDICATION_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_SYNDICATION_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_SYNDICATION:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_SYNDICATION_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_SYNDICATION_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_SYNDICATION_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_SYNDICATION_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Syndication;