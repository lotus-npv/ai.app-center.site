import {
  GET_USERS_USER_ID_AND_TYPE,
  GET_USERS_USER_ID_AND_TYPE_SUCCESS,
  GET_USERS_USER_ID_AND_TYPE_FAIL,

  GET_USERS_ALL,
  GET_USERS_ALL_SUCCESS,
  GET_USERS_ALL_FAIL,

  GET_USERS_LOGIN,
  GET_USERS_LOGIN_SUCCESS,
  GET_USERS_LOGIN_FAIL,

  GET_USERS_ID,
  GET_USERS_ID_SUCCESS,
  GET_USERS_ID_FAIL,

  SET_USERS,
  SET_USERS_SUCCESS,
  SET_USERS_FAIL,
  UPDATE_USERS,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_FAIL,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_FAIL,
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: null,
    data: {},
    loading: false,
    user: null,
    error: ""
  };
  
  const Users = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_USERS_USER_ID_AND_TYPE:
        return {
          ...state,
          loading: true
        };
      case GET_USERS_USER_ID_AND_TYPE_SUCCESS:
        return {
          ...state,
          loading: false,
          datas: action.payload,
        };
      case GET_USERS_USER_ID_AND_TYPE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case GET_USERS_ALL:
        return {
          ...state,
          loading: true
        };
      case GET_USERS_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          datas: action.payload,
        };
      case GET_USERS_ALL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        
      case GET_USERS_LOGIN:
        return {
          ...state,
          loading: true
        };
      case GET_USERS_LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          isUserLogout: false,
        };
  
      case GET_USERS_LOGIN_FAIL:
        return {
          ...state,
          error: action.payload,
          user: null
        };

      case GET_USERS_ID:
        return {
          ...state,
          loading: true,
        };
      case GET_USERS_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          dataId: action.payload,
        };
      case GET_USERS_ID_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case SET_USERS:
        return {
          ...state,
          data: action.payload,
        };
      case SET_USERS_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_USERS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_USERS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_USERS_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_USERS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_USERS_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_USERS_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Users;