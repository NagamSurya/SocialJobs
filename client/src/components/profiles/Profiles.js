import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';


const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProfiles = profiles.filter((profile) =>
  (
    profile.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
    profile.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.location.toLowerCase().includes(searchQuery.toLowerCase())
  )
);

  return (
    <section className="container">
    
        <form  onSubmit={(e) => {
    e.preventDefault();
    getProfiles(searchQuery);
  }}>
  <input
    
    type="text"
    placeholder="Search "
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{ width: "300px" }}
  />
  
</form>

      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          
          <div className="profiles">
          {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No profiles found...</h4>
        )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
