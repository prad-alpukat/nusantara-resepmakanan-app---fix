import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = async () => {
    if (!email.trim()) {
      setEmailError('Masukan Email');
      return;
    }

    if (!password.trim()) {
      setPasswordError('isi password');
      return;
    }

    console.log('Sign in with:', email, password);

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    };

    fetch('http://127.0.0.1:8800/users/login', options)
      .then(response => response.json())
      .then(response => {
        // set the token in the local storage
        localStorage.setItem('token', response.token);
        console.log("berhasil login");
        navigate('/');
      })
      .catch(err => console.error({ "error login": err }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };


  return (
    <div className="login-form">
      <h2>Login</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <p className="error-message">{emailError}</p>}
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
      </div>
      <button onClick={handleSignIn} className="sign-in-button">
        Login
        <span role="img" aria-label="finger">

        </span>
      </button>
    </div>
  );
};

export default LoginForm;
