import React from 'react'

const GroceryList = (props) => {
    const { items } = props;

    return (
        <>
            <h1>Grocery List</h1>
            <ul>
                {items.map((item) => (
                    <li >{item.id} : {item.name}</li>
                ))}
            </ul>
        </>
    );
};



export default GroceryList