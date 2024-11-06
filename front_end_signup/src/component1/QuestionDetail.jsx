import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);
  const [inputId, setInputId] = useState(id || '');

  useEffect(() => {
    if (id) {
      fetchQuestion(id);
    }
  }, [id]);

  const fetchQuestion = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/question/${questionId}`);
      setQuestion(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch question');
      setQuestion(null);
    } 
  };

  const handleInputChange = (e) => {
    setInputId(e.target.value);
  };

  const handleFetchQuestion = () => {
    if (inputId) {
      fetchQuestion(inputId);
    } else {
      alert("Please enter a question ID.");
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <h2>Fetch Question Details</h2>
        <input 
          type="text" 
          value={inputId} 
          onChange={handleInputChange} 
          placeholder="Enter question ID" 
        />
        <button 
          onClick={handleFetchQuestion} 
          style={{ backgroundColor: 'green', color: 'white', padding: '8px 15px', border: 'none', cursor: 'pointer' }}
        >
          Fetch Question
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {question && (
          <div style={{ marginTop: '20px' }}>
            <h3>{`${question.question_id}. ${question.question_description}`}</h3>
            <h5>Answers:</h5>
            {question.answers && question.answers.length > 0 ? (
              question.answers.map((answer) => (
                <div key={answer.option_id}>
                  <label>{answer.answer_description}</label>
                </div>
              ))
            ) : (
              <p>No answers available for this question.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionDetail;
