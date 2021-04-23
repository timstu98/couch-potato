import React, { useContext } from 'react';
import Exercise from '../exercise/Exercise';
import PropTypes from 'prop-types';
import AppContext from '../../context/app-context';

const Exercises = () => {
  const { fitness } = useContext(AppContext);

  return (
    <div>
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
