import React, { useState } from 'react';
import axios from 'axios';

function ImageUploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [avata, setAvata] = useState({
        key_license_id: 1,
        user_type: 'intern',
        object_id: 1, // Có thể chỉ nhận giá trị 'manual' hoặc 'automatic'
        path: null,
        originalname: null,
        mimetype: null,
        size: null,
        description: null,
        create_at: null,
        create_by: 1,
        update_at: null,
        update_by: 1,
        delete_at: null,
        flag: 1
    })

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
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

            console.log('File uploaded successfully:', response.data);
            setAvata({...avata, path: selectedFile.path, originalname: response.data.filename, mimetype: selectedFile.mimetype, size: selectedFile.size});
            await axios.post('http://localhost:3010/api/avata/insert', avata, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            // Thực hiện các thao tác tiếp theo sau khi upload thành công
        } catch (error) {
            console.error('Error uploading file:', error);
            // Xử lý lỗi khi upload file
        }
    };

    return (
        <div>
            <h2>Image Upload Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default ImageUploadForm;