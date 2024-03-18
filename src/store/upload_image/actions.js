export const uploadFileRequest = (file) => ({
    type: 'UPLOAD_IMAGE_REQUEST',
    payload: file,
  });
  
  export const uploadFileSuccess = (data) => ({
    type: 'UPLOAD_IMAGE_SUCCESS',
    payload: data,
  });
  
  export const uploadFileFailure = (error) => ({
    type: 'UPLOAD_IMAGE_FAILURE',
    payload: error,
  });