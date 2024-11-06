import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionId,
    });
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

      const score = responses.reduce((total, response) => total + (response.data.correct ? 1 : 0), 0);
      alert(`You scored: ${score}`);
    } catch (error) {
      console.error("Error checking answers:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ backgroundColor: '#ffc107', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Quiz</h1>

        {questions.map((question) => (
          <div key={question.question_id} style={{ marginBottom: '20px' }}>
            <h4>{`${question.question_id}. ${question.question_description}`}</h4>
            <div style={{ marginBottom: '10px' }}>
              {question.options.map((option) => (
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
              ))}
            </div>
          </div>
        ))}

        <button 
          onClick={handleSubmit} 
          style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', cursor: 'pointer' }}
          disabled={Object.keys(selectedOptions).length !== questions.length}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Question;
