import React, { useState, useEffect } from "react";
import { checkEmptyFields, validateEmail, validatePassword } from "../Utility/FormValidation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUserSuccessful, registerUserFailed } from "../../store/actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { PostRequest } from "../Utility/Request";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authError = useSelector((state) => state.auth?.authError || null);
  const registrationError = useSelector((state) => state.account?.registrationError || null);

  const defaultRole = "client_admin";

  // State for login
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // State for registration
  const [registerValues, setRegisterValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: defaultRole,
    status: "Requested",
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [countdown, setCountdown] = useState(3);

  // Load saved credentials for login
  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("userCredentials"));
    if (savedCredentials) {
      setLoginValues({
        email: savedCredentials.email,
        password: savedCredentials.password,
      });
      setRememberMe(true);
    }
  }, []);

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (checkEmptyFields(loginValues)) {
      toast.error("Please fill in all fields");
    } else if (!validateEmail(loginValues.email)) {
      toast.error("Invalid email address");
    } else {
      try {
        if (rememberMe) {
          localStorage.setItem("userCredentials", JSON.stringify(loginValues));
        } else {
          localStorage.removeItem("userCredentials");
        }
        await dispatch(loginUser(loginValues, navigate));
      } catch (error) {
        toast.error(authError || "An error occurred during login");
      }
    }
  };

  // Handle registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUserFailed(""));

    if (checkEmptyFields(registerValues)) {
      toast.error("Fields must not be empty!");
    } else if (!validateEmail(registerValues.email)) {
      toast.error("Email is invalid!");
    } else if (!validatePassword(registerValues.password)) {
      toast.error(
        "Password should contain at least 8 characters and must contain one uppercase, one lowercase, one digit, and one special character!"
      );
    } else if (registerValues.password !== registerValues.confirmPassword) {
      toast.error("Confirm Password should match Password!");
    } else {
      try {
        await PostRequest(`${process.env.REACT_APP_URL}/auth/register`, registerValues);
        dispatch(registerUserSuccessful(registerValues));
        localStorage.setItem("email", registerValues.email);
        toast.success(`Registration successful! Redirecting to Verify account page in ${countdown} seconds...`);
        startRedirectCountdown();
      } catch (err) {
        console.error("Registration failed", err);
        toast.error("Account already exists with this email or username");
      }
    }
  };

  // Start countdown for redirecting after registration
  const startRedirectCountdown = () => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(intervalId);
          navigate("/verify-email");
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  // Handle input changes for login
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValues((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  // Handle input changes for registration
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterValues((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  // Toggle between login and registration forms
  const handleToggle = (action) => {
    const container = document.querySelector(".auth-container");
    if (action === "register") {
      container.classList.add("active");
    } else if (action === "login") {
      container.classList.remove("active");
    }
  };

  return (
    <div className="bg-pattern">
    <div className="auth-container ">
      {/* Login Form */}
      <div className="auth-form-box login">
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <div className="auth-input-box">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={loginValues.email}
              onChange={handleLoginInputChange}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="auth-input-box position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={loginValues.password}
              onChange={handleLoginInputChange}
              required
            />
            <i
              className={`bx bx${showPassword ? "-show" : "-hide"}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
      </div>

      {/* Registration Form */}
      <div className="auth-form-box register">
        <form onSubmit={handleRegisterSubmit}>
          <h1>Registration</h1>
          <div className="auth-input-box">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={registerValues.firstName}
              onChange={handleRegisterInputChange}
              required
            />
          </div>
          <div className="auth-input-box">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={registerValues.lastName}
              onChange={handleRegisterInputChange}
              required
            />
          </div>
          <div className="auth-input-box">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={registerValues.email}
              onChange={handleRegisterInputChange}
              required
            />
          </div>
          <div className="auth-input-box position-relative">
            <input
              type={showRegisterPassword.password ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={registerValues.password}
              onChange={handleRegisterInputChange}
              required
            />
            <i
              className={`bx bx${showRegisterPassword.password ? "-show" : "-hide"}`}
              onClick={() =>
                setShowRegisterPassword((prevState) => ({
                  ...prevState,
                  password: !prevState.password,
                }))
              }
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <div className="auth-input-box position-relative">
            <input
              type={showRegisterPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerValues.confirmPassword}
              onChange={handleRegisterInputChange}
              required
            />
            <i
              className={`bx bx${showRegisterPassword.confirmPassword ? "-show" : "-hide"}`}
              onClick={() =>
                setShowRegisterPassword((prevState) => ({
                  ...prevState,
                  confirmPassword: !prevState.confirmPassword,
                }))
              }
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>
      </div>

      {/* Toggle Panel */}
      <div className="auth-toggle-box">
        <div className="auth-toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <button className="auth-btn" onClick={() => handleToggle("register")}>
            Register
          </button>
        </div>

        <div className="auth-toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <button className="auth-btn" onClick={() => handleToggle("login")}>
            Login
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Auth;
