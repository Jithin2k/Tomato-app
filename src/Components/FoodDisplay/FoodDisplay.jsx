import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem.jsx/FoodItem";
import "./FoodDisplay.css"

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes for you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          return (
            <FoodItem
            key={index}
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
