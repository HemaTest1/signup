import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Subject = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:3000/subject/getsubject');
                setSubjects(response.data);
            } catch (err) {
                console.error('Error fetching subjects:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <NavBar />
        
        <div>
            <h1 style={{ textAlign: 'center', color: 'blue' }}>Subject List</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Subject ID</th>
                        <th>Subject Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.subject_id}>
                            <td>{subject.subject_id}</td>
                            <td>{subject.subject_name}</td>
                            <td>
                                <button
                                    onClick={() => navigate(`/topics/${subject.subject_id}`)}
                                    className="btn btn-primary"
                                >
                                    Enroll Topics
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default Subject;
