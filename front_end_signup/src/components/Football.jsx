import React from 'react'

function Football() {
//     const shoot = () =>{
//         alert("Great shoot!")
//     }
//   return (
//     <button onClick={shoot} >Take the shoot</button>
//   )

// const shoot = (a) =>{
//     alert("Great" + a)
// }
// return (
//     <button onClick={()=>{(shoot("Shoot"))}}>Take the shoot</button>
// )
// }


const shoot = (a,b) => {
    alert(b.type)
   }
   return (
    <button onDoubleClick={(event) => shoot("great",  event)}>Take the Shoot</button>
   )
}


export default Football