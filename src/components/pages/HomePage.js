import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h3>Welcome Visitor!</h3>
        <h3>
          <Link to="/login">Login</Link> to access dashboard!
        </h3>
      </div>
    );
  }
}

export default HomePage;
