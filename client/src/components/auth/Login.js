import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const [emailError,setEmailError]=useState("");
    const [passError,setPassError]=useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    let flag=true;
    if (!email.includes("@")) {
      setEmailError("Enter a valid email");
      flag=false
    } else {
      setEmailError("");
    }
    if (!password) {
      setPassError("Without password, how can you login macha!?");
      flag=false
    } else {
      setPassError("");
    }

    if(flag)
    login(email, password);
    else
    {}
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Log In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Log Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"

            value={email}
            onChange={onChange}
          />
          {emailError && (
      <div className="invalid-feedback">{emailError}</div>
    )}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
          {passError && (
      <div className="invalid-feedback">{passError}</div>
    )}
        </div>
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
