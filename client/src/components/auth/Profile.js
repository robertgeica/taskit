import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import Modal from "react-modal";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../store/store";

import "./profile.scss";
import image from "../../assets/profile-picture.jpg";

// Actions
import {
  loadProfile,
  handleUpdateProfile,
  handleCreateProfile,
} from "../../actions/profile";

const Profile = ({ profile, user }) => {
  useEffect(() => {
    store.dispatch(loadProfile());
  }, []);

  const [newProfile,setNewProfile]=useState({
	  
  })

	const handleChange = (e) =>{
		const { name,value} = e.target;
		setNewProfile({...newProfile,[name]:value})
  }

  const [toggle, setToggle] = useState(undefined);

  const handleOpenModal = () => setToggle(true);
  const handleCloseModal = () => setToggle(false);

  const renderProfileInfo = () => {
    if (profile !== null) {
      console.log(profile);
      return (
        <div className="profile-container">
          <div className="profile-image">
            <img src={image} alt="" />
          </div>

          <div className="profile-details">
            <h1>{profile[0].name}</h1>
            <span>email@email.com</span>
            <div className="secondary-details">
              <p>adress:{profile[0].adress} </p>
              <p>{profile[0].phone} </p>
            </div>
            <button className="button" onClick={handleOpenModal}>
              Update info
            </button>
          </div>
          <Modal
            isOpen={!!toggle}
            onRequestClose={handleCloseModal}
            ariaHideApp={false}
            closeTimeoutMS={200}
            className="modal"
          >
            <form className="form-container" onChange={handleChange}>
              <div className="header">
                <h3>Edit Profile</h3>
              </div>
              <div className="form-input">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
				  defaultValue={profile[0].name}
				  onChange={(e)=>handleChange(e)}
                />
              </div>
              <div className="form-input">
                <label htmlFor="image">Image:</label>
                <input
                  type="text"
                  name="image"
				  defaultValue={profile[0].image}
				  onChange={(e)=>handleChange(e)}
                />
              </div>
              <div className="form-input">
                <label htmlFor="adress">Adress:</label>
                <input
                  type="text"
                  name="adress"
				  defaultValue={profile[0].adress}
				  onChange={(e)=>handleChange(e)}
                />
              </div>
              <div className="form-input">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  name="phone"
				  defaultValue={profile[0].phone}
				  onChange={(e)=>handleChange(e)}
                />
              </div>
              <button
			  className="button"
                onClick={(e) => {
                  store.dispatch(
                    handleUpdateProfile(profile[0]._id, newProfile)
                  );
                  e.preventDefault();
                  handleCloseModal();
                }}
              >
                Update
              </button>
            </form>
          </Modal>
        </div>
      );
    }
  };

 

  return <div className="profile">{renderProfileInfo()}</div>;
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Profile);
