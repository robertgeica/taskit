import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import store from '../../store/store';

import { handleUpdateLabel } from '../../actions/company';

const UpdateLabelModal = ({ data, companyId, labelId, updateLabel, handleCloseUpdateLabel }) => {
	const [ newLabel, setNewLabel ] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewLabel({
			...newLabel,
			[name]: value
		});

	};

	return (
		<Modal
			isOpen={!!updateLabel}
			onRequestClose={handleCloseUpdateLabel}
			ariaHideApp={false}
			closeTimeoutMS={200}
			className="modal"
		>
			<form>
				<input type="text" name="labelPriority" placeholder="labelPriority" onChange={(e) => handleChange(e)} />
				<input type="text" name="statusName" placeholder="statusName" onChange={(e) => handleChange(e)} />
				<input type="text" name="color" placeholder="color" onChange={(e) => handleChange(e)} />
			</form>
			<button
				className="button"
				onClick={() => {
					store.dispatch(handleUpdateLabel(companyId, labelId, newLabel));
					handleCloseUpdateLabel();
				}}
			>
				update label
			</button>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	data: state.company.company
});

export default connect(mapStateToProps)(UpdateLabelModal);
