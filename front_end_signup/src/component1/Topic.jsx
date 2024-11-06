import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const Topics = () => {
    const [topics, setTopics] = useState([]); // State to hold topics
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('http://localhost:3000/topic/gettopics');
                setTopics(response.data); // Set the fetched topics to state
            } catch (err) {
                console.error('Error fetching topics:', err);
                setError(err.message); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false after the request
            }
        };

        fetchTopics(); // Call the fetch function
    }, []); // Empty dependency array means this runs once after the component mounts

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Error state
    }

    return (
        <>
        <NavBar />
        <div>
            <h1>Topic List</h1>
            <ul>
                {topics.map(topic => (
                    <li key={topic.topic_id}> {/* Use a unique key */}
                        <h2>{topic.topic_name}</h2> {/* Display topic details */}
                        {/* <p>Subject ID: {topic.subject_id}</p> Display subject ID or any other relevant information */}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default Topics;
