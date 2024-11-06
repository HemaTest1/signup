import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const Excelsheet = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select an Excel file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post('http://localhost:3000/upload/upload-questions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message || "File uploaded and processed successfully.");
    } catch (error) {
      setMessage("An error occurred while uploading.");
    }
  };

  return (
    <>
    <NavBar />
    <div className='container d-flex justify-content-center '>
    
    <div className='container bg-warning '>
      <h2>Upload Excel File</h2>
      <form onSubmit={handleUpload} >
        <input 
          type="file" 
          accept=".xlsx, .xls" 
          onChange={handleFileChange} 
         
        />
        <button  className='btn btn-success'
          type="submit" >
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
    </>
  );
};

export default Excelsheet;
