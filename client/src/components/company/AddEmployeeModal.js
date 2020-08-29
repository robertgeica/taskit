import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import store from '../../store/store';

import { loadCompany, handleAddEmployee } from '../../actions/company';

const AddLabelModal = ({ data, companyId, departamentId, employeeModal, handleCloseAddEE }) => {
	const [ userEmail, setUserEmail ] = useState({});

	const handleChange = (e) => {
		setUserEmail(e.target.value);
	};

	return (
		<Modal
			isOpen={!!employeeModal}
			onRequestClose={handleCloseAddEE}
			ariaHideApp={false}
			closeTimeoutMS={200}
			className="modal"
		>
			<form>
				<input type="text" name="email" placeholder="email" onChange={(e) => handleChange(e)} />
			</form>

			<button
				className="button"
				onClick={() => {
					store.dispatch(handleAddEmployee(companyId, departamentId, userEmail));
					handleCloseAddEE();
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
