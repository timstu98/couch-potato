import React from 'react';

// {
//   "musclegroup": "Upperbody",
//   "difficulty": "Intermediate",
//   "_id": "607d6c484c2e3508e84ab6a1",
//   "name": "Lying Chest Fly",
//   "link": "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/21/lying-chest-fly/",
//   "__v": 0
// },
const Workout = ({ data }) => {
  return (
    <dl>
      <dt>Muscle Group</dt>
      <dd>{data.musclegroup}</dd>

      <dt>Difficulty</dt>
      <dd>{data.difficulty}</dd>

      <dt>Name</dt>
      <dd>{data.name}</dd>
    </dl>
  );
};

export default Workout;
