import React, { useState, useEffect } from 'react';
import Exercise from '../exercise/Exercise';
import PropTypes from 'prop-types';

const Exercises = ({ data }) => {
  const updData = data.map((exercise) => {
    return { ...exercise, completed: false };
  });

  const [exercises, setExercises] = useState(updData);

  const deleteExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise._id !== id));
  };

  const completeExercise = (id) => {
    setExercises(
      exercises.map((exercise) => (exercise._id === id ? { ...exercise, completed: !exercise.completed } : exercise)),
    );
  };

  return (
    <div>
      {exercises.map((exercise) => (
        <Exercise key={exercise._id} exercise={exercise} onComplete={completeExercise} onDelete={deleteExercise} />
      ))}
    </div>
  );
};

Exercises.propTypes = {
  data: PropTypes.array,
};

export default Exercises;
