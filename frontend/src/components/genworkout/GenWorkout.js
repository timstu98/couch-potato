import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import AppContext from '../../context/app-context';
import { loadWorkouts } from '../../context/actions/workouts';
import Exercises from '../exercises/Exercises';
import './genworkout.css';

const GenWorkout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const { dispatch } = useContext(AppContext);

  const onSubmit = async (formValues) => {
    dispatch(loadWorkouts(formValues));
    reset();
  };

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

  return (
    <div className='genWorkoutForm'>
      <fieldset>
        <legend>Generate Workout</legend>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='formInput formWrapper'>
            <label htmlFor='musclegroup'>Muscle Group</label>
            <select id='musclegroup' {...register('musclegroup')}>
              <option value='upperbody'>Upper Body</option>
              <option value='lowerbody'>Lower Body</option>
              <option value='core'>Core</option>
            </select>
          </div>

          <div className='formInput formWrapper'>
            <label htmlFor='difficulty'>Difficulty</label>
            <select id='difficulty' {...register('difficulty')}>
              <option value='beginner'>Beginner</option>
              <option value='intermediate'>Intermediate</option>
              <option value='advanced'>Advanced</option>
            </select>
          </div>

          <div className='formInput formWrapper'>
            <label htmlFor='type'>Type</label>
            <select id='type' {...register('type')}>
              <option value='strength'>Strength</option>
              <option value='tone'>Tone</option>
            </select>
          </div>

          <div className='formInput'>
            <div className='formWrapper'>
              <input
                id='time'
                placeholder='Enter workout length (minutes)'
                type='number'
                {...register('time', {
                  required: 'Please enter your workout length in minutes',
                  max: {
                    value: 120,
                    message: 'Max value 120 minutes',
                  },
                })}
              />
            </div>
            {errors.time && <span style={{ color: 'red' }}>{errors.time.message}</span>}
          </div>
          <button type='submit'>Generate Workout</button>
        </form>
      </fieldset>
      <Exercises data={exercises} />
    </div>
  );
};

export default GenWorkout;
