import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCertification } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Certification = ({ certification, deleteCertification }) => {
  const certifications = certification.map((certi) => (
    <tr key={certi._id}>
      <td>{certi.certificationName}</td>
      <td >{certi.certificationLink ? (
          <a href={certi.certificationLink} target="_blank" rel="noopener noreferrer">
            <strong> Verify </strong>
          </a>
        ) : null}</td>
      <td>
        {formatDate(certi.certificationDate)}
      </td>
      <td>
        <button
          onClick={() => deleteCertification(certi._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Certifications</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Certificate </th>
            <th className="hide-sm">Verify</th>
            <th className="hide-sm">Year</th>
            <th />
          </tr>
        </thead>
        <tbody>{certifications}</tbody>
      </table>
    </Fragment>
  );
};

Certification.propTypes = {
  certification: PropTypes.array.isRequired,
  deleteCertification: PropTypes.func.isRequired
};

export default connect(null, { deleteCertification })(Certification);
