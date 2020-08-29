import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import store from '../../store/store';

import { handleAddTask } from '../../actions/card';

const AddTaskModal = ({ cardId, toggleAddTask, handleCloseAddTask }) => {
	const [ newTask, setNewTask ] = useState({});
	

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewTask({ ...newTask, [name]: value });
	  };


	return (
		<Modal
			isOpen={!!toggleAddTask}
			onRequestClose={handleCloseAddTask}
			ariaHideApp={false}
			closeTimeoutMS={200}
			className="addroadmap-modal"
			style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
		>
			<form >
				<input type="text" name="taskTitle" placeholder="taskTitle" onChange={(e)=>handleChange(e)} />
				<input type="text" name="taskDescription" placeholder="taskDescription" onChange={(e)=>handleChange(e)} />
				<input type="text" name="deadline" placeholder="deadline" onChange={(e)=>handleChange(e)}/>
				<input type="text" name="status" placeholder="status"onChange={(e)=>handleChange(e)} />
			</form>

			<button className="button" onClick={() => {
				console.log(newTask)
        store.dispatch(handleAddTask(cardId, newTask));
        handleCloseAddTask();
      }}>
				Add task
			</button>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	data: state.card.cards
});

export default connect(mapStateToProps)(AddTaskModal);
