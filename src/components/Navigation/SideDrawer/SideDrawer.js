import React from "react";

import Logo from "../../Logo/Logo";
import Aux from "../../../hoc/Aux/Aux";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  const attachedClasses = [classes.SideDrawer];

  if (props.open) {
    attachedClasses.push(classes.Open);
  } else {
    attachedClasses.push(classes.Close);
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav onClick={props.closed}>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
