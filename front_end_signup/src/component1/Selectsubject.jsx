import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const SelectSubject = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null); // State for file upload

    // Fetch subjects for the dropdown
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:3000/subject/getsubject');
                setSubjects(response.data);
            } catch (err) {
                console.error('Error fetching subjects:', err);
                setError(err.message);
            }
        };
        fetchSubjects();
    }, []);

    // Fetch topics based on selected subject
    useEffect(() => {
        const fetchTopics = async () => {
            if (selectedSubject) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:3000/topic/getTopicsBySubject/${selectedSubject}`);
                    setTopics(response.data);
                } catch (err) {
                    console.error('Error fetching topics:', err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchTopics();
    }, [selectedSubject]);

    // Fetch questions based on selected topic
    const fetchQuestions = async () => {
        if (selectedTopic) {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/topic/getQuestionsByTopic/${selectedTopic}`);
                setQuestions(response.data);
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [selectedTopic]);

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Handle file upload
    const handleFileUpload = async () => {
        if (!selectedTopic || !file) {
            alert("Please select a topic and a file before uploading.");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            await axios.post(`http://localhost:3000/upload/upload-questions/${selectedTopic}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("File uploaded successfully.");
            await fetchQuestions(); // Fetch questions after successful upload
        } catch (err) {
            console.error("Error uploading file:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        setTopics([]);
        setSelectedTopic('');
        setQuestions([]);
    };

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
        setQuestions([]);
    };

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
            <h1>Select a Subject and Topic</h1>

            {/* Subject Dropdown */}
            <select onChange={handleSubjectChange} value={selectedSubject}>
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                    <option key={subject.subject_id} value={subject.subject_id}>
                        {subject.subject_name}
                    </option>
                ))}
            </select>

            {/* Topic Dropdown (appears after selecting a subject) */}
            {selectedSubject && (
                <select onChange={handleTopicChange} value={selectedTopic}>
                    <option value="">Select a topic</option>
                    {topics.map((topic) => (
                        <option key={topic.topic_id} value={topic.topic_id}>
                            {topic.topic_name}
                        </option>
                    ))}
                </select>
            )}

            {/* File Upload (appears after selecting a topic) */}
            {selectedTopic && (
                <div>
                    <h2>Upload File for Selected Topic</h2>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleFileUpload}>Upload File</button>
                </div>
            )}

            {/* Questions List (appears after selecting a topic) */}
            {selectedTopic && (
                <div>
                    <h2>Questions for Selected Topic</h2>
                    {questions.length > 0 ? (
                        <ul>
                            {questions.map((question, index) => (
                                <li key={question.question_id}>
                                    {index + 1}. {question.question_description.trim()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No questions available for this topic. Please upload a file.</p>
                    )}
                </div>
            )}
        </div>
        </>
    );
};

export default SelectSubject;
