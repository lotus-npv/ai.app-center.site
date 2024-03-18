import React, { useEffect, useState } from 'react';
import axios from 'axios';
// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { uploadImageRequest } from 'store/actions';
import { uploadFile } from 'store/actions';

function ImageUploadForm() {
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

    // Khai bao du lieu
    const dispatch = useDispatch();

    const uploadedFilename = useSelector(state => state.UploadFile.uploadedFilename);
    const uploading = useSelector(state => state.UploadFile.uploading);
    const error = useSelector(state => state.UploadFile.error);

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
            console.log('úpload')
            // if (selectedFile) {
            //     const formData = new FormData();
            //     formData.append('image', selectedFile);

            //     // dispatch(uploadImageRequest(formData));
            //     dispatch(uploadFile(formData));
            // } else {
            //     alert('Please select a file.');
            // }
            // console.log('File uploaded successfully:', uploadedFilename);

            
            setFileName(response.data.filename);
            setUploadDone(true);

        } catch (error) {
            console.error('Error uploading file:', error);
            // Xử lý lỗi khi upload file
        }
    };



    console.log(uploadedFilename)
    return (
        <div>
            <h2>Image Upload Form a</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" disabled={uploading}>Upload</button>
            </form>
            {uploading && <p>Uploading...</p>}
            {error && <p>Error: {error}</p>}
            <p>{uploadedFilename}</p>
        </div>
    );
}

export default ImageUploadForm;