import {
  GET_ALIENREGISTRATIONCARD_ALL,
  GET_ALIENREGISTRATIONCARD_ALL_SUCCESS,
  GET_ALIENREGISTRATIONCARD_ALL_FAIL,
  GET_ALIENREGISTRATIONCARD_ALLINFO,
  GET_ALIENREGISTRATIONCARD_ALLINFO_SUCCESS,
  GET_ALIENREGISTRATIONCARD_ALLINFO_FAIL,
  GET_ALIENREGISTRATIONCARD_ID,
  GET_ALIENREGISTRATIONCARD_ID_SUCCESS,
  GET_ALIENREGISTRATIONCARD_ID_FAIL,
  SET_ALIENREGISTRATIONCARD,
  SET_ALIENREGISTRATIONCARD_SUCCESS,
  SET_ALIENREGISTRATIONCARD_FAIL,
  UPDATE_ALIENREGISTRATIONCARD,
  UPDATE_ALIENREGISTRATIONCARD_SUCCESS,
  UPDATE_ALIENREGISTRATIONCARD_FAIL,
  DELETE_ALIENREGISTRATIONCARD_SUCCESS,
  DELETE_ALIENREGISTRATIONCARD_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: {}
  };
  
  const AlienRegistrationCard = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_ALIENREGISTRATIONCARD_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
      case GET_ALIENREGISTRATIONCARD_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_ALIENREGISTRATIONCARD_ALLINFO_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
      case GET_ALIENREGISTRATIONCARD_ALLINFO_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_ALIENREGISTRATIONCARD_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_ALIENREGISTRATIONCARD_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_ALIENREGISTRATIONCARD:
        return {
          ...state,
          data: action.payload,
        };
      case SET_ALIENREGISTRATIONCARD_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_ALIENREGISTRATIONCARD_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_ALIENREGISTRATIONCARD:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_ALIENREGISTRATIONCARD_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_ALIENREGISTRATIONCARD_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_ALIENREGISTRATIONCARD_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_ALIENREGISTRATIONCARD_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default AlienRegistrationCard;