import React from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Button, Form } from "semantic-ui-react";
import * as EmailValidator from "email-validator";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
        global: "",
      },
    };
  }

  onChange = async (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};

    if (!EmailValidator.validate(data.email))
      errors.email = "Not a valid email address";
    if (!data.email) errors.email = "Cant be blank";
    if (!data.password) errors.password = "Cant be blank";

    this.setState({ errors: errors });
    return errors;
  };

  onSumbit = async () => {
    const errors = this.validate();

    if (Object.keys(errors).length <= 0) {
      await axios
        .post("http://localhost:4000/api/login", {
          credentials: this.state.data,
        })
        .then((res) => {
          if (res.data.success) {
            this.context.loginUser(res.data.token);
            this.props.history.push("/dashboard");
          } else {
            this.setState({
              errors: { ...this.state.errors, global: "Invalid credentials" },
            });
          }
        })
        .catch((e) => {
          this.setState({
            errors: { ...this.state.errors, global: e.toString() },
          });
        });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Form onSubmit={this.onSumbit}>
          <h2>Login Form</h2>
          <Form.Field error={!!errors.email}>
            <label>E-mail address</label>
            <input
              name="email"
              onChange={this.onChange}
              type="text"
              placeholder="example@example.com"
            />
            {errors.email && <InlineError text={errors.email} />}
          </Form.Field>
          <Form.Field error={!!errors.password}>
            <label>Password</label>
            <input
              name="password"
              onChange={this.onChange}
              type="password"
              placeholder="Keep it secret!"
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <Button>Login</Button>
          {errors.global && <InlineError text={errors.global} />}
        </Form>
      </div>
    );
  }
}

const InlineError = ({ text }) => (
  <span style={{ color: "#ae5856" }}>{text}</span>
);

InlineError.propTypes = {
  text: PropTypes.string.isRequired,
};

LoginPage.contextType = UserContext;

export default LoginPage;
