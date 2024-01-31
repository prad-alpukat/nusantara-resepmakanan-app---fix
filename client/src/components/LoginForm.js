import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = () => {
    if (!email.trim()) {
      setEmailError('Masukan Email');
      return;
    }

    if (!password.trim()) {
      setPasswordError('isi password');
      return;
    }

    console.log('Sign in with:', email, password);
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
