import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import UpdateTaskModal from "./UpdateTaskModal";

import { connect } from "react-redux";
import store from "../../store/store";

import { handleDeleteTask } from "../../actions/card";

import './card.scss'

const TaskModal = ({
  toggleTaskModal,
  handleCloseTaskModal,
  currentTask,
  cardId,
}) => {
  const [toggleUpdateTask, setToggleUpdateTask] = useState(undefined);
  const handleOpenUpdateTask = () => setToggleUpdateTask(true);
  const handleCloseUpdateTask = () => setToggleUpdateTask(false);

  console.log(currentTask);
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
        taskId={currentTask._id}
      />

      <div className="modal-header">
        <button
        className='button task-button'
          onClick={() => {
            handleOpenUpdateTask();
          }}
        >
          Edit
        </button>

        <button
        className='button task-button'
          onClick={() => {
            store.dispatch(handleDeleteTask(cardId, currentTask._id));
            handleCloseTaskModal();
          }}
        >
          Delete
        </button>
      </div>

      <div className="modal-body">
        <p>createAt: {currentTask.createAt}</p>
        <p>deadline: {currentTask.deadline}</p>
        <p>status: {currentTask.status}</p>
        <p>taskDescription: {currentTask.taskDescription}</p>
        <p>task title: {currentTask.taskTitle}</p>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  data: state.card.cards,
});

export default connect(mapStateToProps)(TaskModal);
