import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NavBar from './NavBar';

const Topicsbysubjectid = () => {
    const { subjectId } = useParams();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/topic/getTopicsBySubject/${subjectId}`);
                setTopics(response.data);
                console.log(response.data, "=====================> response")
            } catch (err) {
                console.error(`Error fetching topics for subject ${subjectId}:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, [subjectId]);

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
            <h1 style={{ textAlign: 'center', color: 'blue' }}>Topics for Subject {subjectId}</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Topic ID</th>
                        <th>Topic Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map((topic) => (
                        <tr key={topic.topic_id}>
                            <td>{topic.topic_id}</td>
                            <td>{topic.topic_name}</td>
                            <td>
                                <Link to={`/questions/${topic.topic_id}`}>
                                    <button className="btn btn-primary">
                                        Enroll Questions
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default Topicsbysubjectid;
