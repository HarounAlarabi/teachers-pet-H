import "../styles/LoginForm.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../api/config";

function LoginForm() {
  const [username, setUsername] = useState("sam");
  const [password, setPassword] = useState("1234");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleValidateUser = (event) => {
    event.preventDefault();

    setIsLoading(true);

    setUsernameError("");
    setPasswordError("");
    setValidationError("");

    if (!username.trim()) {
      setUsernameError("Enter a username");
    }

    if (!password.trim()) {
      setPasswordError("Enter a password");
    }

    fetch(`${BASE_API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherUsername: username,
        teacherPassword: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setIsLoading(false);
          return response.json().then((data) => {
            if (data) {
              console.error(data);
              setValidationError(data.message);
            } else {
              setValidationError(
                "An error occurred while processing your request."
              );
            }
          });
        }
      })
      .then((data) => {
        setIsLoading(false);
        if (data && data.teacherID) {
          navigate("/landingPage", {
            state: { teacherID: data.teacherID, teacherUsername: username },
          });

          return data.teacherID;
        } else {
          console.error("ID could not be found.");
        }
      })

      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">{/* Keep existing header code */}</header>

      <div className="auth-container">
        <div className="login-card">
          <div className="login-header">
            <h2 className="form-title">
              <span className="title-gradient">Secure Login</span>
              <div className="title-underline"></div>
            </h2>
            <p className="form-subtitle">Access your evaluation dashboard</p>
          </div>

          <form className="login-form" onSubmit={handleValidateUser}>
            <div className="form-group">
              <div className="input-wrapper">
                <i className="fas fa-user input-icon"></i>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  placeholder="Educational ID"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError("");
                    setValidationError("");
                  }}
                />
              </div>
              {usernameError && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i> {usernameError}
                </div>
              )}
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Authentication Key"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                    setValidationError("");
                  }}
                />
              </div>
              {passwordError && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i> {passwordError}
                </div>
              )}
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <div className="dual-ring-spinner"></div>
              ) : (
                "Verify Credentials"
              )}
            </button>

            {validationError && (
              <div className="form-feedback error">
                <i className="fas fa-shield-exclamation"></i> {validationError}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
