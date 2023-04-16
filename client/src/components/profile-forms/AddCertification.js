import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCertification } from '../../actions/profile';

const AddCertification = ({ addCertification }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    certificationName: '',
    certificationLink: '',
    certificationDate: ''
  });

  const { certificationName, certificationLink, certificationDate} =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">Add Your Certification</h1>
      
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addCertification(formData, navigate);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Certification name"
            name="certificationName"
            value={certificationName}
            onChange={onChange}
            required
          />
        </div>

      
        <div className="form-group">
          <input
            type="text"
            placeholder="Link to verify your certificate"
            name="certificationLink"
            value={certificationLink}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <h4>Certification Date</h4>
          <input type="date" name="certificationDate" value={certificationDate} onChange={onChange} />
        </div>
        
        <input type="submit" value= "Save" className="btn btn-primary my-1" />
       
      </form>
    </section>
  );
};

AddCertification.propTypes = {
  addCertification: PropTypes.func.isRequired
};

export default connect(null, { addCertification })(AddCertification);
