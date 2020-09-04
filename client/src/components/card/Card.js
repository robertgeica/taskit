import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import AddCardModal from './AddCardModal';
import UpdateCardModal from './UpdateCardModal';
import AddTaskModal from './AddTaskModal';
import TaskModal from './TaskModal';
import CardHeaderContent from './card-header/card-header'

import TaskCard from './task-card/Task-card';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store/store';

// Actions
import { loadCards, handleDeleteCard, handleUpdateCard } from '../../actions/card';

import './card.scss';
import { CardHeader } from '@material-ui/core';

const Card = ({ cards }) => {
	useEffect(() => {
    store.dispatch(loadCards());
  }, []);

    const [toggle, setToggle] = useState(undefined);
    const handleOpenModal = () => setToggle(true);
    const handleCloseModal = () => setToggle(false);

    const [toggleUpdate, setToggleUpdate] = useState(undefined);
    const [cardId, setCardId] = useState();
    const handleOpenUpdateModal = () => setToggleUpdate(true);
    const handleCloseUpdateModal = () => setToggleUpdate(false);

    const [toggleAddTask, setToggleAddTask] = useState(undefined);
    const handleOpenAddTask = () => setToggleAddTask(true);
    const handleCloseAddTask = () => setToggleAddTask(false);

    const [toggleTaskModal, setToggleTaskModal] = useState(undefined);
    const [currentTask, setCurrentTask] = useState({});
    const handleOpenTaskModal = () => setToggleTaskModal(true);
    const handleCloseTaskModal = () => setToggleTaskModal(false);

  // console.log(cards);
	return (
    <div className="container card-container">
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

      <TaskModal
        toggleTaskModal={toggleTaskModal}
        handleCloseTaskModal={handleCloseTaskModal}
        currentTask={currentTask}
        cardId={cardId}
      />


      <div className="card-container-header">
        <h3 className="card-header-title">Cards</h3>
        <button onClick={handleOpenModal} className="add-button">Add new card </button>
      </div>
      
      <div>
        {cards !== null && (
          <div className="board">
            {cards.map(card => (
              <div className="card non-empty-card" key={card._id}>
                <CardHeaderContent
                  deleteCard={() =>store.dispatch(handleDeleteCard(card._id))}
                  setCard={()=>setCardId(card)}
                  handleUpdate={()=>handleOpenUpdateModal(card={card})}
                  card={card}
                />
                <p className="card-description">{card.card.cardDescription}</p>
                {card.cardTasks.map(task => (
                    <TaskCard
                   handleOpenTaskModal={()=> handleOpenTaskModal()}
                   setCurrentTask={()=>   setCurrentTask(task)}
                   task={task}
                   key={task._id}
                   card_id={card._id}
                   setCardId={()=> setCardId(card)}
                   status={task.status}
                  deadline={task.deadline}
                    title=  {task.taskTitle}
                    description={task.taskDescription}/>
											allocatedTo={task.allocatedTo}
                        
                ))}

                <div className="add-container">
                  <button className="add-button"
                    onClick={() => {
                      setCardId(card);
                      handleOpenAddTask();
                    }}>
                    + &nbsp; 	&nbsp;add task
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
