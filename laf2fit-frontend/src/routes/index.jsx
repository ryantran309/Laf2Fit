import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import HomePage from "../pages/home";
import AboutPage from "../pages/about";
import ErrorPage from "../pages/error";
import SignupPage from "../pages/signup";
import SigninPage from "../pages/signin";
import ProfilePage from "../pages/profile";
import ExcercisePlanPage from "../pages/excercise-plan";
import VirtualTrainerPage from "../pages/virtual-trainer";
import ExcerciseSchedulePage from "../pages/excercise-schedule";
import CaloriesCalculatorPage from "../pages/calories-calculator";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ isLoggedIn, children }) {
  console.log("ProtectedRoute isLoggedIn:", isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/auth/signin" replace />;

  return children ? children : <Outlet />;
}

// eslint-disable-next-line react/prop-types
export default function AppRoutes() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isLoggedIn: ", isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/plan"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ExcercisePlanPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/excercise-schedule"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ExcerciseSchedulePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calories-calculator"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CaloriesCalculatorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/virtual-trainer"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <VirtualTrainerPage />
          </ProtectedRoute>
        }
      />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/auth/signin" element={<SigninPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
