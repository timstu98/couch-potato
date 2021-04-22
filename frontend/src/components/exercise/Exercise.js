import React from 'react';
import PropTypes from 'prop-types';
import './Exercise.css';
import { FaTimes, FaCheck } from 'react-icons/fa';

const Exercise = ({ exercise, onComplete, onDelete }) => {
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
  onComplete: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Exercise;
