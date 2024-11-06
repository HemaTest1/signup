// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ShowImage = ({studentId}) => {
//   // const [studentId] = useState(localStorage.getItem('id') || ''); // Get ID from localStorage
//   const [studentDetails, setStudentDetails] = useState(null);
//   const [image, setImage] = useState(''); // State to store the base64 image
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       if (!studentId) {
//         setError('Student ID is required');
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch student details without image
//         // const studentResponse = await axios.get(`http://localhost:3000/api/student/findStudentByIdDetails/${studentId}`);
//         // setStudentDetails(studentResponse.data);

//         // Fetch student image
//         const imageResponse = await axios.get(`http://localhost:3000/api/student/getStudentImage/${studentId}`, {
//           responseType: 'arraybuffer', // Get the image as array buffer
//         });
//         console.log("image res ;", imageResponse)
         
        
//         // Convert the array buffer to base64 string
//         const base64Image = btoa(
//           new Uint8Array(imageResponse.data).reduce(
//             (data, byte) => data + String.fromCharCode(byte),
//             ''
//           )
//         );

//         // Set the base64 image with correct content type
//         setImage(`data:${imageResponse.headers['content-type']};base64,${base64Image}`);
//       } catch (error) {
//         console.error('Error fetching student data:', error);
//         setError('Failed to fetch student data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentData();
//   }, [studentId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-danger">{error}</p>;
//   }

//   return (
//     <div>
//       {/* <h1>Student Details</h1> */}
//       {/* {studentDetails && (
//         <div>
//           <p>Name: {studentDetails.name}</p>
//           <p>Email: {studentDetails.email}</p>
//         </div>
//       )} */}
//       {/* <h1>Student Image</h1> */}
//       {image ? (
//         <img
//           src={image} // Use the base64 image as src
//           alt="student"
//           style={{ width: '50px', height: '50px' }}
//         />
//       ) : (
//         <p>No image found for this student.</p>
//       )}
//     </div>
//   );
// };

// export default ShowImage;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowImage = ({ studentId }) => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  //  studentId = localStorage.getItem("id");
 
   console.log(studentId, "==========================>studentIdhjkl")
  useEffect(() => {
    const fetchStudentData = async () => {
      if (!studentId) {
        setError('Student ID is required');
        setLoading(false);
        return;
      }

      try {
        const imageResponse = await axios.get(`http://localhost:3000/api/student/getStudentImage/${studentId}`, {
          responseType: 'arraybuffer',
        });
        
        console.log("Image response headers:", imageResponse.headers);
        console.log("Image response data:", imageResponse.data);
        
        const base64Image = btoa(
          new Uint8Array(imageResponse.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );

        setImage(`data:${imageResponse.headers['content-type']};base64,${base64Image}`);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to fetch student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
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
        <img src={image} alt="student" style={{ width: '50px', height: '50px' }} />
      ) : (
        <p>No image found for this student.</p>
      )}
    </div>
  );
};

export default ShowImage;
