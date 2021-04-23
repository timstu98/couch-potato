import React, { useContext } from 'react';
import './Exercises.css';
import Exercise from '../exercise/Exercise';
import PropTypes from 'prop-types';
import AppContext from '../../context/app-context';

const Exercises = () => {
  const { fitness } = useContext(AppContext);

  return (
    <div className='exercise-list'>
      <h1>Your Workout</h1>
      {fitness?.workouts.map?.((exercise) => (
        <Exercise key={exercise._id} exercise={exercise} />
      ))}
    </div>
  );
};

Exercises.propTypes = {
  data: PropTypes.array,
};

export default Exercises;
