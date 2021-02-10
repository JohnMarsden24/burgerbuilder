import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const flattenObj = (obj) => {
  // Copy the obj so we don't mutate it
  const newObj = { ...obj };

  // Initialise our key and fruit array
  const keys = Object.keys(newObj);
  const newArr = [];

  // Return the value of our recursive call
  return recursiveAdd(newObj, keys, newArr);
};

const recursiveAdd = (obj, keys, arr) => {
  // If our keys array is empty our base case returns the arr
  if (keys.length === 0) return arr;

  // Error handling for none numbers or if the value is 0
  if (typeof obj[keys[0]] !== "number" || obj[keys[0]] === 0) {
    keys.shift();
    return recursiveAdd(obj, keys, arr);
  }

  // Push the key to the array
  arr.push(keys[0]);

  // Decrement the keys value by one
  obj[keys[0]]--;

  // If the key value is now 0 we remove it from the array
  if (obj[keys[0]] === 0) keys.shift();

  // Recursively call the function with the altered keys and arr
  return recursiveAdd(obj, keys, arr);
};

const burger = (props) => {
  const flattenedIngredients = flattenObj(props.ingredients);

  let transformedIngredients = flattenedIngredients.map((ingredient, index) => (
    <BurgerIngredient key={ingredient + index} type={ingredient} />
  ));

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
