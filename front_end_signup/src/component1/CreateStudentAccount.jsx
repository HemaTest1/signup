import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const CreateStudentAccount = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        phone: ''
    });
   
    const navigate = useNavigate();
   
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Handle input change for the form fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

      
       
        try {
            const response = await axios.post('http://localhost:3000/api/student/insertstudent', formData);

            if(response.status === 401){
                setMessage("Student account is exists pls login")
                toast.warning('student account is exists pls login')
                setTimeout(() => {
                    navigate('/');
                  }, 2000);
            }
            
            setMessage('Student account created successfully! go back and Login');
            toast.success("Student account created successfully! ")
            setFormData({ name: '', email: '', age: '', phone: '' }); // Clear the form
            setTimeout(() => {
                navigate('/');
              }, 2000);
            

        } catch (err) {
            setError('Error creating student account.');
            toast.error('Error creating student account  pls check again');
            console.error('Error:', err);
        }
    };

    return (
        <>
        <div className='bg-warning'>
        <NavBar />
        <div  className='container  d-felx  flex-column justify-content-center p-3'>
            <h1>Create New Student Account</h1>
            <form onSubmit={handleSubmit} className='container m-3  d-felx  flex-column justify-content-center p-3 col-4' >
                <div className='my-3 row' >
                    {/* <label htmlFor="name">Name:</label> */}
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='enter your name'
                        required
                    />
                </div>
                <div className='my-3 row'>
                    {/* <label htmlFor="email">Email:</label> */}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='enter your email'
                        required
                    />
                </div>
                <div className='my-3 row'>
                    {/* <label htmlFor="age">Age:</label> */}
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder='enter your age'
                        required
                    />
                </div>
                <div className='my-3 row'>
                    {/* <label htmlFor="phone">Phone:</label> */}
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder='enter your phone number'
                        required
                    />
                </div>

                <button type="submit" className='btn btn-success'>Create Account</button>
            </form>

            {/* Display success or error messages */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ToastContainer />
        </div>
        </div>
        </>
    );
};

export default CreateStudentAccount;
