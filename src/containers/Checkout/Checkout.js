import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  /* NOT NEEDED AS USING REDUX
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, price: price });
  }
  */

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
          // render={(props) => (
          //   <ContactData
          //     ingredients={this.props.ingredients}
          //     price={this.props.price}
          //     {...props}
          //   />
          // )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
});

export default connect(mapStateToProps)(Checkout);
