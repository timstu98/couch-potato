import React, { useState } from 'react';

const [exercises, setExercises] = useState([
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0bfc',
    name: 'Halo',
    link: 'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/394/halo/',
    __v: 0,
  },
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0c06',
    name: 'Power Push Down',
    link: 'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/286/power-push-down/',
    __v: 0,
  },
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0bf5',
    name: 'Inchworms',
    link: 'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/254/inchworms/',
    __v: 0,
  },
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0bfe',
    name: 'Medicine Ball Push-ups',
    link: 'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/40/medicine-ball-push-ups/',
    __v: 0,
  },
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0c0d',
    name: 'Spinal Twist with a Push-Pull Movement',
    link:
      'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/219/spinal-twist-with-a-push-pull-movement/',
    __v: 0,
  },
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0c13',
    name: 'High Plank T-spine Rotation',
    link:
      'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/330/high-plank-t-spine-rotation/',
    __v: 0,
  },
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0c0d',
    name: 'Spinal Twist with a Push-Pull Movement',
    link:
      'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/219/spinal-twist-with-a-push-pull-movement/',
    __v: 0,
  },
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0c00',
    name: 'TRX Suspended Knee Tucks',
    link:
      'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/87/trx-reg-suspended-knee-tucks/',
    __v: 0,
  },
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0c01',
    name: 'TRX Side-straddle Golf Swings',
    link:
      'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/81/trx-reg-side-straddle-golf-swings/',
    __v: 0,
  },
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0c13',
    name: 'High Plank T-spine Rotation',
    link:
      'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/330/high-plank-t-spine-rotation/',
    __v: 0,
  },
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0c03',
    name: 'Offset Single-arm Chest Press',
    link:
      'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/356/offset-single-arm-chest-press/',
    __v: 0,
  },
  {
    musclegroup: 'Upperbody',
    difficulty: 'Advanced',
    _id: '607f3ca688c1673a446d0bf5',
    name: 'Inchworms',
    link: 'https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/254/inchworms/',
    __v: 0,
  },
]);

const Exercises = () => {
  return (
    <div>
      {exercises.map((exercise, _id) => (
        <Exercise key={_id} exercise={exercise} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default Exercises;
