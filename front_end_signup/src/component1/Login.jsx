import React, { useState } from 'react';
import axios from 'axios';
import '../app.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { toast, ToastContainer } from 'react-toastify';


const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        phone :'',
       
    });
     const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    const createnewaccount = (event) => {
        event.preventDefault();
        navigate('/createnewaccount');  // Use navigate to switch to the login page
      };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page from reloading

        try {
            // Make POST request to validate email and password
            const response = await axios.post(`http://localhost:3000/api/student/checkemailandphone`, inputs);
            console.log(response.data); // Log response
            console.log(inputs, "inputs_____________________")
            const id = response.data.id;
            console.log(id)
            localStorage.setItem("id",id);
            
            if (response.status === 200) {
                const id = response.data.id; // Access the correct key
                setResponseMessage("Login successful!");
                toast.success('Login successful')
                // localStorage.setItem('id', id);
                setTimeout(() => {
                    navigate('/Home'); // Navigate to Login
                  }, 2000);
                 
                  
                
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error); // Log error details

            if (error.response && error.response.status === 404) {
                setResponseMessage("Email not found. Please create an account.");
                toast.danger("email not found . pls create an account..")
            } else if (error.response && error.response.status === 401) {
                setResponseMessage("Invalid credentials. Please try again.");
                toast.warning('invalid credentials. please try again ')
            } else {
                setResponseMessage("An error occurred. Please try again.");
                toast.danger('an error occurred.please try again')
            }
        }
    };

    return (
        <>
        <NavBar />
        <div className='bg-warning'>
        <div  className=' container d-flex flex-column align-items-center justify-content-center  '>
            <h1 className=' shining-text'>Login Form</h1>
            <form onSubmit={handleSubmit} className='form-group'>
                <div className='my-3 row'>
                    {/* <label className='col-6'>Enter your email:    </label> */}
                        <input
                            type="email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            required
                            placeholder='Enter your email'
                            className='col-12'
                        />
                 
                </div>
                <div className='my-3 row'>   
                    {/* <label className='col-6'>Enter your Phone:</label>  */}
                       
                        <input
                            type="number"
                            name="phone"
                            value={inputs.phone}
                            onChange={handleChange}
                            required
                            placeholder='Enter your phone number'
                            className='col-12'
                        />
                    
                </div>
                <button type="submit" className="btn btn-success my-2 col-8">Login</button><br />
                <button type="submit" className='btn btn-danger my-2 ' onClick={createnewaccount}>CreateAccount</button>

            </form>
            {responseMessage && <p>{responseMessage}</p>}
           
        </div>
        <ToastContainer />
        </div>
        
        </>
    );
};

export default Login;
