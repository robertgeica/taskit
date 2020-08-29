import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import AddComanyModal from './AddCompanyModal';
import UpdateCompanyModal from './UpdateCompanyModal';
import AddDepartamentModal from './AddDepartamentModal';
import AddLabelModal from './AddLabelModal';
import UpdateDepartamentModal from './UpdateDepartamentModal';
import UpdateLabelModal from './UpdateLabelModal';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store/store';

// Actions
import { loadCompany, handleAddCompany, handleDeleteCompany, handleDeleteDepartament, handleDeleteLabel } from '../../actions/company';

const Company = ({ company }) => {
	useEffect(() => {
		store.dispatch(loadCompany());
	}, []);

	console.log(company);

	const [ toggle, setToggle ] = useState(undefined);
	const handleOpenModal = () => setToggle(true);
	const handleCloseModal = () => setToggle(false);

	const [ toggleUpdate, setToggleUpdate ] = useState(undefined);
	const [ companyId, setCompanyId ] = useState(undefined);
	const handleOpenUpdate = () => setToggleUpdate(true);
	const handleCloseUpdate = () => setToggleUpdate(false);

	const [ toggleDepartament, setToggleDepartament ] = useState(undefined);
	const handleOpenDepartament = () => setToggleDepartament(true);
	const handleCloseDepartament = () => setToggleDepartament(false);

  const [toggleLabel, setToggleLabel] = useState(undefined);
  const handleOpenLabel = () => setToggleLabel(true);
  const handleCloseLabel = () => setToggleLabel(false);

  const [updateDepartament, setUpdateDepartament] = useState(undefined);
  const [departamentId, setDepartamentId] = useState(undefined);
  const handleOpenUpdateDepartament = () => setUpdateDepartament(true);
  const handleCloseUpdateDepartament = () => setUpdateDepartament(false);

  const [updateLabel, setUpdateLabel] = useState(undefined);
  const [labelId, setLabelId] = useState(undefined);
  const handleOpenUpdateLabel= () => setUpdateLabel(true);
  const handleCloseUpdateLabel = () => setUpdateLabel(false);

	return (
		<div>
			<AddComanyModal toggle={toggle} handleCloseModal={handleCloseModal} />

			<UpdateCompanyModal
				toggleUpdate={toggleUpdate}
				handleCloseUpdate={handleCloseUpdate}
				companyId={companyId}
			/>

			<AddDepartamentModal
				toggleDepartament={toggleDepartament}
				handleCloseDepartament={handleCloseDepartament}
				companyId={companyId}
			/>

      <AddLabelModal
				toggleLabel={toggleLabel}
				handleCloseLabel={handleCloseLabel}
				companyId={companyId}
			/>

      <UpdateDepartamentModal
        updateDepartament={updateDepartament}
        handleCloseUpdateDepartament={handleCloseUpdateDepartament}
        companyId={companyId}
        departamentId={departamentId}
      />

      <UpdateLabelModal
        updateLabel={updateLabel}
        handleCloseUpdateLabel={handleCloseUpdateLabel}
        companyId={companyId}
        labelId={labelId}
      />

			{company == null || company == undefined || company.length == 0 ? (
				<button onClick={handleOpenModal}>create new company</button>
			) : (
				<div>
					<p>company name: {company[0].companyName} </p>
					<p>adress {company[0].adress} </p>
					<h3>Departaments </h3>
					{company[0].departaments == undefined ? (
						<p>no departament</p>
					) : (
						company[0].departaments.map((departament) => (
							<div key={departament._id}>
								<p>departament name: {departament.departamentName}</p>
								<p>departament manager: {departament.departamentManager}</p>
                <button
                  onClick={() => {
                    handleOpenUpdateDepartament();
                    setDepartamentId(departament._id);
                    setCompanyId(company[0]._id);
                  }}
                >edit</button>
                <button
                  onClick={e => store.dispatch(handleDeleteDepartament(company[0]._id, departament._id))}
                >delete</button>
							</div>
						))
					)}

					<h3>Labels:</h3>
					{company[0].labelStatus == undefined ? (
						''
					) : (
						company[0].labelStatus.map((label) => (
							<div key={label._id}>
								<p>labelPriority: {label.labelPriority}</p>
								<p>statusName: {label.statusName}</p>
								<p>color: {label.color}</p>
                <button
                  onClick={() => {
                    handleOpenUpdateLabel();
                    setLabelId(label._id);
                    setCompanyId(company[0]._id);
                  }}
                >edit</button>
                <button
                  onClick={e => store.dispatch(handleDeleteLabel(company[0]._id, label._id))}
                >delete</button>
							</div>
						))
					)}

					<button
						onClick={() => {
							setCompanyId(company[0]._id);
							handleOpenDepartament();
						}}
					>
						{' '}
						add departament
					</button>

          <button
						onClick={() => {
							setCompanyId(company[0]._id);
							handleOpenLabel();
						}}
					>
						{' '}
						add label
					</button>

					<button onClick={() => store.dispatch(handleDeleteCompany(company[0]._id))}>delete company</button>
					<button
						onClick={() => {
							setCompanyId(company[0]._id);
							handleOpenUpdate();
						}}
					>
						edit company
					</button>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	company: state.company.company
});

export default connect(mapStateToProps)(Company);
