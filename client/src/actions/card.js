import axios from 'axios';
import { CARDS_LOADED, ALLOCATED_LOADED, CARDS_ERROR, ADD_CARD, DELETE_CARD, UPDATE_CARD, ADD_TASK, DELETE_TASK, UPDATE_TASK, TASK_ERROR } from './types';

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

export const loadAllocatedCards = () => async dispatch => {
	const res = await axios.get('/card/alloc');

  try {
    dispatch({
      type: ALLOCATED_LOADED,
      payload: res.data
    })
  } catch (error) {
		dispatch({
			type: CARDS_ERROR
		});
  }
}

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

export const handleDeleteCard = (id) => async dispatch => {

  try {
    const cards = await axios.delete('/card/' + id);
    dispatch({
      type: DELETE_CARD,
      payload: cards
    });

    dispatch(loadCards());
  } catch (error) {
    dispatch({
      type: CARDS_ERROR
    })
  }
}

export const handleUpdateCard = (id, newCard) => async dispatch => {

    const res = await axios.get('/card/' + id);
    const data = res.data;

  try {
      const nCard = {
        ...data,
        card: newCard,
    };

    await axios.post('/card/' + id, nCard);

    dispatch({
      type: UPDATE_CARD,
      payload: [ data ]
    });
    dispatch(loadCards());
  } catch (error) {
    dispatch({
      type: CARDS_ERROR
    })
  }
}

export const handleAddTask = (id, newTask) => async dispatch => {

  try {
    const res = await axios.get('/card/' + id);
    const data = res.data;

    const newCard = {
      ...data,
      cardTasks: [...data.cardTasks, newTask]
    };

    const cards = await axios.post('/card/' + id, newCard);

    dispatch({
      type: ADD_TASK,
      payload: cards
    });
    dispatch(loadCards());
  } catch (error) {
    dispatch({
      type: TASK_ERROR
    })
  }
};

export const handleDeleteTask = (cardId, taskId) => async dispatch => {

  try {
    const res = await axios.get('/card/' + cardId);
    const newData = res.data;
    const cardTasks = res.data.cardTasks;

    const newTasks = cardTasks.filter((value, index, arr) => {
      return value._id !== taskId
    });
    newData.cardTasks = newTasks;
    await axios.post('/card/' + cardId, newData);
    
    dispatch({
      type: DELETE_TASK,
      payload: [ newData ]
    });
    dispatch(loadCards());
    
  } catch (error) {
    dispatch({
      type: TASK_ERROR
    })
  }
}

export const handleUpdateTask = (cardId, taskId, newTask) => async dispatch => {

  try {
    const res = await axios.get('/card/' + cardId);
    const newData = res.data;
    const cardTasks = res.data.cardTasks;

    let index = cardTasks.findIndex(task => task._id === taskId);
    cardTasks[index] = newTask;

    await axios.post('/card/' + cardId, newData);
    
    dispatch({
      type: UPDATE_TASK,
      payload: [ newData ]
    });
    dispatch(loadCards());

  } catch (error) {
    dispatch({
      type: TASK_ERROR
    })
  }  
}