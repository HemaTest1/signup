import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import NavBar from './NavBar';

const LogOut = () => {
  // Function to handle logout
   const navigate = useNavigate();
  const handleLogOut = () => {
    try {
      localStorage.removeItem("id"); // Correct the key to the actual key stored in localStorage
      toast.success("You have logged out successfully!");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } 
    catch (error) {
      toast.error("An error occurred. Please check and try again.");
    }
  };
  // Call handleLogOut when component renders
  React.useEffect(() => {
    handleLogOut();
  }, []);

  return (
    <>
    <NavBar />
      <div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LogOut;
