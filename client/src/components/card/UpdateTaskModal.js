import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import store from '../../store/store';

import { handleUpdateTask } from '../../actions/card';

const UpdateCardModal = ({ cardId, taskId, toggleUpdateTask, handleCloseUpdateTask, handleCloseTaskModal }) => {
	const [ newTask, setNewTask ] = useState([]);

	const onChange = (e) => {
		const taskTitle = e.target.parentNode.childNodes[0].value;
		const taskDescription = e.target.parentNode.childNodes[1].value;
		const deadline = e.target.parentNode.childNodes[2].value;
		const status = e.target.parentNode.childNodes[3].value;

		const nTask = {
				taskTitle,
				taskDescription,
				deadline,
				status
		};
		setNewTask(nTask);
	};

  // console.log(data);

	return (
		<Modal
			isOpen={!!toggleUpdateTask}
			onRequestClose={handleCloseUpdateTask}
			ariaHideApp={false}
			closeTimeoutMS={200}
			className="addroadmap-modal"
			style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
		>
			<form onChange={onChange}>
				<input type="text" name="title" placeholder="title" />
				<input type="text" name="description" placeholder="description" />
				<input type="text" name="deadline" placeholder="deadline" />
				<input type="text" name="status" placeholder="status" />
			</form>
			<button className="button" onClick={() => {
        store.dispatch(handleUpdateTask(cardId, taskId, newTask));
        handleCloseUpdateTask();
        handleCloseTaskModal();
      }}>
				Update task
			</button>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	data: state.card.cards
});

export default connect(mapStateToProps)(UpdateCardModal);
