import { CARDS_LOADED, CARDS_ERROR, ADD_CARD, DELETE_CARD, UPDATE_CARD } from '../actions/types';

const initialState = {
	cards: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case CARDS_LOADED:
			return { ...state, cards: payload };
		
    case ADD_CARD:
      return { ...state, payload };
      
		case CARDS_ERROR:
			return { ...state, payload };

		default:
			return state;
	}
}