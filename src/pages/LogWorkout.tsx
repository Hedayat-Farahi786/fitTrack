// fitTrack/src/pages/LogWorkout.tsx

import React, { useState } from 'react';
import { useActivity } from '../context/ActivityContext';

const LogWorkout: React.FC = () => {
  const { addActivity } = useActivity();
  const [workoutData, setWorkoutData] = useState({
    date: new Date().toISOString().split('T')[0],
    exercises: [],
    duration: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity({
      date: workoutData.date,
      type: 'workout',
      details: workoutData,
    });
    // Redirect or show success message
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Log Workout</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields for date, exercises, duration, notes */}
        <button type="submit" className="btn mt-4">
          Save Workout
        </button>
      </form>
    </div>
  );
};

export default LogWorkout;
