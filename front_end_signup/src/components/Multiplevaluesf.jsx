import React from 'react'
import { useState } from 'react';

const Multiplevaluesf = () => {
    const [inputs,setInputs] = useState({});
    console.log(inputs)

    const handleChange = (event) =>{
        const name = event.target.name;
        console.log("name ",name)
        const value = event.target.value;
        setInputs(values => ({...values,[name] : value}))
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

  return (
    <>
    <form onSubmit = {handleSubmit}>
        <label>Enter your name :
            <input type="text"
            name="user"
            value = {inputs.user || ""}
            onChange = {handleChange}
        />
       </label>
        <label>Enter your age :
            <input 
            type = "number"
            name = "age"
            value={inputs.age || ""}
            onChange={handleChange}
            />
        </label>
        <input type="submit" />
    </form>
    </>
  )
}

export default Multiplevaluesf