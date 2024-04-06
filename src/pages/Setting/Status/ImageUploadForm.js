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
    const notifySuccess = () => toast.success("Avata Upload Successfully", { autoClose: 2000 });
    const notifyError = () => toast.error("Avata Upload Fall", { autoClose: 2000 });

    const handleFileChange = (event) => {
        const f = event.target.files[0];
        setSelectedFile(f);
        console.log(selectedFile)
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:3010/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFileName(response.data.filename);

        } catch (error) {
            console.error('Error uploading file:', error);
            notifyError();
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