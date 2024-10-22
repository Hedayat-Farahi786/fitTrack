import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import { useUser } from './context/UserContext';
import Workouts from './pages/Workouts';
import Nutrition from './pages/Nutrition';
import Progress from './pages/Progress';
import { ActivityProvider } from './context/ActivityContext';
import LogMeal from './pages/LogMeal';
import LogWorkout from './pages/LogWorkout';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOnboarded } = useUser();
  
  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  const { isOnboarded } = useUser();

  return (
    <Routes>
      <Route path="/onboarding" element={
        isOnboarded ? <Navigate to="/" replace /> : <Onboarding />
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      {/* Add other protected routes */}
      <Route
        path="/log-workout"
        element={
          <ProtectedRoute>
            <Layout>
              <LogWorkout />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/log-meal"
        element={
          <ProtectedRoute>
            <Layout>
              <LogMeal />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/workouts" element={<ProtectedRoute><Layout><Workouts /></Layout></ProtectedRoute>} />
      <Route path="/nutrition" element={<ProtectedRoute><Layout><Nutrition /></Layout></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><Layout><Progress /></Layout></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <ActivityProvider>
        <AppRoutes />
        </ActivityProvider>
      </UserProvider>
    </Router>
  );
}

export default App;