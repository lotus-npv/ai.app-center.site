import React, { useState } from 'react';
import axios from 'axios';

function ImageUploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
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

    const handleFileChange = (event) => {
        const f = event.target.files[0];
        setSelectedFile(f);
        console.log(selectedFile)
        setAvata({ ...avata, mimetype: f.type, size: f.size });
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
            const uploadedFilename = response.data.filename;

            // Hàm để kiểm tra xem giá trị uploadedFilename đã được nhận hay chưa
            const checkOriginalName = async () => {
                if (!uploadedFilename) {
                    console.log('Waiting for originalname...');
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Chờ 1 giây
                    // const response = await axios.get('http://localhost:3010/api/avata'); // Gửi yêu cầu GET để lấy thông tin avata
                    uploadedFilename = response.data.originalname; // Cập nhật uploadedFilename từ phản hồi
                    await checkOriginalName(); // Tiếp tục kiểm tra
                }
            };

            await checkOriginalName(); // Bắt đầu kiểm tra

            if (uploadedFilename) {
                setAvata({ ...avata, originalname: uploadedFilename });

                // Gửi yêu cầu POST để chèn thông tin avata vào cơ sở dữ liệu
                await axios.post('http://localhost:3010/api/avata/insert', avata, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Thực hiện các thao tác tiếp theo sau khi upload thành công
            } else {
                console.error('No filename received in the response');
            }

            // Thực hiện các thao tác tiếp theo sau khi upload thành công
        } catch (error) {
            console.error('Error uploading file:', error);
            // Xử lý lỗi khi upload file
        }
    };

    console.log(avata)

    return (
        <div>
            <h2>Image Upload Form aa</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default ImageUploadForm;