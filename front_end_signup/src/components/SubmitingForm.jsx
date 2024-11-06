import React, { useState } from 'react'

const SubmitingForm = () => {
    const  [name,setName]= useState(" ") ;

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${name}`)
      }

  return (
    <>
    <from>
        <label>
            firstName :
            <input type="text"
                 value ={name}
                 onChange={(e) => setName(e.target.value)}
                 />
        </label> <br />
        <button onClick={handleSubmit}>button</button>
    </from>
    </>
  )
}

export default SubmitingForm