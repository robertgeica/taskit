import { PROFILE_LOADED, PROFILE_ERROR, ADD_PROFILE, UPDATE_PROFILE } from '../actions/types';

const initialState = {
	profile: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case PROFILE_LOADED:
			return { ...state, profile: payload };
		
		case UPDATE_PROFILE:
		// case ADD_PROFILE:
			return { ...state, payload };

		default:
			return state;
	}
}
