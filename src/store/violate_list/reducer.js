import {
  GET_VIOLATELIST_ALL,
  GET_VIOLATELIST_ALL_SUCCESS,
  GET_VIOLATELIST_ALL_FAIL,
  GET_VIOLATELIST_ID,
  GET_VIOLATELIST_ID_SUCCESS,
  GET_VIOLATELIST_ID_FAIL,
  SET_VIOLATELIST,
  SET_VIOLATELIST_SUCCESS,
  SET_VIOLATELIST_FAIL,
  UPDATE_VIOLATELIST,
  UPDATE_VIOLATELIST_SUCCESS,
  UPDATE_VIOLATELIST_FAIL,
  DELETE_VIOLATELIST_SUCCESS,
  DELETE_VIOLATELIST_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: {}
  };
  
  const ViolateList = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_VIOLATELIST_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_VIOLATELIST_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_VIOLATELIST_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_VIOLATELIST_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_VIOLATELIST:
        return {
          ...state,
          data: action.payload,
        };
      case SET_VIOLATELIST_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_VIOLATELIST_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_VIOLATELIST:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_VIOLATELIST_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_VIOLATELIST_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_VIOLATELIST_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_VIOLATELIST_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default ViolateList;