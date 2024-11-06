import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowImage from './ShowImage';
import NavBar from './NavBar';

const Students = () => {
    const [students, setStudents] = useState([]);  // State to hold the student data
    const [error, setError] = useState('');        // State to hold any error messages
    const [currentPage, setCurrentPage] = useState(1);  // State to track the current page
    const itemsPerPage = 5;  // Number of students to display per page

    // Function to fetch student data from the backend
    const fetchStudentData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/student/GettingallProfiles');
            console.log(response.data);
            
            if (response.data) {
                setStudents(response.data);
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
        fetchStudentData();
    }, []);

    // Pagination logic: calculate start and end index
    const indexOfLastStudent = currentPage * itemsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);  // Students on the current page

    // Calculate total pages
    const totalPages = Math.ceil(students.length / itemsPerPage);

    // Handler to navigate between pages
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handler for previous button
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Handler for next button
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <h1 className="mb-2">Student Details</h1>
                
                {error && <p className="text-danger">{error}</p>}  {/* Display error if any */}

                {/* Render the student data in a Bootstrap-styled table */}
                {currentStudents.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="thead-danger">
                                <tr>
                                    <th>Profile</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStudents.map((student) => (
                                    <tr key={student.id}>
                                        <td>
                                            <ShowImage studentId={student.id}/>
                                        </td>
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

                {/* Pagination controls */}
                <nav>
                    <ul className="pagination justify-content-center">
                        {/* Previous Button */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button 
                                onClick={handlePrevPage} 
                                className="page-link"
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className="page-link">
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        {/* Next Button */}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button 
                                onClick={handleNextPage} 
                                className="page-link"
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Students;
