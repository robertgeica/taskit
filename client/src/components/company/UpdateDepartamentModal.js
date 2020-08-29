import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import store from '../../store/store';

import { loadCompany, handleUpdateDepartament } from '../../actions/company';

const UpdateDepartamentModal = ({ data, companyId, departamentId, updateDepartament, handleCloseUpdateDepartament }) => {
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
			isOpen={!!updateDepartament}
			onRequestClose={handleCloseUpdateDepartament}
			ariaHideApp={false}
			closeTimeoutMS={200}
			className="modal"
		>
			<form>
				<input type="text" name="departamentName" placeholder="departamentName" onChange={(e) => handleChange(e)} />
				<input type="text" name="departamentManager" placeholder="departamentManager" onChange={(e) => handleChange(e)} />
				<input type="text" name="departamentEmployees" placeholder="departamentEmployees" onChange={(e) => handleChange(e)} />
			</form>
			<button
				className="button"
				onClick={() => {
					store.dispatch(handleUpdateDepartament(companyId, departamentId, newDepartament));
					handleCloseUpdateDepartament();
				}}
			>
				update dep
			</button>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	data: state.company.company
});

export default connect(mapStateToProps)(UpdateDepartamentModal);
