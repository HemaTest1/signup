import React from 'react'
import { useState } from 'react';

const Froom2 = () => {
    const [name,setName] = useState("");

  return (
    <form>
        <label>Enter your name :
            <input type= "text"
            value = {name}
            onChange={(e) => setName(e.target.value)}
       />
     </label>
    </form>
  )
}

export default Froom2