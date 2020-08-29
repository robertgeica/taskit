import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">
        <Link to="/">
          <h2>Taskit</h2>
        </Link>
      </h1>

      <div className="links">
        {!loading && (
          <Fragment>
            {isAuthenticated ? (
              <Fragment>
                <Link className="nav-btn" onClick={logout} to="/login">Logout</Link>
                <Link className="nav-btn" to="/profile">Profile</Link>
                <Link className="nav-btn" to="/cards">Cards</Link>
                <Link className="nav-btn" to="/company">Company</Link>

              </Fragment>
            ) : 
              <Fragment>
                <Link className="nav-btn" to="/login">Login</Link>
                <Link className="nav-btn" to="/register">Register</Link>
              </Fragment>
            }
          </Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Navbar);
