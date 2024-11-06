import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Make sure axios is imported
import "../App.css";
import ShowImage from './ShowImage';
import NavBar from './NavBar';


const Home = () => {
    const id = localStorage.getItem("id");  // Make sure this is retrieving the correct id

    const [students, setStudents] = useState([]);  // State to hold the student data
    const [error, setError] = useState('');        // State to hold any error messages

    // Function to fetch student data from the backend
    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/student/findStudentById/${id}`);
            console.log(response.data);

            // Assuming the response contains the student details directly
            if (response.data) {
                setStudents([response.data]); // Wrap in an array to match the map function
            } else {
                setError("Unexpected data format");
            }

        } catch (err) {
            setError('Error fetching student data');
            console.error(err); // Log the error for debugging purposes
        }
    };

    // Use the useEffect hook to fetch the student data on component mount
    useEffect(() => {
        if (id) {
            fetchStudentData();
        } else {
            setError("No ID found in localStorage.");
        }
    }, [id]);  // Add id as dependency to re-run effect if id changes

    return (
        <>
        <NavBar />
        <div className='bg-warning'>
            <h1 className='shining-text d-flex justify-content-center text-isprimary p-2'>Welcome to the Home Page</h1>
            <span className=' d-flex justify-content-center' >Select an option from the navigation bar.</span>
            
            <div className="container mt-5">
                <h1 className="mb-2 ">Student Details</h1>

                {error && <p className="text-danger">{error}</p>}  {/* Display error if any */}

                {/* Render the student data in a Bootstrap-styled table */}
                {students.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-striped  col-9 table-hover table-bordered">
                            <thead className="thead-danger">
                                <tr>
                                    <th>Profile Pic</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <ShowImage studentId={id} />
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.age}</td>
                                        <td>{student.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No student data available</p>
                )}
            </div>
        </div>
        </>
    );
};

export default Home;
