import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';

const CourseList = () => {
    const [courses, setCourses] = useState([]);  // State to hold the course data
    const [filteredCourses, setFilteredCourses] = useState([]); // State for filtered courses based on search
    const [error, setError] = useState('');      // State to hold any error messages
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const itemsPerPage = 5; // Number of items per page

    // Function to fetch course data from the backend
    const fetchCourseData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/course/getcourse');
            setCourses(response.data);
            setFilteredCourses(response.data); // Initialize filtered courses
        } catch (err) {
            setError('Error fetching course data');
            console.error(err); // Log the error for debugging purposes
        }
    };

    // Use the useEffect hook to fetch the course data on component mount
    useEffect(() => {
        fetchCourseData();
    }, []);

    // Handle search functionality
    useEffect(() => {
        const filtered = courses.filter(course =>
            course.coursename.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.duration.toString().includes(searchTerm)
        );
        setFilteredCourses(filtered);
        setCurrentPage(1); // Reset to the first page on new search
    }, [searchTerm, courses]);

    // Pagination Logic
    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Course Details</h1>

                {error && <p className="text-danger">{error}</p>}  {/* Display error if any */}

                {/* Search input */}
                <div className="form-group mb-3">
                    <input
                        type="text"
                        placeholder="Search by Course Name or Duration"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Render the course data in a table */}
                {filteredCourses.length > 0 ? (
                    <>
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="thead-danger">
                                <tr>
                                    <th>ID</th>
                                    <th>Course Name</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCourses.map((course) => (
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.coursename}</td>
                                        <td>{course.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <nav>
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button onClick={handlePrevPage} className="page-link">Previous</button>
                                </li>

                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button onClick={() => setCurrentPage(index + 1)} className="page-link">
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button onClick={handleNextPage} className="page-link">Next</button>
                                </li>
                            </ul>
                        </nav>
                    </>
                ) : (
                    <p className="text-center">No course data available</p>
                )}
            </div>
        </>
    );
};

export default CourseList;
