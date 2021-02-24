import React from "react";

import { connect } from "react-redux";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {props.controls.map((ctrl) => (
      <BuildControl
        key={ctrl}
        label={ctrl}
        added={() => props.ingredientAdded(ctrl)}
        removed={() => props.ingredientRemoved(ctrl)}
        disabled={!props.ingredients[ctrl]}
      />
    ))}
    <button
      className={classes.OrderButton}
      onClick={props.ordered}
      disabled={!props.purchasable}
    >
      {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
    </button>
  </div>
);

const mapStateToProps = (state) => {
  return {
    controls: Object.keys(state.burgerBuilder.ingredients),
  };
};

export default connect(mapStateToProps)(buildControls);
