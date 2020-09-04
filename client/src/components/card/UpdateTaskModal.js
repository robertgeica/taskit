import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";

import { connect } from "react-redux";
import store from "../../store/store";

import { handleUpdateTask } from "../../actions/card";

const UpdateCardModal = ({
  task,
  toggleUpdateTask,
  handleCloseUpdateTask,
  handleCloseTaskModal,
}) => {
  const [newTask, setNewTask] = useState({
    taskTitle: "",
    taskDescription: "",
    deadline: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };


  useEffect(()=>{

    if(task){
    setNewTask({
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      deadline: task.deadline,
      status: task.status,
      allocatedTo: task.allocatedTo,
      cardId:task.cardId
        })}
  },[])

  return (
    <Modal
      isOpen={!!toggleUpdateTask}
      onRequestClose={handleCloseUpdateTask}
      ariaHideApp={false}
      closeTimeoutMS={200}
      className="modal"
      style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0)" } }}
    >
      <form className="form-container">
        <div className="header">
          <h3>Edit Task</h3>
        </div>
        <div className="form-input">
          <label htmlFor="taskTitle">title:</label>
          <input
            type="text"
            name="taskTitle"
            placeholder="title"
            onChange={(e) => handleChange(e)}
            defaultValue={newTask.taskTitle}
          />
        </div>
        <div className="form-input">
          <label htmlFor="TaskDescription">description:</label>
          <input
            type="text"
            name="taskDescription"
            placeholder="description"
            onChange={(e) => handleChange(e)}
            defaultValue={newTask.taskDescription}
          />
        </div>
        <div className="form-input">
          <label htmlFor="status">status:</label>
          <input
            type="text"
            name="status"
            placeholder="status"
            onChange={(e) => handleChange(e)}
            defaultValue={newTask.status}
          />
        </div>
        <div className="form-input">
          <label htmlFor="deadline">deadline:</label>
          <input
            type="text"
            name="deadline"
            placeholder="deadline"
            onChange={(e) => handleChange(e)}
            defaultValue={newTask.deadline}
          />
        </div>
        <div className="form-input">
          <label htmlFor="deadline">allocatedTo:</label>
          <input
            type="text"
            name="allocatedTo"
            placeholder="allocatedTo"
            onChange={(e) => handleChange(e)}
            defaultValue={newTask.allocatedTo}
          />
        </div>
        
      </form>
      <button
        className="button"
        onClick={() => {
          store.dispatch(handleUpdateTask(task.cardId, task._id, newTask));
          handleCloseUpdateTask();
          handleCloseTaskModal();
        }}
      >
        Update task
      </button>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  data: state.card.cards,
});

export default connect(mapStateToProps)(UpdateCardModal);
