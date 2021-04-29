import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { UserContext } from "./components/context/UserContext";

import PublicRoute from "./components/routes/PublicRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      UserToken: null,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
    };
  }

  componentDidMount() {
    const AuthToken = localStorage.getItem("AuthToken");

    if (AuthToken) this.loginUser(AuthToken);
  }

  loginUser = (token) => {
    localStorage.setItem("AuthToken", token);
    this.setState({ UserToken: token });
  };

  logoutUser = () => {
    localStorage.removeItem("AuthToken");
    this.setState({ UserToken: null });
  };

  render() {
    return (
      <BrowserRouter>
        <UserContext.Provider value={this.state}>
          <div className="ui container">
            <Switch>
              <PublicRoute path="/" exact component={HomePage} />
              <PublicRoute path="/login" exact component={LoginPage} />
              <ProtectedRoute
                path="/dashboard"
                exact
                component={DashboardPage}
              />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
