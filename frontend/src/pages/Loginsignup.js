import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";



import "./LoginSignup.css";

const LoginSignup = () => {
  // State for toggling forms
  const [isLogin, setIsLogin] = useState(true);
  //show password state
  const [showPassword, setShowPassword] = useState(false);
  // States for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hooks for login and signup
  const { login, error: loginError, isLoading: loginLoading } = useLogin();
  const { signup, error: signupError, isLoading: signupLoading } = useSignup();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await login(email, password);
    } else {
      await signup(email, password);
    }
    
  };

  // Toggle between Login and Signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
  };
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-signup-wrapper">
     
      <div className={`container ${isLogin ? "login-mode" : "signup-mode"}`}>
        {/* Info Section */}
        <div className="info-section">
          <div className={`${isLogin? "signup-text-1" : 'signup-text-2' }`}>
              <h4>Hello, Friend!</h4>
                <p>Enter your details and start journey with us</p>
                <button className="toggle-btn" onClick={toggleForm}>
                  Sign Up
                </button>
              </div>
              <div className={`${isLogin? "signin-text-1" : 'signin-text-2' }`}>
              <h4>Welcome Back!</h4>
              <p>To keep Connected with us please login your information</p>
                <button className="toggle-btn" onClick={toggleForm}>
                  Log In
                </button>
              </div>
        </div>
        

        {/* Form Section */}
        <div className="form-section">
          {isLogin ? (
            <form className="form-container" onSubmit={handleSubmit}>
              <h3>Log In</h3>
              <label>Email address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
              />
              <label>Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
             <button
                  type="button"
                  className="toggle-password-btns"
                  onClick={togglePasswordVisibility}
                >
                 <FontAwesomeIcon  icon={showPassword ? faEyeSlash : faEye}></FontAwesomeIcon>
                </button>
              
              <button type="submit" disabled={loginLoading}>
                Log In
              </button>
              {loginError && <div className="error">{loginError}</div>}
            </form>
          ) : (
            <form className="form-container" onSubmit={handleSubmit}>
              <h3>Sign Up</h3>
              <label>Email address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
              />
              <label>Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
              <button
                  type="button"
                  className="toggle-password-btns"
                  onClick={togglePasswordVisibility}
                >
                 <FontAwesomeIcon  icon={showPassword ? faEyeSlash : faEye}></FontAwesomeIcon>
                </button>
              <button type="submit" disabled={signupLoading}>
                Sign Up
              </button>
              {signupError && <div className="error">{signupError}</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
