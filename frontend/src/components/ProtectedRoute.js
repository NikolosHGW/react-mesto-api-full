import React from "react";
import { Redirect, Route } from "react-router";

export default React.memo(({ component: Component, ...props }) => {
  return (
    <Route>
      {() => props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  );
});
