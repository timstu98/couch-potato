import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Exercise.css';
import { FaTimes, FaCheck } from 'react-icons/fa';
import AppContext from '../../context/app-context';
import { DELETE_EXERCISE, COMPLETE_EXERCISE } from '../../context/actions/types';

const Exercise = ({ exercise }) => {
  const { dispatch } = useContext(AppContext);

  const onComplete = (id) => {
    dispatch({ type: COMPLETE_EXERCISE, payload: id });
  };
  const onDelete = (id) => {
    dispatch({ type: DELETE_EXERCISE, payload: id });
  };

  return (
    <div className={`exercise ${exercise.completed ? 'completed completed-text' : ''}`}>
      <h3>
        {exercise.name}
        <div className='icons'>
          <FaCheck style={{ color: '#4682b4', cursor: 'pointer' }} onClick={() => onComplete(exercise._id)} />
          <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(exercise._id)} />
        </div>
      </h3>
      <h4>{exercise.musclegroup}</h4>
      <h5>{exercise.difficulty}</h5>
    </div>
  );
};

Exercise.propTypes = {
  exercise: PropTypes.object,
};

export default Exercise;
