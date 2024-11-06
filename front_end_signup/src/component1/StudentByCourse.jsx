import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ShowImage from './ShowImage';
import NavBar from './NavBar';

const StudentByCourse = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]); // For search functionality
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/student/getallstudent');
                setStudents(response.data);
                setFilteredStudents(response.data); // Initially set filtered students to all students
            } catch (err) {
                setError('Error fetching student data.');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    // Handle search
    useEffect(() => {
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.age.toString().includes(searchTerm)
        );
        setFilteredStudents(filtered);
    }, [searchTerm, students]);

    const handleViewCourse = (id) => {
        navigate(`/CourseByStudent/${id}`); // Navigate to the students page with course ID
    };

    // Pagination Logic
    const indexOfLastStudent = currentPage * itemsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
            <div className="container mt-4">
                <h1>Students List By Course</h1>

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

                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Profile pic</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Enrolled Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((student) => (
                            <tr key={student.id}>
                                <td><ShowImage studentId={student.id} /></td>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>{student.phone}</td>
                                <td>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => handleViewCourse(student.id)}
                                    >
                                        Enrolled Course
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <nav>
                    <ul className="pagination justify-content-center">
                        {/* Previous Button */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button onClick={handlePrevPage} className="page-link">Previous</button>
                        </li>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => handlePageChange(index + 1)} className="page-link">
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        {/* Next Button */}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button onClick={handleNextPage} className="page-link">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default StudentByCourse;
