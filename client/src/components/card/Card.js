import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import AddCardModal from './AddCardModal';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store/store';

// Actions
import { loadCards } from '../../actions/card';

const Card = ({ cards }) => {

	useEffect(() => {
    store.dispatch(loadCards());
	}, []);

    const [toggle, setToggle] = useState(undefined);
    const handleOpenModal = () => setToggle(true);
    const handleCloseModal = () => setToggle(false);

  console.log(cards);
	return (
    <div>
      <AddCardModal 
        toggle={toggle}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
      />

      <button onClick={handleOpenModal}>Add new card </button>
      cards
    </div>
  );
};

const mapStateToProps = (state) => ({
	cards: state.card.cards
});

export default connect(mapStateToProps)(Card);
