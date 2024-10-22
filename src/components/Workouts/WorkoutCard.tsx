import React from 'react';
import { Clock, Weight, Repeat } from 'lucide-react';
import type { Workout } from '../../types';

interface WorkoutCardProps {
  workout: Workout;
  onClick?: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {workout.type}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(workout.date).toLocaleDateString()}
            </p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {workout.exercises.length} exercises
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1.5" />
            {workout.duration}m
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Weight className="h-4 w-4 mr-1.5" />
            {workout.exercises.reduce((acc, ex) => acc + (ex.weight || 0), 0)}kg
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Repeat className="h-4 w-4 mr-1.5" />
            {workout.exercises.reduce((acc, ex) => acc + (ex.sets || 0), 0)} sets
          </div>
        </div>

        {workout.notes && (
          <p className="mt-4 text-sm text-gray-600 line-clamp-2">
            {workout.notes}
          </p>
        )}
      </div>
    </div>
  );
};