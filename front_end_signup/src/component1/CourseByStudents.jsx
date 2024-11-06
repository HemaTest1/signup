import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../app.css'; // Assuming you have some styles defined
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from './NavBar';

const CourseByStudents = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]); // For search functionality
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page
    const navigate = useNavigate();

    // Fetch courses from the API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/course/getcourse`);
                setCourses(response.data);
                setFilteredCourses(response.data); // Initialize filtered courses
                toast.success("Courses fetched successfully");
            } catch (err) {
                setError('Error fetching courses. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
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

    const handleViewStudents = (id) => {
        navigate(`/StudentsByCourse/${id}`); // Navigate to the students page with course ID
    };

    if (loading) {
        return <div>Loading courses...</div>; // Show loading state
    }

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    return (
        <>
            <NavBar />
            
            <div className='container mt-4' >
                
                <h1>Course List</h1>
                
                   {/* Search input */}
                   <div className="form-group mb-3">
                    <input
                        type="text"
                        placeholder="Search by Name, Email, or Age"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredCourses.length === 0 ? (
                    <p>No courses available.</p>
                ) : (
                    <>
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="thead-danger">
                                <tr>
                                    <th>ID</th>
                                    <th>Course Name</th>
                                    <th>Duration</th>
                                    <th>Enrolled Students</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCourses.map((course) => (
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.coursename}</td>
                                        <td>{course.duration}</td>
                                        <td>
                                            <button
                                                className='btn btn-primary'
                                                onClick={() => handleViewStudents(course.id)} // Call the handler on click
                                            >
                                                Enrolled Students
                                            </button>
                                        </td>
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
                )}
            </div>
        </>
    );
};

export default CourseByStudents;
