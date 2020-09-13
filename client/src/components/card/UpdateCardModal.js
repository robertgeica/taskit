import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";

import { connect } from "react-redux";
import store from "../../store/store";

import { loadCards, handleUpdateCard } from "../../actions/card";
import card from "../../reducers/card";

const UpdateCardModal = ({
  cardId,
  toggleUpdate,
  handleCloseUpdateModal,
}) => {
  const [newCard, setNewCard] = useState({
    cardTitle: '',
    cardDescription: "",
    deadline: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  useEffect(()=>{

    if(cardId){
    setNewCard({
          cardTitle: cardId.card.cardTitle,
          cardDescription: cardId.card.cardDescription,
          deadline: cardId.card.deadline,
          status: cardId.card.status,
        })}
  },[cardId])


  return (
    <Modal
      isOpen={!!toggleUpdate}
      onRequestClose={handleCloseUpdateModal}
      ariaHideApp={false}
      closeTimeoutMS={200}
      className="modal"
      style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0)" } }}
    >
      <form className="form-container">
	  <div className="header">
                <h3>Edit Card</h3>
              </div>
        <div className="form-input">
          <label htmlFor="phone">title:</label>
          <input
            type="text"
            name="cardTitle"
			placeholder="title"
            onChange={(e) => handleChange(e)}
            defaultValue={newCard.cardTitle}
          />
		  
        </div>
        <div className="form-input">
          <label htmlFor="phone">description:</label>
          <input
            type="text"
            name="cardDescription"
			placeholder="description"
            onChange={(e) => handleChange(e)}
            defaultValue={newCard.cardDescription}
          />
        </div>
		<button
        className="button"
        onClick={(e) => {
      e.preventDefault();
      if(cardId._id){
          store.dispatch(handleUpdateCard(cardId._id, newCard));
          handleCloseUpdateModal();
        console.log(cardId._id)}
        }}
      >
        Update
      </button>
      </form>
      
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  data: state.card.cards,
});

export default connect(mapStateToProps)(UpdateCardModal);
