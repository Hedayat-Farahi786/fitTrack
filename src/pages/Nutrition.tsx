// fitTrack/src/pages/Nutrition.tsx

import React from 'react';
import { useUser } from '../context/UserContext';
import MacroChart from '../components/Nutrition/MacroChart';

const Nutrition: React.FC = () => {
  const { mealPlan, calculateMacros, loading, error } = useUser();
  const macros = calculateMacros();

  if (loading) return <div>Loading meal plan...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!mealPlan) return <div>No meal plan available.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Daily Meal Plan</h1>

      <MacroChart
        protein={macros.protein}
        carbs={macros.carbs}
        fat={macros.fat}
        total={mealPlan.nutrients.calories}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {mealPlan.meals.map((meal: any) => (
          <div key={meal.id} className="card">
            <img src={meal.image} alt={meal.title} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{meal.title}</h2>
              <p className="text-sm text-gray-500">
                Ready in {meal.readyInMinutes} minutes | Servings: {meal.servings}
              </p>
              <p className="mt-2">
                {meal.summary && (
                  <span dangerouslySetInnerHTML={{ __html: meal.summary }}></span>
                )}
              </p>
              <a
                href={meal.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-4"
              >
                View Full Recipe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nutrition;
