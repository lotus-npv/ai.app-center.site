import {
  GET_INTERN_ALL,
  GET_INTERN_ALL_SUCCESS,
  GET_INTERN_ALL_FAIL,
  GET_INTERN_ALLINFO,
  GET_INTERN_ALLINFO_SUCCESS,
  GET_INTERN_ALLINFO_FAIL,
  GET_INTERN_USERID,
  GET_INTERN_USERID_SUCCESS,
  GET_INTERN_USERID_FAIL,

  GET_INTERN_KEYID,
  GET_INTERN_KEYID_SUCCESS,
  GET_INTERN_KEYID_FAIL,

  GET_INTERN_ID_SUCCESS,
  GET_INTERN_ID_FAIL,
  SET_INTERN,
  SET_INTERN_SUCCESS,
  SET_INTERN_FAIL,
  UPDATE_INTERN,
  UPDATE_INTERN_SUCCESS,
  UPDATE_INTERN_FAIL,
  DELETE_INTERN,
  DELETE_INTERN_SUCCESS,
  DELETE_INTERN_FAIL,
  OPEN_MODAL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataKeyId: [],
    data: {},
    dataAll: [],
    isOpen: 'init text',
    loading: false
  };
  
  const Intern = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_INTERN_ALL:
        return {
          ...state,
          loading: true
        };
      case GET_INTERN_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          dataAll: action.payload,
        };
  
      case GET_INTERN_ALL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        
      case GET_INTERN_ALLINFO:
        return {
          ...state,
          loading: true,
        };
      case GET_INTERN_ALLINFO_SUCCESS:
        return {
          ...state,
          loading: false,
          dataAll: action.payload,
        };
      case GET_INTERN_ALLINFO_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case GET_INTERN_USERID:
        return {
          ...state,
          loading: true,
        };
      case GET_INTERN_USERID_SUCCESS:
        return {
          ...state,
          loading: false,
          datas: action.payload,
        };
      case GET_INTERN_USERID_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case GET_INTERN_KEYID:
        return {
          ...state,
          loading: true,
        };
      case GET_INTERN_KEYID_SUCCESS:
        return {
          ...state,
          loading: false,
          dataKeyId: action.payload,
        };
      case GET_INTERN_KEYID_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case SET_INTERN:
        return {
          ...state,
          loading: true,
          // data: action.payload,
        };
      case SET_INTERN_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
  
      case SET_INTERN_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_INTERN:
        return {
          ...state,
          loading: true,
          // data: action.payload,
        };
      case UPDATE_INTERN_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case UPDATE_INTERN_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_INTERN:
        return {
          ...state,
          loading: true,
          data: action.payload,
        };
      case DELETE_INTERN_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case DELETE_INTERN_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Intern;