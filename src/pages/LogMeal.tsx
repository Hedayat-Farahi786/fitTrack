// fitTrack/src/pages/LogMeal.tsx

import React, { useState } from 'react';
import { useActivity } from '../context/ActivityContext';

const LogMeal: React.FC = () => {
  const { addActivity } = useActivity();
  const [mealData, setMealData] = useState({
    date: new Date().toISOString().split('T')[0],
    mealType: 'breakfast',
    foods: [],
    totalCalories: 0,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity({
      date: mealData.date,
      type: 'meal',
      details: mealData,
    });
    // Redirect or show success message
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Log Meal</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields for date, meal type, foods, total calories, notes */}
        <button type="submit" className="btn mt-4">
          Save Meal
        </button>
      </form>
    </div>
  );
};

export default LogMeal;
