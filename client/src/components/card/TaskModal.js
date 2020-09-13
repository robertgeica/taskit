import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import UpdateTaskModal from "./UpdateTaskModal";

import { connect } from "react-redux";
import store from "../../store/store";

import { handleDeleteTask } from "../../actions/card";

import "./card.scss";

const TaskModal = ({
  toggleTaskModal,
  handleCloseTaskModal,
  currentTask,
  cardId,
  isAllocated
}) => {
  const [toggleUpdateTask, setToggleUpdateTask] = useState(undefined);
  const handleOpenUpdateTask = () => setToggleUpdateTask(true);
  const handleCloseUpdateTask = () => setToggleUpdateTask(false);

  return (
    <Modal
      isOpen={!!toggleTaskModal}
      onRequestClose={handleCloseTaskModal}
      ariaHideApp={false}
      closeTimeoutMS={200}
      className="modal"
      style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0)" } }}
    >
      <UpdateTaskModal
        toggleUpdateTask={toggleUpdateTask}
        handleCloseUpdateTask={handleCloseUpdateTask}
        handleCloseTaskModal={handleCloseTaskModal}
        cardId={cardId}
        task={currentTask}
      />
    
      <div className="modal-header">
        <button
          className="button task-button"
          onClick={() => {
            handleOpenUpdateTask();
          }}
        >
          Edit
        </button>
          {isAllocated==undefined?"":
        <button
          className="button task-button"
          onClick={() => {
            store.dispatch(handleDeleteTask(currentTask.cardId, currentTask._id));
            handleCloseTaskModal();
          }}
        >
          Delete
        </button>
}
      </div>

      <div className="modal-body">
        <p>task title: {currentTask.taskTitle}</p>
        <p>taskDescription: {currentTask.taskDescription}</p>
        <p>status: {currentTask.status}</p>
        <p>deadline: {currentTask.deadline}</p>
        <p>createAt: {currentTask.createdAt}</p>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  data: state.card.cards,
});

export default connect(mapStateToProps)(TaskModal);
