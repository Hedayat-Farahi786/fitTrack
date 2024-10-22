// fitTrack/src/pages/Workouts.tsx

import React from 'react';
import { useUser } from '../context/UserContext';

const Workouts: React.FC = () => {
  const { workoutPlan, loading, error } = useUser();

  if (loading) return <div>Loading workout plan...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!workoutPlan) return <div>No workout plan available.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Choose Your Workout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workoutPlan.map((exercise: any, index: number) => (
          <div key={index} className="card">
            <img src={exercise.gifUrl} alt={exercise.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{exercise.name}</h2>
              <p className="text-sm text-gray-500">
                Body Part: {exercise.bodyPart} | Target Muscle: {exercise.target}
              </p>
              <button className="btn mt-4" onClick={() => /* Handle adding to workout */ {}}>
                Add to My Workout
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;
