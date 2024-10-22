import React from 'react';

interface MacroChartProps {
  protein: number;
  carbs: number;
  fat: number;
  total: number;
}

const MacroChart: React.FC<MacroChartProps> = ({
  protein,
  carbs,
  fat,
  total,
}) => {
  const proteinPercentage = Math.round((protein * 4 / total) * 100);
  const carbsPercentage = Math.round((carbs * 4 / total) * 100);
  const fatPercentage = Math.round((fat * 9 / total) * 100);

  return (
    <div className="w-full">
      <div className="flex h-4 rounded-full overflow-hidden">
        <div
          style={{ width: `${proteinPercentage}%` }}
          className="bg-blue-500"
          title={`Protein: ${proteinPercentage}%`}
        />
        <div
          style={{ width: `${carbsPercentage}%` }}
          className="bg-green-500"
          title={`Carbs: ${carbsPercentage}%`}
        />
        <div
          style={{ width: `${fatPercentage}%` }}
          className="bg-yellow-500"
          title={`Fat: ${fatPercentage}%`}
        />
      </div>
      
      <div className="mt-2 flex justify-between text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
          <span>Protein ({proteinPercentage}%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1" />
          <span>Carbs ({carbsPercentage}%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1" />
          <span>Fat ({fatPercentage}%)</span>
        </div>
      </div>
    </div>
  );
};