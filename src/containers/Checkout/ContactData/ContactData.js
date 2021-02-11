import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postcode: "",
    },
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your details</h4>
        <form action="">
          <input type="text" name="name" placeholder="Enter your name" />
          <input type="email" name="email" placeholder="Enter your email" />
          <input type="text" name="street" placeholder="Enter your street" />
          <input
            type="text"
            name="postcode"
            placeholder="Enter your postcode"
          />
          <Button btnType="Success">Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
