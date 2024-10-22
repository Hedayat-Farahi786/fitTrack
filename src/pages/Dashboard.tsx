import React from 'react';
import { Activity, Dumbbell, Scale, Target } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import { useUser } from '../context/UserContext';

const Dashboard: React.FC = () => {
  const { userData } = useUser();

  const userName = userData?.personalInfo.name

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, { userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase() }!</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's your fitness overview for today
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Calories"
          value="2,345"
          icon={Activity}
          change={{ value: 12, type: 'increase' }}
        />
        <StatCard
          title="Workouts This Week"
          value="5"
          icon={Dumbbell}
          change={{ value: 8, type: 'increase' }}
        />
        <StatCard
          title="Current Weight"
          value="75.5 kg"
          icon={Scale}
          change={{ value: 2.1, type: 'decrease' }}
        />
        <StatCard
          title="Goal Progress"
          value="68%"
          icon={Target}
          color="green"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="px-6 py-4">
            <div className="flow-root">
              <ul className="-mb-8">
                {[
                  {
                    id: 1,
                    content: 'Completed upper body workout',
                    target: 'Strength Training',
                    date: '1 hour ago',
                  },
                  {
                    id: 2,
                    content: 'Logged breakfast',
                    target: '650 calories',
                    date: '3 hours ago',
                  },
                  {
                    id: 3,
                    content: 'Updated weight',
                    target: '75.5 kg',
                    date: '5 hours ago',
                  },
                ].map((item) => (
                  <li key={item.id}>
                    <div className="relative pb-8">
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Activity className="h-5 w-5 text-indigo-600" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {item.content}{' '}
                              <span className="font-medium text-gray-900">
                                {item.target}
                              </span>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {item.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Today's Goals */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Today's Goals
            </h3>
          </div>
          <div className="px-6 py-4">
            <ul className="divide-y divide-gray-200">
              {[
                {
                  id: 1,
                  name: 'Calories',
                  target: 2500,
                  current: 1650,
                  unit: 'kcal',
                },
                {
                  id: 2,
                  name: 'Water Intake',
                  target: 3000,
                  current: 2100,
                  unit: 'ml',
                },
                {
                  id: 3,
                  name: 'Steps',
                  target: 10000,
                  current: 6500,
                  unit: 'steps',
                },
              ].map((goal) => (
                <li key={goal.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {goal.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {goal.current} / {goal.target} {goal.unit}
                      </p>
                    </div>
                    <div className="ml-4 w-28">
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            style={{
                              width: `${(goal.current / goal.target) * 100}%`,
                            }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;