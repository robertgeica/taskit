import React, { Fragment } from "react";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./homepage.scss";


const Homepage = ({ auth: { isAuthenticated, loading } }) => {
  return (
    <div>
      homepage
    </div>
  );
};

Homepage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Homepage);
