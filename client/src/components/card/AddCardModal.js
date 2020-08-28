import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import store from '../../store/store';

import { loadCards, handleAddCard } from '../../actions/card';

const AddRoadmapModal = ({ data, toggle, handleCloseModal }) => {
	const [ card, setCard ] = useState([]);

	const onChange = (e) => {
		const cardTitle = e.target.parentNode.childNodes[0].value;
		const cardDescription = e.target.parentNode.childNodes[1].value;
		const deadline = e.target.parentNode.childNodes[2].value;
		const status = e.target.parentNode.childNodes[3].value;

		const newCard = {
			card: {
				cardTitle,
				cardDescription,
				deadline,
				status
			},

			cardTasks: []
		};

		setCard([ newCard ]);
	};

	console.log('card');

	return (
		<Modal
			isOpen={!!toggle}
			onRequestClose={handleCloseModal}
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
			<button className="button" onClick={() => store.dispatch(handleAddCard(card))}>
				Add
			</button>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	data: state.card.cards
});

export default connect(mapStateToProps)(AddRoadmapModal);
