import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT } from './types';
import setAuthToken from '../utils/setAuthToken';

import { handleCreateProfile } from './profile';


// Load user
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};
// Register uer
export const register = ({ email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/register', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
    console.log('success registering new user');

		dispatch(loadUser());
	} catch (error) {
		if (error) {
			console.log('Error', error);
		}

		dispatch({
			type: REGISTER_FAIL
		});
    console.log('error registering new user');
	}
};

export const login = (email, password) => async (dispatch) => {
	const body = { email, password };
	console.log(body);
	try {
		const res = await axios.post('/auth', body);
		console.log(res);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
    console.log('login success');
	} catch (error) {
		if (error) {
			console.log('Error', error);
		}

		dispatch({
			type: LOGIN_FAIL
		});
    console.log('login fail');
	}
};

// Logout
export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT
	});
};
