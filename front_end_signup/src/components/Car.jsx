import React from 'react'

const Car = (props) => {
  return (
    <h1 className={`${props.color}`}>Car {props.brand} </h1>
  )
}

export default Car