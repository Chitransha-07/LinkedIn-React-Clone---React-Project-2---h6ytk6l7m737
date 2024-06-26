import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

function Login() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [emailAlert, setEmailAlret] = useState("");
  const [passwordAlert, setPasswordAlret] = useState("");
  const [incorrectDetails, setIncorrectDetails] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  // Function to login user
  const loginUser = async () => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        projectID: "h6ytk6l7m737",
      },
      body: JSON.stringify({
        ...userDetails,
        appType: "linkedin",
      }),
    };
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        config
      );
      const result = await response.json();

      const token = result.token;
      if (token) {
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem(
          "userDetails",
          JSON.stringify({
            name: result.data.name,
            email: result.data.email,
            id: result.data._id,
          })
        );
        setIsLoggedIn(true);
        navigate("/feed");
      }
      if (result.status === "fail") {
        setIncorrectDetails(true);
      }
    } catch (error) {
      setServerError(true);
      setTimeout(() => {
        setServerError(false);
      }, 5000);
    }
  };

  // Function for guest login
  const guestLogin = async () => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        projectID: "h6ytk6l7m737",
      },
      body: JSON.stringify({
        email: "guest@mail.com",
        password: "123456",
        appType: "linkedin",
      }),
    };
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        config
      );
      const result = await response.json();

      const token = result.token;
      if (token) {
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem(
          "userDetails",
          JSON.stringify({
            name: result.data.name,
            email: result.data.email,
            id: result.data._id,
          })
        );
        setIsLoggedIn(true);
        navigate("/feed");
      }
      if (result.status === "fail") {
        setIncorrectDetails(true);
      }
    } catch (error) {
      setServerError(true);
      setTimeout(() => {
        setServerError(false);
      }, 5000);
    }
  };

// Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    if (userDetails.email === "") {
      setEmailAlret("Please enter your email");
      setPasswordAlret("");
      emailRef.current.focus();
    } else if (!emailRegex.test(userDetails.email)) {
      setEmailAlret("Please enter a valid email address");
      setPasswordAlret("");
      emailRef.current.focus();
    } else if (userDetails.password === "") {
      setPasswordAlret("Please enter a password");
      setEmailAlret("");
      passwordRef.current.focus();
    } else if (userDetails.password.length < 6) {
      setPasswordAlret(
        "The password you provided must have at least 6 characters"
      );
      setEmailAlret("");
      passwordRef.current.focus();
    } else {
      setEmailAlret("");
      setPasswordAlret("");
      loginUser();
    }
    setIncorrectDetails(false);
  };

  // Function to handle input changes
  const handleInputs = (e) => {
    setUserDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Effect to pre-fill email if provided in URL search parameters
  useEffect(() => {
    if (decodeURIComponent(searchParams.get("email")) !== "null") {
      setUserDetails((prev) => {
        return {
          ...prev,
          email: decodeURIComponent(searchParams.get("email")),
        };
      });
      setIncorrectDetails(true);
    }
    if (emailRef.current) emailRef.current.focus();
  }, []);
  return isLoggedIn ? (
    <Navigate to="/feed" />
  ) : (
    <div>
      <header className="login-signup-header">
        <Link className="login-signup-linkedin-icon-container" to="/">
          <div className="header-home-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 84 21"
              preserveAspectRatio="xMinYMin meet"
              version="1.1"
              focusable="false"
              aria-busy="false"
              fill="blue"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path
                  d="M19.479,0 L1.583,0 C0.727,0 0,0.677 0,1.511 L0,19.488 C0,20.323 0.477,21 1.333,21 L19.229,21 C20.086,21 21,20.323 21,19.488 L21,1.511 C21,0.677 20.336,0 19.479,0"
                  transform="translate(63.000000, 0.000000)"
                ></path>
                <path
                  d="M82.479,0 L64.583,0 C63.727,0 63,0.677 63,1.511 L63,19.488 C63,20.323 63.477,21 64.333,21 L82.229,21 C83.086,21 84,20.323 84,19.488 L84,1.511 C84,0.677 83.336,0 82.479,0 Z M71,8 L73.827,8 L73.827,9.441 L73.858,9.441 C74.289,8.664 75.562,7.875 77.136,7.875 C80.157,7.875 81,9.479 81,12.45 L81,18 L78,18 L78,12.997 C78,11.667 77.469,10.5 76.227,10.5 C74.719,10.5 74,11.521 74,13.197 L74,18 L71,18 L71,8 Z M66,18 L69,18 L69,8 L66,8 L66,18 Z M69.375,4.5 C69.375,5.536 68.536,6.375 67.5,6.375 C66.464,6.375 65.625,5.536 65.625,4.5 C65.625,3.464 66.464,2.625 67.5,2.625 C68.536,2.625 69.375,3.464 69.375,4.5 Z"
                  fill="#0A66C2"
                ></path>
              </g>
              <g>
                <path
                  d="M60,18 L57.2,18 L57.2,16.809 L57.17,16.809 C56.547,17.531 55.465,18.125 53.631,18.125 C51.131,18.125 48.978,16.244 48.978,13.011 C48.978,9.931 51.1,7.875 53.725,7.875 C55.35,7.875 56.359,8.453 56.97,9.191 L57,9.191 L57,3 L60,3 L60,18 Z M54.479,10.125 C52.764,10.125 51.8,11.348 51.8,12.974 C51.8,14.601 52.764,15.875 54.479,15.875 C56.196,15.875 57.2,14.634 57.2,12.974 C57.2,11.268 56.196,10.125 54.479,10.125 L54.479,10.125 Z"
                  fill="#0A66C2"
                ></path>
                <path
                  d="M47.6611,16.3889 C46.9531,17.3059 45.4951,18.1249 43.1411,18.1249 C40.0001,18.1249 38.0001,16.0459 38.0001,12.7779 C38.0001,9.8749 39.8121,7.8749 43.2291,7.8749 C46.1801,7.8749 48.0001,9.8129 48.0001,13.2219 C48.0001,13.5629 47.9451,13.8999 47.9451,13.8999 L40.8311,13.8999 L40.8481,14.2089 C41.0451,15.0709 41.6961,16.1249 43.1901,16.1249 C44.4941,16.1249 45.3881,15.4239 45.7921,14.8749 L47.6611,16.3889 Z M45.1131,11.9999 C45.1331,10.9449 44.3591,9.8749 43.1391,9.8749 C41.6871,9.8749 40.9121,11.0089 40.8311,11.9999 L45.1131,11.9999 Z"
                  fill="#0A66C2"
                ></path>
                <polygon
                  fill="#0A66C2"
                  points="38 8 34.5 8 31 12 31 3 28 3 28 18 31 18 31 13 34.699 18 38.241 18 34 12.533"
                ></polygon>
                <path
                  d="M16,8 L18.827,8 L18.827,9.441 L18.858,9.441 C19.289,8.664 20.562,7.875 22.136,7.875 C25.157,7.875 26,9.792 26,12.45 L26,18 L23,18 L23,12.997 C23,11.525 22.469,10.5 21.227,10.5 C19.719,10.5 19,11.694 19,13.197 L19,18 L16,18 L16,8 Z"
                  fill="#0A66C2"
                ></path>
                <path
                  d="M11,18 L14,18 L14,8 L11,8 L11,18 Z M12.501,6.3 C13.495,6.3 14.3,5.494 14.3,4.5 C14.3,3.506 13.495,2.7 12.501,2.7 C11.508,2.7 10.7,3.506 10.7,4.5 C10.7,5.494 11.508,6.3 12.501,6.3 Z"
                  fill="#0A66C2"
                ></path>
                <polygon
                  fill="#0A66C2"
                  points="3 3 0 3 0 18 9 18 9 15 3 15"
                ></polygon>
              </g>
            </svg>
          </div>
        </Link>
      </header>
      <div className="login-signup-form-container">
        <div className="login-signup-heading">
          <h1>Sign in</h1>
          <p>Stay updated on your professional world</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div
            className={`login-signup-form-input ${
              emailAlert ? "login-signup-form-input-alert" : ""
            }`}
          >
            <input
              ref={emailRef}
              onChange={handleInputs}
              placeholder=""
              value={userDetails.email}
              type="email"
              name="email"
              id="email"
            />
            <label htmlFor="email">Email</label>
            <p style={{ marginTop: "4px" }} className="input-helper">
              {emailAlert}
            </p>
          </div>
          <div
            className={`login-signup-form-input ${
              passwordAlert ? "login-signup-form-input-alert" : ""
            }`}
          >
            <input
              ref={passwordRef}
              onChange={handleInputs}
              placeholder=""
              value={userDetails.password}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
            />
            <label htmlFor="password">Password</label>
            <span onClick={() => setShowPassword((n) => !n)}>
              {showPassword ? "Hide" : "Show"}
            </span>
            <p style={{ marginTop: "4px" }} className="input-helper">
              {passwordAlert}
            </p>
            {serverError && (
              <p className="input-helper">
                Something went wrong please try later
              </p>
            )}
            {incorrectDetails && (
              <p className="input-helper">Incorrect EmailId or Password</p>
            )}
          </div>
          <Link to="#">
            <span className="login-forget-btn">Forgot password?</span>
          </Link>
          <div>
            <button className="login-signup-btn" type="submit">
              Sign in
            </button>
          </div>
          <div className="login-form-divider">
            <p>or</p>
          </div>
        </form>
        <div className="google-auth-btn">
          <p>
            By clicking Continue, you agree to LinkedIn’s{" "}
            <span>User Agreement</span>, <span>Privacy Policy</span>, and{" "}
            <span>Cookie Policy</span>.
          </p>
          <button onClick={guestLogin} style={{ marginTop: "0" }}>
            Sign in as a GUEST
          </button>
        </div>
      </div>
      <div className="login-to-signin">
        New to LinkedIn?{" "}
        <span
          onClick={(e) => {
            navigate("/signup");
          }}
        >
          Join now
        </span>
      </div>
    </div>
  );
}

export default Login;
