import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Time = () => {
  const [responseData, setResponseData] = useState({});
    useEffect(()=>{

    }, []);

   const response =  axios.post(``)
   console.log(response)
   setResponseData(response)
  return (
    <div>Time
      {responseData}
    </div>
  )
}
// https://jsonplaceholder.typicode.com/users
export default Time