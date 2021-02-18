import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = () =>
    Object.values(this.props.ingredients).some((quantity) => quantity > 0);

  purchaseHandler = () => this.setState({ purchasing: true });

  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = () => this.props.history.push("/checkout");

  /* NOT NEEDED AS USING REDUX
     addIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       const updatedCount = oldCount + 1;
       const updatedIngredients = {
         ...this.state.ingredients,
       };
       updatedIngredients[type] = updatedCount;
       const priceAddition = INGREDIENT_PRICES[type];
       const oldPrice = this.state.totalPrice;
       const newPrice = oldPrice + priceAddition;
       this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
       this.updatePurchaseState(updatedIngredients);
     };
   
     removeIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       if (oldCount <= 0) {
         return;
       }
   
       const updatedCount = oldCount - 1;
       const updatedIngredients = {
         ...this.state.ingredients,
       };
       updatedIngredients[type] = updatedCount;
       const priceDeduction = INGREDIENT_PRICES[type];
       const oldPrice = this.state.totalPrice;
       const newPrice = oldPrice - priceDeduction;
       this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
       this.updatePurchaseState(updatedIngredients);
     };
   
     purchaseContinueHandler = () => {
       const queryParams = [];
       for (let i in this.state.ingredients) {
         queryParams.push(
           encodeURIComponent(i) +
             "=" +
             encodeURIComponent(this.state.ingredients[i])
         );
       }
       queryParams.push(`price=${this.state.totalPrice}`);
       const queryString = queryParams.join("&");
       this.props.history.push({
         pathname: "/checkout",
         search: queryString,
       });
     };
     */

  render() {
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <div>Build controls</div>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState()}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemove: (ingredientName) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
