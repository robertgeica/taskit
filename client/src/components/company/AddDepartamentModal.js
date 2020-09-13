import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import store from '../../store/store';

import { loadCompany, handleAddDepartament } from '../../actions/company';

const AddDepartamentModal = ({ data, companyId, toggleDepartament, handleCloseDepartament }) => {
	const [ newDepartament, setNewDepartament ] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewDepartament({
			...newDepartament,
			[name]: value,
			departamentEmployees: []
		});

    console.log(newDepartament);
	};

	return (
		<Modal
			isOpen={!!toggleDepartament}
			onRequestClose={handleCloseDepartament}
			ariaHideApp={false}
			closeTimeoutMS={200}
			className="modal"
		>
			<form>
				<input type="text" name="departamentName" placeholder="departamentName" onChange={(e) => handleChange(e)} />
				<input type="text" name="departamentManager" placeholder="departamentManager" onChange={(e) => handleChange(e)} />
				{/* <input type="text" name="departamentEmployees" placeholder="departamentEmployees" onChange={(e) => handleChange(e)} /> */}
			</form>
			<button
				className="button"
				onClick={() => {
					store.dispatch(handleAddDepartament(companyId, newDepartament));
					handleCloseDepartament();
				}}
			>
				Add comp
			</button>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	data: state.company.company
});

export default connect(mapStateToProps)(AddDepartamentModal);
