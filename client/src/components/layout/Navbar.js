import React, { Fragment,useState } from "react";
import { Link } from "react-router-dom";

import HamburgerMenu from 'react-hamburger-menu';

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const [ open, setOpen ] = useState(false);

	if(window.initialWidth<700)setOpen(true)

     const userLinks =(
       
    
              <ul className={`nav-links ${open ? 'open' : null}`}>
                <div className="create-card">
                  <p>Create <br/> new card</p>
                  <button className='create-card-button'>+</button>
                </div>
                <Link className="nav-btn" onClick={logout} to="/login">Logout</Link>
                <Link className="nav-btn" to="/profile"onClick={() => setOpen(!open)}>Profile</Link>
                <Link className="nav-btn" to="/cards"onClick={() => setOpen(!open)}>Cards</Link>
                <Link className="nav-btn" to="/company"onClick={() => setOpen(!open)}>Company</Link>
              </ul>
     );

const guestLinks = (
		
  <ul className={`nav-links ${open ? 'open' : null}`}>
    <Link className="nav-btn" to="/login">Login</Link>
    <Link className="nav-btn" to="/register">Register</Link>
  </ul>

);

  return (
		<nav className="navbar">
			{ /*console.log(window.innerWidth)*/ }
      <h3>Task.it</h3>
		

{!loading && <Fragment>{isAuthenticated ? userLinks : guestLinks}</Fragment>}
<Link to="/" className="logo" />

			{ /*console.log(window.innerWidth)*/ }
      <HamburgerMenu
				isOpen={open}
				menuClicked={() => setOpen(!open)}
				width={30}
				height={18}
				strokeWidth={5}
				rotate={0}
				color="black"
				className="menu"
				borderRadius={25}
				animationDuration={0.5}
			/>
		</nav>
	);
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Navbar);
