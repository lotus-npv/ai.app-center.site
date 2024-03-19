import React, { useEffect, useState } from 'react';
import axios from 'axios';
// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { uploadImageRequest } from 'store/actions';
import { uploadFile } from 'store/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ImageUploadForm({save}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filename, setFileName] = useState('');
    const [uploadDone, setUploadDone] = useState(false);
    const [avata, setAvata] = useState({
        key_license_id: 1,
        user_type: 'intern',
        object_id: 1, // Có thể chỉ nhận giá trị 'manual' hoặc 'automatic'
        path: './uploads',
        originalname: '',
        mimetype: null,
        size: null,
        description: '',
        create_at: null,
        create_by: 1,
        update_at: null,
        update_by: 1,
        delete_at: null,
        flag: 1
    })
    const notifySuccess = () => toast.success("Avata Upload Successfully", { autoClose: 2000 });
    const notifyError = () => toast.error("Avata Upload Fall", { autoClose: 2000 });

    // Khai bao du lieu
    const dispatch = useDispatch();

    const uploadedFilename = useSelector(state => state.reducer.uploadedFilename);
    const uploading = useSelector(state => state.reducer.uploading);
    const error = useSelector(state => state.reducer.error);

    const handleFileChange = (event) => {
        const f = event.target.files[0];
        setSelectedFile(f);
        console.log(selectedFile)
        setAvata({ ...avata, originalname: '', mimetype: f.type, size: f.size });
    };

    useEffect(() => {
        if (uploadDone) {
            axios.post('https://api.lotusocean-jp.com/api/avata/insert', { ...avata, originalname: filename }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setUploadDone(false);
            notifySuccess();
        }
    }, [filename]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('https://api.lotusocean-jp.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFileName(response.data.filename);
            setUploadDone(true);


            // if (selectedFile) {
            //     const formData = new FormData();
            //     formData.append('image', selectedFile);

            //     dispatch(uploadImageRequest(formData));
            //     // dispatch(uploadFile(formData));
            // } else {
            //     alert('Please select a file.');
            // }
            // console.log('File uploaded successfully:', uploadedFilename);

        } catch (error) {
            console.error('Error uploading file:', error);
            notifyError();
            // Xử lý lỗi khi upload file
        }
    };



    console.log(save)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            <p>{save?'true':'false'}</p>
            <ToastContainer />
        </div>
    );
}

export default ImageUploadForm;