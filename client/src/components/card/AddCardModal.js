import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";

import { connect } from "react-redux";
import store from "../../store/store";

import { loadCards, handleAddCard } from "../../actions/card";

const AddCardModal = ({ data, toggle, handleCloseModal, handleAddCard }) => {
  const [card, setCard] = useState({
	  
  });
  const handleChange = (e) => {
	
	const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };
  const handleSubmit = () =>{
	  const card2 = {card,taskList:[]};
	  
          handleAddCard(card2);
          handleCloseModal();
	  
  }

  return (
    <Modal
      isOpen={!!toggle}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      closeTimeoutMS={200}
      className="modal"
    >
		
      <form className='form-container'>
	  <div className="header">
                <h3>Add Card</h3>
        </div>
		<div className="form-input">
          <label htmlFor="phone">title:</label>
        <input type="text" name="cardTitle" placeholder="title" onChange={(e)=>handleChange(e)}/>
		</div>
		<div className="form-input">
          <label htmlFor="phone">Description:</label>
        <input type="text" name="cardDescription" placeholder="description" onChange={(e)=>handleChange(e)}/>
		</div>
		<div className="form-input">
          <label htmlFor="phone">deadline:</label>
        <input type="text" name="deadline" placeholder="deadline" onChange={(e)=>handleChange(e)}/>
		</div>
		<div className="form-input">
          <label htmlFor="phone">Status:</label>
        <input type="text" name="status" placeholder="status" onChange={(e)=>handleChange(e)}/>
		</div>
      </form>
      <button
        className="button"
        onClick={() => {
			handleSubmit();
        }}
      >
        Add
      </button>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  data: state.card.cards,
});

export default connect(mapStateToProps, { handleAddCard })(AddCardModal);
