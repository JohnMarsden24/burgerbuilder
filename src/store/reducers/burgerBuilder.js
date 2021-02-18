import { act } from "react-dom/test-utils";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient1 = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngredients1 = updateObject(
        state.ingredients,
        updatedIngredient1
      );
      const updatedState1 = {
        ingredients: updatedIngredients1,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
      return updateObject(state, updatedState1);

    case actionTypes.REMOVE_INGREDIENT:
      const updatedIngredient2 = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngredients2 = updateObject(
        state.ingredients,
        updatedIngredient2
      );
      const updatedState2 = {
        ingredients: updatedIngredients2,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
      return updateObject(state, updatedState2);

    case actionTypes.SET_INGREDIENT:
      return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: initialState.totalPrice,
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
