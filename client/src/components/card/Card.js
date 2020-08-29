import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import AddCardModal from './AddCardModal';
import UpdateCardModal from './UpdateCardModal';
import AddTaskModal from './AddTaskModal';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store/store';

// Actions
import { loadCards, handleDeleteCard, handleUpdateCard } from '../../actions/card';

import './card.scss';


const Card = ({ cards }) => {

	useEffect(() => {
    store.dispatch(loadCards());
	}, []);

    const [toggle, setToggle] = useState(undefined);
    const handleOpenModal = () => setToggle(true);
    const handleCloseModal = () => setToggle(false);

    const [toggleUpdate, setToggleUpdate] = useState(undefined);
    const [cardId, setCardId] = useState('');
    const handleOpenUpdateModal = () => setToggleUpdate(true);
    const handleCloseUpdateModal = () => setToggleUpdate(false);

    const [toggleAddTask, setToggleAddTask] = useState(undefined);
    const handleOpenAddTask = () => setToggleAddTask(true);
    const handleCloseAddTask = () => setToggleAddTask(false);

    const [taskModal, setTaskModal] = useState(undefined);
    const handleOpenTaskModal = () => setTaskModal(true);
    const handleCloseTaskModal = () => setTaskModal(false);


  // console.log(cards);
	return (
    <div>
      <AddCardModal 
        toggle={toggle}
        handleCloseModal={handleCloseModal}
      />

      <UpdateCardModal 
        cardId={cardId}
        toggleUpdate={toggleUpdate}
        handleCloseUpdateModal={handleCloseUpdateModal}
      />

      <AddTaskModal
        cardId={cardId}
        toggleAddTask={toggleAddTask}
        handleCloseAddTask={handleCloseAddTask}
      />


      <button onClick={handleOpenModal}>Add new card </button>
      <div>
        {cards !== null && (
          <div className="board">
            {cards.map(card => (
              <div className="card non-empty-card" key={card._id}>
                <div className="card-content">
                  <h1 className="card-title">{card.card.cardTitle}</h1>
                  <button 
                    onClick={() => store.dispatch(handleDeleteCard(card._id))
                  }>
                    delete
                  </button>

                  <button
                    onClick={() => {
                      setCardId(card._id);
                      handleOpenUpdateModal();
                    }}>
                    edit
                  </button>
                </div>

                {card.cardTasks.map(task => (
                  <div className="task">
                    <p 
                      className="task-title"
                      onClick={handleOpenTaskModal}
                    >
                      {task.taskTitle}
                    </p>

                  </div>
                ))}

                <div>
                  <button
                    onClick={() => {
                      setCardId(card._id);
                      handleOpenAddTask();
                    }}>
                    add task
                  </button>
                </div>
              </div>

            ))}
          </div>
        )}
      </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
	cards: state.card.cards
});

export default connect(mapStateToProps)(Card);
