import {
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
  } from "./actionTypes";
  
  const INIT_STATE = {
    data: {}
  };
  
  const UploadFile = (state = INIT_STATE, action) => {
    switch (action.type) {
      case UPLOAD_FILE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case UPLOAD_FILE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default UploadFile;