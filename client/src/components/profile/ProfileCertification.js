import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';

const ProfileCertification = ({
  certification: { certificationName,certificationLink,certificationDate }
}) => (
  <div>
    <h3 className="text-dark">{certificationName}</h3>
    <p>
      {formatDate(certificationDate)}
    </p>
    <p>
    {certificationLink ? (
          <a href={certificationLink} target="_blank" rel="noopener noreferrer">
            <strong> Verify </strong>
          </a>
        ) : null}
    </p>
    
  </div>
);

ProfileCertification.propTypes = {
  certification: PropTypes.object.isRequired
};

export default ProfileCertification;
