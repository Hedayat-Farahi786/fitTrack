import React, { createContext, useContext, useState, useEffect } from "react";
import {
  generateWorkoutPlan,
  generateMealPlan,
} from "../utils/personalization";
import axios from "axios";

interface UserData {
  personalInfo: {
    name: string;
    age: number;
    height: number;
    weight: number;
    gender: "male" | "female" | "other";
  };
  goals: {
    type: "weight_loss" | "muscle_gain" | "maintenance" | "general_fitness";
    targetWeight?: number;
    weeklyWorkouts: number;
    dailyCalories: number;
  };
  activityLevel:
    | "sedentary"
    | "light"
    | "moderate"
    | "very_active"
    | "extra_active";
  healthConditions: string[];
  preferences: {
    measurementUnit: 'metric' | 'imperial';
    workoutReminders: boolean;
    mealReminders: boolean;
    dietType?: string; // Add this line
  };
}

interface UserContextType {
  userData: UserData | null;
  isOnboarded: boolean;
  updateUserData: (data: Partial<UserData>) => void;
  calculateBMR: () => number;
  calculateTDEE: () => number;
  calculateMacros: () => { protein: number; carbs: number; fat: number };
  workoutPlan: any; // Define appropriate types
  mealPlan: any;
  loading: boolean;
  error: string | null;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "fittrack_user_data";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPlans = async () => {
      if (userData) {
        setLoading(true);
        setError(null);
        try {
          const dailyCalories = userData.goals.dailyCalories || calculateTDEE();

          const [meal, workout] = await Promise.all([
            fetchMealPlan(dailyCalories),
            fetchWorkoutPlan(userData.goals.type),
          ]);

          setMealPlan(meal);
          setWorkoutPlan(workout);
        } catch (err) {
          setError("Failed to fetch plans. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      getPlans();
    }
  }, [userData]);

  const fetchMealPlan = async (calories: number) => {
    try {
      const response = await axios.get('/api/spoonacular/mealplanner/generate', {
        params: {
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          timeFrame: 'day',
          targetCalories: calories,
          diet: userData.preferences.dietType, // Optional: if user specifies a diet
        },
      });
  
      // Fetch detailed recipe information for each meal
      const mealDetails = await Promise.all(
        response.data.meals.map(async (meal: any) => {
          const mealResponse = await axios.get(`/api/spoonacular/recipes/${meal.id}/information`, {
            params: {
              apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
              includeNutrition: true,
            },
          });
          return mealResponse.data;
        })
      );
  
      return {
        ...response.data,
        meals: mealDetails,
      };
    } catch (error) {
      console.error('Error fetching meal plan:', error.response?.data || error.message);
      return null;
    }
  };

  // const fetchWorkoutPlan = async (goalType: string) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.example.com/workouts`,
  //       {
  //         params: {
  //           goal: goalType,
  //           // Include other parameters based on user data
  //         },
  //         headers: {
  //           'Authorization': `Bearer ${import.meta.env.VITE_WORKOUT_API_KEY}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching workout plan:', error);
  //     return null;
  //   }
  // };
  
  const fetchWorkoutPlan = async (goalType: string) => {
    try {
      // Using ExerciseDB API via RapidAPI
      const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
      });
  
      // Filter exercises based on user's goalType
      const filteredExercises = response.data.filter((exercise: any) => {
        // Add logic to filter exercises based on goalType, e.g., muscle groups
        return true; // Placeholder logic
      });
  
      return filteredExercises;
    } catch (error) {
      console.error('Error fetching workout plan:', error.response?.data || error.message);
      return null;
    }
  };

  const calculateBMR = () => {
    if (!userData?.personalInfo) return 0;
    const { weight, height, age, gender } = userData.personalInfo;

    // Mifflin-St Jeor Equation
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
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

    return Math.round(
      bmr * activityMultipliers[userData?.activityLevel || "sedentary"]
    );
  };

  const calculateMacros = () => {
    const dailyCalories = userData?.goals?.dailyCalories || calculateTDEE();
    const goalType = userData?.goals?.type;

    let proteinRatio, fatRatio, carbsRatio;

    switch (goalType) {
      case "muscle_gain":
        proteinRatio = 0.3; // 30%
        fatRatio = 0.25; // 25%
        carbsRatio = 0.45; // 45%
        break;
      case "weight_loss":
        proteinRatio = 0.4; // 40%
        fatRatio = 0.3; // 30%
        carbsRatio = 0.3; // 30%
        break;
      default:
        proteinRatio = 0.3; // 30%
        fatRatio = 0.3; // 30%
        carbsRatio = 0.4; // 40%
    }

    return {
      protein: Math.round((dailyCalories * proteinRatio) / 4), // 4 calories per gram
      carbs: Math.round((dailyCalories * carbsRatio) / 4), // 4 calories per gram
      fat: Math.round((dailyCalories * fatRatio) / 9), // 9 calories per gram
    };
  };

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData((current) => {
      if (!current) return newData as UserData;
      return { ...current, ...newData };
    });
  };

  // Inside UserProvider
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);

  // After updating userData
  useEffect(() => {
    if (userData) {
      const workout = generateWorkoutPlan(userData);
      const meal = generateMealPlan(userData);
      setWorkoutPlan(workout);
      setMealPlan(meal);
    }
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        isOnboarded: !!userData,
        updateUserData,
        calculateBMR,
        calculateTDEE,
        calculateMacros,
        workoutPlan,
        mealPlan,
        loading,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
