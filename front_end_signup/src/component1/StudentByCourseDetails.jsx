import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

const StudentByCourseDetails = () => {
    const { id } = useParams();  // Get the student ID from the route params
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const [filteredCourses, setFilteredCourses] = useState([]); // State for filtered courses

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/stdcourse/getCourseByStudent/${id}`);
                setStudent(response.data);
                setFilteredCourses(response.data.courses || []); // Initialize filtered courses
            } catch (err) {
                setError('Error fetching student details.');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentData();
    }, [id]);

    // Handle search functionality
    useEffect(() => {
        if (student) {
            const filtered = student.courses.filter(course =>
                course.coursename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.duration.toString().includes(searchTerm)
            );
            setFilteredCourses(filtered);
            setCurrentPage(1); // Reset to the first page on new search
        }
    }, [searchTerm, student]);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <>
            <NavBar />
            <div>
                <h1>Student Details</h1>
                
                {student && (
                    <div>
                        <p><strong>ID:</strong> {student.id}</p>
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Age:</strong> {student.age}</p>
                        <p><strong>Phone:</strong> {student.phone}</p>

                        <h2>Enrolled Courses</h2>

                        {/* Search input for courses */}
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                placeholder="Search by Course Name or Duration"
                                className="form-control"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {currentCourses.length > 0 ? (
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
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
                        ) : (
                            <p>No courses enrolled.</p>
                        )}

                        {/* Pagination Controls */}
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
                    </div>
                )}
            </div>
        </>
    );
};

export default StudentByCourseDetails;
