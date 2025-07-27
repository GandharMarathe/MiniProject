import React from 'react';
import './App.css';

const FoodCard = ({ item, onAdd }) => {
  return (
    <div className="food-card">
      <img src={item.image} alt={item.name} />
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <div className="price-add">
        <span>₹{item.price}</span>
        <button onClick={() => onAdd(item)}>Add</button>
      </div>
    </div>
  );
};

export default FoodCard;
