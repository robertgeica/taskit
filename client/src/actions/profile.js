import axios from 'axios';
import { PROFILE_LOADED, PROFILE_ERROR, ADD_PROFILE, UPDATE_PROFILE } from './types';

// Load profile
export const loadProfile = () => async (dispatch) => {
	const res = await axios.get('/profile');

  
	try {
		dispatch({
			type: PROFILE_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR
		});
	}
};

// create profile
// export const handleCreateProfile = () => async (dispatch) => {
// 	const newProfile = {
// 		image: '',
// 		name: '',
// 		phone: '',
// 		adress: ''
// 	};

// 	const res = await axios.post('/profile', newProfile);
// 	try {
// 		dispatch({
// 			type: ADD_PROFILE,
// 			payload: [ newProfile ]
// 		});
    
//     dispatch(loadProfile());

// 	} catch (error) {
// 		dispatch({
// 			type: PROFILE_ERROR
// 		});
// 	}
// };

// Edit profile
export const handleUpdateProfile = (id, newProfile) => async (dispatch) => {
	const res = await axios.get('/profile/' + id);
	const data = res.data;

	try {
		await axios.post('/profile/' + id, newProfile);

		dispatch({
			type: UPDATE_PROFILE,
			payload: [ data ]
		});

		dispatch(loadProfile());
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR
		});
	}
};
