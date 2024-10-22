import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  personalInfo: {
    name: string;
    age: number;
    height: number;
    weight: number;
    gender: 'male' | 'female' | 'other';
  };
  goals: {
    type: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'general_fitness';
    targetWeight?: number;
    weeklyWorkouts: number;
    dailyCalories: number;
  };
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active';
  healthConditions: string[];
  preferences: {
    measurementUnit: 'metric' | 'imperial';
    workoutReminders: boolean;
    mealReminders: boolean;
  };
}

interface UserContextType {
  userData: UserData | null;
  isOnboarded: boolean;
  updateUserData: (data: Partial<UserData>) => void;
  calculateBMR: () => number;
  calculateTDEE: () => number;
  calculateMacros: () => { protein: number; carbs: number; fat: number };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'fittrack_user_data';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    }
  }, [userData]);

  const calculateBMR = () => {
    if (!userData?.personalInfo) return 0;
    const { weight, height, age, gender } = userData.personalInfo;
    
    // Mifflin-St Jeor Equation
    if (gender === 'male') {
      return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
  };

  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very_active: 1.725,
      extra_active: 1.9,
    };
    
    return Math.round(bmr * activityMultipliers[userData?.activityLevel || 'sedentary']);
  };

  const calculateMacros = () => {
    const dailyCalories = userData?.goals?.dailyCalories || calculateTDEE();
    const goalType = userData?.goals?.type;

    let proteinRatio, fatRatio, carbsRatio;

    switch (goalType) {
      case 'muscle_gain':
        proteinRatio = 0.3; // 30%
        fatRatio = 0.25;    // 25%
        carbsRatio = 0.45;  // 45%
        break;
      case 'weight_loss':
        proteinRatio = 0.4; // 40%
        fatRatio = 0.3;     // 30%
        carbsRatio = 0.3;   // 30%
        break;
      default:
        proteinRatio = 0.3; // 30%
        fatRatio = 0.3;     // 30%
        carbsRatio = 0.4;   // 40%
    }

    return {
      protein: Math.round((dailyCalories * proteinRatio) / 4), // 4 calories per gram
      carbs: Math.round((dailyCalories * carbsRatio) / 4),     // 4 calories per gram
      fat: Math.round((dailyCalories * fatRatio) / 9),         // 9 calories per gram
    };
  };

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData(current => {
      if (!current) return newData as UserData;
      return { ...current, ...newData };
    });
  };

  return (
    <UserContext.Provider value={{
      userData,
      isOnboarded: !!userData,
      updateUserData,
      calculateBMR,
      calculateTDEE,
      calculateMacros,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};