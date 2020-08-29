import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";

import { connect } from "react-redux";
import store from "../../store/store";

import { loadCompany, handleAddCompany } from "../../actions/company";

const AddCompanyModal = ({ data, toggle, handleCloseModal }) => {
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
      isOpen={!!toggle}
      onRequestClose={handleCloseModal}
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
          store.dispatch(handleAddCompany(company));
          handleCloseModal();
        }}
      >
        Add comp
      </button>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  data: state.company.company,
});

export default connect(mapStateToProps)(AddCompanyModal);
