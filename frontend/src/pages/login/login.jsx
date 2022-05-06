import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./login.css";

const Login = () => {
  const [value, setValue] = useState([]);
  const [error, setError] = useState([]);
  let helloWorld = "Hello World";
  const handleOnChangeUsername = (event) => {
    setValue({
      username: event.target.value,
    });
  };

  const handleOnChangePassword = (event) => {
    setValue({
      ...value,
      password: event.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/user/login", {
        username: value.username,
        password: value.password,
      })
      .then((res) => {
        if (res.data.status !== 200) {
          setError(res.data.message);
        }
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );
      })
      .catch((e) => {
        setError(e);
      });
  };

  return (
    <div className="container login_container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                name="username"
                className="login__input"
                onChange={(event) => {
                  handleOnChangeUsername(event);
                }}
                placeholder="User name / Email"
              />
            </div>

            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                name="password"
                onChange={(event) => handleOnChangePassword(event)}
                className="login__input"
                placeholder="Password"
              />
            </div>
            <p>{error}</p>
            <button
              className="button login__submit"
              onClick={(event) => handleLogin(event)}
            >
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};
export default Login;
