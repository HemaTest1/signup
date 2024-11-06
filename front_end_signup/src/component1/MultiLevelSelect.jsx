import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MultiLevelSelect = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState({});
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [score, setScore] = useState(null);

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

    // Fetch questions based on selected topic and options for each question
    useEffect(() => {
        const fetchQuestions = async () => {
            if (selectedTopic) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:3000/topic/getQuestionsByTopic/${selectedTopic}`);
                    setQuestions(response.data);

                    // Fetch options for each question
                    const optionsData = {};
                    await Promise.all(
                        response.data.map(async (question) => {
                            const optionsResponse = await axios.get(`http://localhost:3000/option/options/${question.question_id}`);
                            optionsData[question.question_id] = optionsResponse.data;
                        })
                    );
                    setOptions(optionsData);
                } catch (err) {
                    console.error('Error fetching questions or options:', err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchQuestions();
    }, [selectedTopic]);

    // Update selected answers for each question
    const handleAnswerChange = (questionId, optionId) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));
    };

    // Handle submission to check answers
    const handleSubmit = async () => {
        if (Object.keys(selectedAnswers).length !== questions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        let scoreCount = 0;

        try {
            await Promise.all(
                Object.entries(selectedAnswers).map(async ([questionId, selectedOptionId]) => {
                    const response = await axios.get(`http://localhost:3000/api/question/${questionId}`);
                    const correctOptionId = response.data.correct_answer_id; // Assuming the API returns the correct answer with this key
                    
                    if (selectedOptionId === correctOptionId) {
                        scoreCount += 1;
                    }
                })
            );

            setScore(scoreCount);
        } catch (err) {
            console.error('Error checking answers:', err);
            setError(err.message);
        }
    };

    return (
        <div style={{ backgroundColor: '#ffc107', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Select a Subject and Topic</h1>

            {/* Subject Dropdown */}
            <select onChange={(e) => setSelectedSubject(e.target.value)} value={selectedSubject}>
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                    <option key={subject.subject_id} value={subject.subject_id}>
                        {subject.subject_name}
                    </option>
                ))}
            </select>

            {/* Topic Dropdown */}
            {selectedSubject && (
                <select onChange={(e) => setSelectedTopic(e.target.value)} value={selectedTopic}>
                    <option value="">Select a topic</option>
                    {topics.map((topic) => (
                        <option key={topic.topic_id} value={topic.topic_id}>
                            {topic.topic_name}
                        </option>
                    ))}
                </select>
            )}

            {/* Questions List with Options */}
            {selectedTopic && (
                <div>
                    <h2>Questions for Selected Topic</h2>
                    {questions.length > 0 ? (
                        questions.map((question) => (
                            <div key={question.question_id}>
                                <p><strong>{question.question_description.trim()}</strong></p>
                                {options[question.question_id] ? (
                                    options[question.question_id].map((option) => (
                                        <label key={option.option_id} style={{ display: 'block' }}>
                                            <input
                                                type="radio"
                                                name={`question_${question.question_id}`}
                                                value={option.option_id}
                                                onChange={() => handleAnswerChange(question.question_id, option.option_id)}
                                            />
                                            {option.option_description}
                                        </label>
                                    ))
                                ) : (
                                    <p>Loading options...</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No questions available for this topic.</p>
                    )}
                    {/* Submit Button */}
                    <button onClick={handleSubmit}>Submit Answers</button>

                    {/* Display Score */}
                    {score !== null && (
                        <div>
                            <h3>Your Score: {score}</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiLevelSelect;
