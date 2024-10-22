// fitTrack/src/pages/Progress.tsx

import React from 'react';
import { useActivity } from '../context/ActivityContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Progress: React.FC = () => {
  const { activities } = useActivity();

  // Process activities to create data for charts
  const dates = [...new Set(activities.map((a) => a.date))].sort();
  const caloriesData = dates.map((date) => {
    const meals = activities.filter((a) => a.date === date && a.type === 'meal');
    return meals.reduce((sum, meal) => sum + meal.details.totalCalories, 0);
  });

  const workoutsData = dates.map((date) => {
    const workouts = activities.filter((a) => a.date === date && a.type === 'workout');
    return workouts.reduce((sum, workout) => sum + parseInt(workout.details.duration), 0);
  });

  const caloriesChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Calories Consumed',
        data: caloriesData,
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  };

  const workoutsChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Workout Duration (min)',
        data: workoutsData,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Progress</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Calories Consumed Over Time</h2>
          <Bar data={caloriesChartData} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Workout Duration Over Time</h2>
          <Line data={workoutsChartData} />
        </div>
      </div>
      {/* Add more charts or summaries as needed */}
    </div>
  );
};

export default Progress;
