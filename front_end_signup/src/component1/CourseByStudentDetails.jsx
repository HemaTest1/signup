import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../App.css";
import { toast } from 'react-toastify';
import ShowImage from './ShowImage';
import NavBar from './NavBar';

const CourseByStudentDetails = () => {
    const { id } = useParams(); // Get the course ID from the URL
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]); // For search functionality
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/stdcourse/getStudentsByCourse/${id}`);
                setStudents(response.data.students); // Adjust this based on your API response structure
                setFilteredStudents(response.data.students); // Initialize filtered students
                setCourse(response.data);
                toast.info("Students fetched successfully");
            } catch (err) {
                console.error("Error fetching student details:", err);
                setError('Failed to fetch student details');
                toast.error("Error fetching students");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchStudents(); // Fetch students if ID is present
        } else {
            setError('No course ID found');
            setLoading(false);
        }
    }, [id]);

    // Handle search functionality
    useEffect(() => {
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.phone.toString().includes(searchTerm)
        );
        setFilteredStudents(filtered);
        setCurrentPage(1); // Reset to the first page on new search
    }, [searchTerm, students]);

    // Pagination Logic
    const indexOfLastStudent = currentPage * itemsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

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

    if (loading) {
        return <div>Loading student details...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <>
            <NavBar />
            <div className='container'>
                <h1>Enrolled Students</h1>
                <h1>{course.coursename}</h1>

                {/* Search input */}
                <div className="form-group mb-3">
                    <input
                        type="text"
                        placeholder="Search by Name, Email, or Phone"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredStudents.length === 0 ? (
                    <p>No students enrolled in this course.</p>
                ) : (
                    <>
                        <table className='table table-striped table-hover table-bordered'>
                            <thead>
                                <tr>
                                    <td>Profile Pic</td>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStudents.map((student) => (
                                    <tr key={student.id}>
                                        <td><ShowImage studentId={student.id} /></td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.age}</td>
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

export default CourseByStudentDetails;
