import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const OnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      age: '',
      height: '',
      weight: '',
      gender: 'male',
    },
    goals: {
      type: 'general_fitness',
      targetWeight: '',
      weeklyWorkouts: 3,
      dailyCalories: 2000,
    },
    activityLevel: 'moderate',
    healthConditions: [] as string[],
    preferences: {
      measurementUnit: 'metric',
      workoutReminders: true,
      mealReminders: true,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      updateUserData(formData);
      navigate('/');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="input mt-1"
                  value={formData.personalInfo.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  className="input mt-1"
                  value={formData.personalInfo.age}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        age: e.target.value,
                      },
                    })
                  }
                />
              </div>
              {/* Add other personal info fields */}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Fitness Goals</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Primary Goal
                </label>
                <select
                  className="select mt-1"
                  value={formData.goals.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      goals: {
                        ...formData.goals,
                        type: e.target.value as any,
                      },
                    })
                  }
                >
                  <option value="weight_loss">Weight Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="general_fitness">General Fitness</option>
                </select>
              </div>
              {/* Add other goal-related fields */}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Activity Level</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Activity Level
                </label>
                <select
                  className="select mt-1"
                  value={formData.activityLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      activityLevel: e.target.value as any,
                    })
                  }
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Lightly Active</option>
                  <option value="moderate">Moderately Active</option>
                  <option value="very_active">Very Active</option>
                  <option value="extra_active">Extra Active</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Health & Preferences</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Health Conditions
                </label>
                <textarea
                  className="input mt-1"
                  placeholder="List any health conditions or limitations..."
                  value={formData.healthConditions.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      healthConditions: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                />
              </div>
              {/* Add preference settings */}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome to FitTrack Pro
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's get to know you better
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="btn-secondary"
                >
                  Back
                </button>
              )}
              <button type="submit" className="btn ml-auto">
                {step === 4 ? 'Complete Setup' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;