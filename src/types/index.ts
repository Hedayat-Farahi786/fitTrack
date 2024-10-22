export interface Exercise {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility';
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  restPeriod?: number;
}

export interface Workout {
  id: string;
  date: string;
  type: string;
  exercises: Exercise[];
  duration: number;
  notes?: string;
}

export interface NutritionLog {
  id: string;
  date: string;
  meals: {
    id: string;
    name: string;
    foods: {
      name: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      portion: number;
    }[];
  }[];
  waterIntake: number;
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface BodyMetrics {
  id: string;
  date: string;
  weight: number;
  measurements?: {
    chest: number;
    waist: number;
    hips: number;
    arms: number;
    thighs: number;
  };
  bodyFatPercentage?: number;
  photoUrl?: string;
}

export interface UserGoals {
  targetWeight?: number;
  targetBodyFat?: number;
  weeklyWorkouts?: number;
  dailyCalories?: number;
  dailyProtein?: number;
  notes?: string;
}