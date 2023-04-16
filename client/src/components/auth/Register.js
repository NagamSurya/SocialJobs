import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber:'',
    password: '',
    password2: ''
  });

  const { name, email, phoneNumber,password, password2 } = formData;
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passError, setPassError] = useState("");

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    let flag=false;
    if (password !== password2) {
      setPassError("Bro, the passwords don't match!");
      flag=true
    } 
    else{setPassError("Bro, the passwords don't match!");}
    if (!name) {
      setNameError("Name cannot be empty");
      flag=true
    } else {
      setNameError("");
    }
    if (!email.includes("@")) {
      setEmailError("Enter a valid email");
      flag=true
    } else {
      setEmailError("");
    }
    if (phoneNumber.length !== 10) {
      setPhoneError("Please enter a valid phone number");
      flag=true
    } else {
      setPhoneError("");
    }
    if(flag)
    {}

    else {
      register({ name, email,phoneNumber, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
          {nameError && (
      <div className="invalid-feedback">{nameError}</div>
    )}
        </div>
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
            type="tel"
            placeholder="Phone number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
          />
           {phoneError && (
      <div className="invalid-feedback">{phoneError}</div>
    )}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
           {passError && (
      <div className="invalid-feedback">{passError}</div>
    )}
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
