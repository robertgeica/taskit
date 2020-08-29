import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store/store';

import './profile.scss'
import image from '../../assets/profile-picture.jpg'

// Actions
import { loadProfile, handleUpdateProfile, handleCreateProfile } from '../../actions/profile';

const Profile = ({ profile, user }) => {
	useEffect(() => {
		store.dispatch(loadProfile());
	}, []);

	const [ userProfile, setUserProfile ] = useState(undefined);
	const [ toggle, setToggle ] = useState(undefined);

	const handleOpenModal = () => setToggle(true);
	const handleCloseModal = () => setToggle(false);

	const renderProfileInfo = () => {

		if (profile !== null) {
      console.log(profile);
			return (
				<div className="profile-container">
					<div className="profile-image">

						<img src={image} alt=""/>
						
					</div>

					<div className="profile-details">

					<h1>{profile[0].name}</h1>
					<span>email@email.com</span>
					<div className="secondary-details">
						
					<p>adress:{profile[0].adress} </p>
					<p>{profile[0].phone} </p>
					</div>
					<button className="button"onClick={handleOpenModal}>Update info</button>

					</div>
					<Modal
						isOpen={!!toggle}
						onRequestClose={handleCloseModal}
						ariaHideApp={false}
						closeTimeoutMS={200}
						className="modal"
						style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
					>
						<form onChange={handleChange}>
							<input type="text" name="name" defaultValue={profile[0].name} placeholder="name" />
							<input type="text" name="image" defaultValue={profile[0].image} placeholder="image url" />
							<input type="text" name="adress" defaultValue={profile[0].adress} placeholder="adress" />
							<input type="text" name="phone" defaultValue={profile[0].phone} placeholder="phone" />

							<button onClick={(e) => {
              store.dispatch(handleUpdateProfile(profile[0]._id, userProfile));
              e.preventDefault();
              handleCloseModal();
              }}>
								Update
							</button>
						</form>
					</Modal>
				</div>
			);
		}
	};

	const handleChange = (e) => {
    e.preventDefault();


		const name = e.target.parentNode.childNodes[0].value;
		const image = e.target.parentNode.childNodes[1].value;
		const adress = e.target.parentNode.childNodes[2].value;
		const phone = e.target.parentNode.childNodes[3].value;

		const newProfile = {
			name,
			image,
			adress,
			phone
		};

		setUserProfile(newProfile);
    console.log(newProfile);
	console.log(profile);
	};


	return <div className="profile">{renderProfileInfo()}</div>;
};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
	user: state.auth.user
});

export default connect(mapStateToProps)(Profile);
