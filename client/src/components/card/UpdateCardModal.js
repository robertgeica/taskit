import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";

import { connect } from "react-redux";
import store from "../../store/store";

import { loadCards, handleUpdateCard } from "../../actions/card";
import card from "../../reducers/card";

const UpdateCardModal = ({
  card,
  cardId,
  toggleUpdate,
  handleCloseUpdateModal,
}) => {
  const [newCard, setNewCard] = useState({
    cardTitle: "",
    cardDescription: "",
    deadline: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

console.log(card)

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
          />
		  
        </div>
        <div className="form-input">
          <label htmlFor="phone">description:</label>
          <input
            type="text"
            name="cardDescription"
			placeholder="description"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="phone">deadline:</label>
          <input
            type="text"
            name="deadline"
			placeholder="deadline"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="phone">status:</label>
          <input
            type="text"
            name="status"
			placeholder="status"	
            onChange={(e) => handleChange(e)}
          />
        </div>
		<button
        className="button"
        onClick={(e) => {
			e.preventDefault();
          store.dispatch(handleUpdateCard(cardId, newCard));
          handleCloseUpdateModal();
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
