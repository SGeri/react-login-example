import React from "react";
import { UserContext } from "./../context/UserContext";

class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <UserContext.Consumer>
          {(user) => {
            return (
              <div>
                <h1>Welcome back, user!</h1>

                <button onClick={user.logoutUser}>Logout</button>
              </div>
            );
          }}
        </UserContext.Consumer>
      </div>
    );
  }
}

export default DashboardPage;
