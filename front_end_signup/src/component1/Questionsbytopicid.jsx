import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const Questionsbytopicid = () => {
    const { topicId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [score, setScore] = useState(null);
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Retrieve student_id from localStorage
    const studentId = localStorage.getItem("id");

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/topic/getQuestionsByTopic/${topicId}`);
                const questionsWithOptions = await Promise.all(response.data.map(async question => {
                    const optionsResponse = await axios.get(`http://localhost:3000/option/options/${question.question_id}`);
                    return { ...question, options: optionsResponse.data };
                }));
                setQuestions(questionsWithOptions);
            } catch (err) {
                console.error(`Error fetching questions for topic ${topicId}:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [topicId]);

    const handleOptionChange = (questionId, optionId) => {
        setSelectedOptions(prev => ({
            ...prev,
            [questionId]: optionId,
        }));
    };

    const handleSubmit = async () => {
        if (Object.keys(selectedOptions).length !== questions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        try {
            const responses = await Promise.all(
                questions.map((question) => 
                    axios.post('http://localhost:3000/api/check-answer', {
                        question_id: question.question_id,
                        option_id: selectedOptions[question.question_id],
                    })
                )
            );

            const calculatedScore = responses.reduce((total, response) => total + (response.data.correct ? 1 : 0), 0);
            setScore(calculatedScore);
             // Display alert with the score
        alert(`Your Score: ${calculatedScore}`);

            // Send the score along with the student ID to the backend as an object
            if (studentId) {
                await axios.post(`http://localhost:3000/results/studentid`, {
                    studentId: studentId,
                    score: calculatedScore
                });

                // Show toast notification when the score is updated
                toast.success("Your score has been updated!");
            } else {
                console.error("Student ID is not available.");
            }

            // Set incorrect questions with correct answers
            const incorrectQuestions = questions.reduce((acc, question, index) => {
                if (!responses[index].data.correct) {
                    acc.push({
                        question_id: question.question_id,
                        question_description: question.question_description,
                        selected_option: selectedOptions[question.question_id],
                    });
                }
                return acc;
            }, []);

            // Fetch correct answers for incorrect questions
            const incorrectWithCorrectAnswers = await Promise.all(
                incorrectQuestions.map(async (question) => {
                    const correctAnswerResponse = await axios.get(`http://localhost:3000/answer/correctanswer/${question.question_id}`);
                    return {
                        ...question,
                        correct_option: correctAnswerResponse.data.answer_description,
                    };
                })
            );

            setIncorrectQuestions(incorrectWithCorrectAnswers);

        } catch (err) {
            console.error("Error checking answers:", err.response?.data || err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <NavBar />
            <ToastContainer /> {/* Add the ToastContainer here */}
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
                <h1 style={{ textAlign: 'center', color: 'blue' }}>Questions for Topic {topicId}</h1>

                {questions.map((question) => (
                    <div key={question.question_id} style={{ marginBottom: '20px' }}>
                        <h4>{`${question.question_id}. ${question.question_description}`}</h4>
                        <div style={{ marginBottom: '10px' }}>
                            {question.options && question.options.length > 0 ? (
                                question.options.map((option) => (
                                    <div key={option.option_id} style={{ marginBottom: '10px' }}>
                                        <label>
                                            <input
                                                type="radio"
                                                checked={selectedOptions[question.question_id] === option.option_id}
                                                onChange={() => handleOptionChange(question.question_id, option.option_id)}
                                            />
                                            {option.option_description}
                                        </label>
                                    </div>
                                ))
                            ) : (
                                <p>No options available for this question.</p>
                            )}
                        </div>
                    </div>
                ))}

                <button 
                    onClick={handleSubmit} 
                    style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', cursor: 'pointer', padding: '10px 20px' }}
                    disabled={Object.keys(selectedOptions).length !== questions.length}
                >
                    Submit Answers
                </button>

                {score !== null && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <h3>Your Score: {score}</h3>
                    </div>
                )}

                {/* Display incorrect questions with correct answers */}
                {incorrectQuestions.length > 0 && (
                    <div style={{ marginTop: '20px', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px' }}>
                        <h3 style={{ color: 'red' }}>Incorrect Questions:</h3>
                        <ul>
                            {incorrectQuestions.map(incorrect => (
                                <li key={incorrect.question_id}>
                                    <strong>{incorrect.question_description}</strong>
                                    <br />
                                    Your answer: {incorrect.selected_option}
                                    <br />
                                    Correct answer: {incorrect.correct_option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default Questionsbytopicid;
