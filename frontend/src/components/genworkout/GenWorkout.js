import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const GenWorkout = () => {
  useEffect(async () => {
    try {
      const res = await fetch(`/workouts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.getItem('accessToken')}`,
        },
      });

      const data = await res.json();
      setWorkout(data);
    } catch (error) {
      console.log(error);
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const [workout, setWorkout] = useState([]);

  const onSubmit = async (formValues) => {
    const query = `?musclegroup=${formValues.musclegroup}&difficulty=${formValues.difficulty}&type=${formValues.type}&time=${formValues.time}&saveworkout=false`;
    try {
      const res = await fetch(`/workouts${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.getItem('accessToken')}`,
        },
      });

      const data = await res.json();
      setWorkout(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
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
