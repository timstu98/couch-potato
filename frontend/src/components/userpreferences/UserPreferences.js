import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { changePreferences } from '../../context/actions/workouts';
import AppContext from '../../context/app-context';

const UserPreferences = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const { dispatch } = useContext(AppContext);

  const onSubmit = async (formValues) => {
    dispatch(changePreferences(formValues));
    reset();
  };

  return (
    <div className='genWorkoutForm'>
      <fieldset>
        <legend>Update Workout Preferences</legend>
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

          <div className='formInput formWrapper'>
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

          <button type='submit'>Update Workout Preferences</button>
        </form>
      </fieldset>
    </div>
  );
};

export default UserPreferences;
