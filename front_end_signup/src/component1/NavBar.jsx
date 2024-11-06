import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';  // Import Bootstrap's JS bundle
import ShowImage from './ShowImage';


const NavBar = () => {
    const id = localStorage.getItem("id");

    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');

    // Function to fetch student data from the backend
    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/student/findStudentById/${id}`);
            console.log(response.data);

            if (response.data) {
                setStudents([response.data]); 
            } else {
                setError("Unexpected data format");
            }

        } catch (err) {
            setError('Error fetching student data');
            console.error(err);
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        if (id) {
            fetchStudentData();
        } else {
            setError("No ID found in localStorage.");
        }
    }, [id]);

    return (
        <>
       
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <Link className="navbar-brand" to="/">Student Portal</Link>

                {/* Toggler for mobile view */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible part of the navbar */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/studentdetails">Student Details</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/coursedetails">Course Details</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/createnewaccount">Create New Student Account</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/UploadImage">Upload Image</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/coursebystudents">Enrolled Course by Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/studentsbycourse">Enrolled Students By Course</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Log Out</Link>
                        </li>
                        {/* <ShowImage studentId={id}/> */}
                       



        {/* <li  className="nav-item"><Link  className="nav-link" to="/uploadexcel" >Upload Excel Sheet</Link></li> */}
        <li  className="nav-item"><Link  className="nav-link" to="/id" >Question Detail</Link></li>
        <li  className="nav-item"><Link  className="nav-link" to="/subject" >Exams </Link></li>
        <li  className="nav-item"><Link  className="nav-link" to="/topics" >Topics Detail</Link></li>
        <li  className="nav-item"><Link  className="nav-link" to="/selectsubject" >upload quetsion paper</Link></li>
        {/* <li  className="nav-item"><Link  className="nav-link" to="/MultiLevelSelect" >MultiLevelSelect Detail</Link></li> */}
        
                    </ul>
                </div>

                {/* Optionally display the student image */}
                <ShowImage studentId={id}/>
            </nav>
        </div>
        </>
    );
};

export default NavBar;
