import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AppContext from '../../context/app-context';
import { loadWorkouts } from '../../context/actions/workouts';

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

  return (
    <div>
      <fieldset>
        <legend>Generate Workout</legend>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='musclegroup'>Muscle Group</label>
            <select id='musclegroup' {...register('musclegroup')}>
              <option value='upperbody'>Upper Body</option>
              <option value='lowerbody'>Lower Body</option>
              <option value='core'>Core</option>
            </select>
          </div>

          <div>
            <label htmlFor='difficulty'>Difficulty</label>
            <select id='difficulty' {...register('difficulty')}>
              <option value='beginner'>Beginner</option>
              <option value='intermediate'>Intermediate</option>
              <option value='advanced'>Advanced</option>
            </select>
          </div>

          <div>
            <label htmlFor='type'>Type</label>
            <select id='type' {...register('type')}>
              <option value='strength'>Strength</option>
              <option value='tone'>Tone</option>
            </select>
          </div>

          <div>
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

          <button type='submit'>Generate Workout</button>
        </form>
      </fieldset>
    </div>
  );
};

export default GenWorkout;
