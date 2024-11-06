import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UploadImage = () => {
    const id = localStorage.getItem("id");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    console.log('id =======', id)
    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile || !id) {
            alert("Please select a file and ensure a valid student ID.");
            return;
        }
        // Prepare the form data
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('id', id);  // Send the student ID in the formData

        try {
            const response = await axios.post(`http://localhost:3000/api/student/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            // Handle the response
            setUploadStatus(`Upload Successful: ${response.data.message}`);
            toast.success("Upload Successful")
            // setTimeout(() => {
            //     navigate(`/showImage`);
            //   }, 2000);
            
        } catch (error) {
            console.error("Error uploading the file", error);
            setUploadStatus("Error uploading the file");
            toast.danger('Error uploading the file..')
        }
    };

    useEffect(() => {
        if (!id) {
            setError("No ID found in localStorage.");
        }
    }, [id]); // This useEffect will check for the ID on component mount

    return (
        <>
        <NavBar />
        <div className='bg-warning d-flex flex-column justify-content-center align-items-center' style={{ height: '50vh' }}>
            <h1 className='text-center'>Upload File</h1>
            {error && <p className="text-danger text-center">{error}</p>}  {/* Display error if ID is missing */}
            <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
                <input type="file" onChange={handleFileChange} className='my-3' />
                <button type="submit" className='btn btn-primary'>Upload</button>
            </form>
            {uploadStatus && <p className='text-center'>{uploadStatus}</p>}
            <ToastContainer />
        </div>
    </>
    
    );
};

export default UploadImage;
