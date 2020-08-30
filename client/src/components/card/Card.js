import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import AddCardModal from './AddCardModal';
import UpdateCardModal from './UpdateCardModal';
import AddTaskModal from './AddTaskModal';
import TaskModal from './TaskModal';

import TaskCard from './task-card/Task-card'


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
  
    const [open, setOpen]= useState(false);

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



      <button onClick={handleOpenModal} className="add-button">Add new card </button>
      <div>
        {cards !== null && (
          <div className="board">
            {cards.map(card => (
              <div className="card non-empty-card" key={card._id}>
                <div className="card-content">
                  <h1 className="card-title">{card.card.cardTitle}</h1>
                  {console.log(card)}

                  <p className="dots" onClick={()=>setOpen(!open)} >...</p>

                  <div className={`dots-div ${open? 'open':'d-none'}`}>
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

                  
                  
                </div>
                <p className="card-description">Descripiption: <br/><br/>{card.card.cardDescription}</p>
                {card.cardTasks.map(task => (
                    <TaskCard
                   handleOpenTaskModal={()=> handleOpenTaskModal()}
                   setCurrentTask={()=>   setCurrentTask(task)}
                   task={task}
                   key={task._id}
                   card_id={card._id}
                   setCardId={()=> setCardId(card._id)}
                  deadline={task.deadline}
                    title=  {task.taskTitle}
                    description={task.taskDescription}/>
                        
                ))}

                <div className="add-container">
                  <button className="add-button"
                    onClick={() => {
                      setCardId(card._id);
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
