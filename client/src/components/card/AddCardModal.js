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
    setCard({ ...card, card:{[name]: value},cardTasks:[]});
  };

  return (
    <Modal
      isOpen={!!toggle}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      closeTimeoutMS={200}
      className="addroadmap-modal"
    >
      <form>
        <input type="text" name="cardTitle" placeholder="title" onChange={(e)=>handleChange(e)}/>
        <input type="text" name="cardDescription" placeholder="description" onChange={(e)=>handleChange(e)}/>
        <input type="text" name="deadline" placeholder="deadline" onChange={(e)=>handleChange(e)}/>
        <input type="text" name="status" placeholder="status" onChange={(e)=>handleChange(e)}/>
      </form>
      <button
        className="button"
        onClick={() => {
			console.log(card);
          handleAddCard(card);
          handleCloseModal();
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
