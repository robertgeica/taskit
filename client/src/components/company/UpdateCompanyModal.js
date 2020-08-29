import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";

import { connect } from "react-redux";
import store from "../../store/store";

import { loadCompany, handleUpdateCompany, companyId } from "../../actions/company";

const UpdateCompanyModal = ({ data, companyId, toggleUpdate, handleCloseUpdate }) => {
  const [company, setCompany] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ 
      ...company, 
      [name]: value,
      departaments: [],
      labelStatus: []
    });

  };

  return (
    <Modal
      isOpen={!!toggleUpdate}
      onRequestClose={handleCloseUpdate}
      ariaHideApp={false}
      closeTimeoutMS={200}
      className="modal"
    >
      <form>
        <input type="text" name="companyName" placeholder="companyName" onChange={(e)=>handleChange(e)}/>
        <input type="text" name="adress" placeholder="adress" onChange={(e)=>handleChange(e)}/>
      </form>
      <button
        className="button"
        onClick={() => {
          store.dispatch(handleUpdateCompany(companyId, company));
          handleCloseUpdate();
        }}
      >
        update comp
      </button>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  data: state.company.company,
});

export default connect(mapStateToProps)(UpdateCompanyModal);
