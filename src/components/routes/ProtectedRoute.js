import React from "react";
import PropTypes from "prop-types";
import { UserContext } from "./../context/UserContext";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {(user) => {
          if (user.UserToken?.length > 0) {
            return <Route {...this.props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      </UserContext.Consumer>
    );
  }
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default ProtectedRoute;
