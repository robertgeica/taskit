import axios from 'axios';
import { CARDS_LOADED, CARDS_ERROR, ADD_CARD, DELETE_CARD, UPDATE_CARD } from './types';

export const loadCards = () => async (dispatch) => {
	const res = await axios.get('/card');
  
	try {
		dispatch({
			type: CARDS_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: CARDS_ERROR
		});
	}
};

export const handleAddCard = (card) => async dispatch => {
  try {
    const cards = await axios.post('/card', card);

    console.log('card to add', card);

    dispatch({
      type: ADD_CARD,
      payload: cards
    });
    dispatch(loadCards());
  } catch (error) {
    dispatch({
      type: CARDS_ERROR
    })
  }
}