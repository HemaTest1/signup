// import React from 'react'
// import "../App.css"

// function submit(){
//     alert('your deatails are successfuly saved')
// }
// const Myform = () => {
    
//   return (
// <>
// <form ><h3>Form Details</h3>
//     firstName :<input type='text' /><br />
//         lastName : <input type = 'text' /> <br />
//         age      :<input type = 'text' /> <br />
//         BOD   : <input type= 'date' /><br/>
//         Education : <select >
//                    <option>select one option</option>
//                    <option>B.TECH</option>
//                    <option>Degree</option>
//                    <option>pg</option>
//         </select><br/>
//         password : <input type ='password' /> <br/>
//         Gender :<input type ='radio' />Female <input type='radio' />Male<br />
//          Skills : <input type ='checkbox'/> Java
//                  <input type = 'checkbox' /> C
//                 <input type = 'checkbox' /> C++   <br/>
//                <button onClick={submit}  >Submit</button>        
//      </form>
// </>             
//   )
// }

// export default Myform

import React, { useState } from 'react';
import '../App.css';

const MyForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [bod, setBod] = useState('');
    const [education, setEducation] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [skills, setSkills] = useState({
        java: false,
        c: false,
        cpp: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate inputs
        if (!firstName || !lastName || !age || !bod || !education || !password || !gender) {
            alert('Please fill out all required fields.');
            return;
        }

        // Check if at least one skill is selected
        if (!skills.java && !skills.c && !skills.cpp) {
            alert('Please select at least one skill.');
            return;
        }

        alert('Your details are successfully saved');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Form Details</h3>
                First Name: <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} /><br />
                Last Name: <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} /><br />
                Age: <input type='text' value={age} onChange={(e) => setAge(e.target.value)} /><br />
                BOD: <input type='date' value={bod} onChange={(e) => setBod(e.target.value)} /><br />
                Education:
                <select value={education} onChange={(e) => setEducation(e.target.value)}>
                    <option value=''>Select one option</option>
                    <option value='B.TECH'>B.TECH</option>
                    <option value='Degree'>Degree</option>
                    <option value='pg'>PG</option>
                </select><br />
                Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                Gender: 
                <input type='radio' value='Female' checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} /> Female
                <input type='radio' value='Male' checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} /> Male<br />
                Skills: 
                <input type='checkbox' checked={skills.java} onChange={() => setSkills({ ...skills, java: !skills.java })} /> Java
                <input type='checkbox' checked={skills.c} onChange={() => setSkills({ ...skills, c: !skills.c })} /> C
                <input type='checkbox' checked={skills.cpp} onChange={() => setSkills({ ...skills, cpp: !skills.cpp })} /> C++<br />
                <button type='submit'>Submit</button>
            </form>
        </>
    );
};

export default MyForm;
