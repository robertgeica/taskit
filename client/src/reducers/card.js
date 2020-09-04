import { CARDS_LOADED, ALLOCATED_LOADED, CARDS_ERROR, ADD_CARD, DELETE_CARD, UPDATE_CARD, ADD_TASK, DELETE_TASK, UPDATE_TASK, TASK_ERROR } from '../actions/types';

const initialState = {
	cards: null,
	allocatedCards: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case CARDS_LOADED:
			return { ...state, cards: payload };
		
    case ADD_CARD:
		case DELETE_CARD:
		case UPDATE_CARD:
		case ADD_TASK:
		case DELETE_TASK:
		case UPDATE_TASK:
      return { ...state, payload };
    
		case ALLOCATED_LOADED:
			return { ...state, allocatedCards: payload };

		case CARDS_ERROR:
		case TASK_ERROR:
			return { ...state, payload };

		default:
			return state;
	}
}