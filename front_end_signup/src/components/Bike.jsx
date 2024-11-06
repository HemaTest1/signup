import React from 'react'

const Bike = (props) => {
  return (
    <p className={`${props.color}`}> Bike {props.brand}</p>
  )
}

export default Bike