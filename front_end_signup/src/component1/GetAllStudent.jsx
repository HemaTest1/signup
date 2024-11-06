import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllStudent = ({ studentId }) => {
  const [image, setImage] = useState(''); // State to store the base64 image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageResponse = await axios.get(`http://localhost:3000/api/student/GettingProfile/${studentId}`, {
          responseType: 'arraybuffer', // Get the image as array buffer
        });

        // Convert the array buffer to base64 string
        const base64Image = btoa(
          new Uint8Array(imageResponse.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );

        // Set the base64 image with correct content type
        setImage(`data:${imageResponse.headers['content-type']};base64,${base64Image}`);
      } catch (error) {
        console.error('Error fetching student image:', error);
        setError('Failed to fetch student image');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchImage();
    }
  }, [studentId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      {image ? (
        <img
          src={image} // Use the base64 image as src
          alt={`Student ${studentId}`}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ) : (
        <p>No image found for this student.</p>
      )}
    </div>
  );
};

export default GetAllStudent;
