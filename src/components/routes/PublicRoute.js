import React from "react";
import PropTypes from "prop-types";
import { UserContext } from "./../context/UserContext";
import { Route, Redirect } from "react-router-dom";

class PublicRoute extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {(user) => {
          if (user.UserToken?.length > 0) {
            return <Redirect to="/dashboard" />;
          } else {
            return <Route {...this.props} />;
          }
        }}
      </UserContext.Consumer>
    );
  }
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
