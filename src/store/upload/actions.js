import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
} from "./actionTypes";

export const uploadFile = (file) => ({
  type: UPLOAD_FILE,
  payload: file
});

export const uploadFileSuccess = data => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: data,
});

export const uploadFileFail = error => ({
  type: UPLOAD_FILE_FAIL,
  payload: error,
});

