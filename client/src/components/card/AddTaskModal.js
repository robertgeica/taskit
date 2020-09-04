import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";

import { connect } from "react-redux";
import store from "../../store/store";

import { handleAddTask } from "../../actions/card";

const AddTaskModal = ({ cardId, toggleAddTask, handleCloseAddTask }) => {
  const [newTask, setNewTask] = useState({
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  useEffect(()=>{
    if(cardId!==undefined) setNewTask({cardId:cardId._id})
  },[cardId])

  return (
    <Modal
      isOpen={!!toggleAddTask}
      onRequestClose={handleCloseAddTask}
      ariaHideApp={false}
      closeTimeoutMS={200}
      className="modal"
      style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0)" } }}
    >
      <form className="form-container">
        <div className="header">
          <h3>Add task</h3>
        </div>
        <div className="form-input">
          <label htmlFor="phone">title:</label>
          <input
            type="text"
            name="taskTitle"
            placeholder="taskTitle"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="form-input">
          <label htmlFor="phone">Description:</label>
          <input
            type="text"
            name="taskDescription"
            placeholder="taskDescription"
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
          <label htmlFor="status">status:</label>
          <input
            type="text"
            name="status"
            placeholder="status"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="allocatedTo">allocated to:</label>
          <input
            type="text"
            name="allocatedTo"
            placeholder="allocatedTo"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </form>

      <button
        className="button"
        onClick={() => {
          console.log(newTask);
          
          store.dispatch(handleAddTask(cardId._id, newTask));
          handleCloseAddTask();
        }}
      >
        Add task
      </button>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  data: state.card.cards,
});

export default connect(mapStateToProps)(AddTaskModal);
