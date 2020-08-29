import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import store from '../../store/store';

import { loadCompany, handleAddLabel } from '../../actions/company';

const AddLabelModal = ({ data, companyId, toggleLabel, handleCloseLabel }) => {
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
			isOpen={!!toggleLabel}
			onRequestClose={handleCloseLabel}
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
					store.dispatch(handleAddLabel(companyId, newLabel));
					handleCloseLabel();
				}}
			>
				Add label
			</button>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	data: state.company.company
});

export default connect(mapStateToProps)(AddLabelModal);
