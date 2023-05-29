import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
// https://auth-app-api-tgrn.onrender.com/api/login
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { email, password };
    axios.post('https://auth-app-api-tgrn.onrender.com/api/login', loginData)
      .then((response) => {
        alert("login success", response.data.token)
        console.log(response)
        localStorage.setItem("user", JSON.stringify({
          userId: response.data.userId,
          token: response.data.token
        }))
        navigate("/")
      })
      .catch((error) => {
        alert("error")
      });
  };

  return (
    <div className="main-login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder='Enter email address'
          required
          className='input-box'
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder='Enter password'
          required
          className='input-box'
        />
        <button type="submit">Login</button>
      </form>
      <div className="no-account-box">
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </div>
    </div>
  );
}

export default Login;
