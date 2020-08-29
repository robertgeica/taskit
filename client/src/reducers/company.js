import { COMPANY_LOADED, COMPANY_ERROR, ADD_COMPANY, DELETE_COMPANY, UPDATE_COMPANY } from '../actions/types';

const initialState = {
	company: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case COMPANY_LOADED:
			return { ...state, company: payload };
		
		case COMPANY_ERROR:
		case ADD_COMPANY:
    case DELETE_COMPANY:
    case UPDATE_COMPANY:
			return { ...state, payload };

		default:
			return state;
	}
}
