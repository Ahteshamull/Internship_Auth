import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FloatingShape from "./Components/FloatingShape";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import VerifyEmail from "./Pages/VerifyEmail";
import Home from "./Pages/Home";
import LoadingSpinner from "./Components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./Store/authStore";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  console.log("ProtectedRoute:", { isAuthenticated, user });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else if (!user) return <Navigate to="/login" replace />;

  if (!user.isVerify) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const ReAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerify) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  const { checkAuth, isCheckingAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      {/* Floating Background Shapes */}
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ReAuthenticatedUser>
              <Signup />
            </ReAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <ReAuthenticatedUser>
              <Login />
            </ReAuthenticatedUser>
          }
        />
        <Route
          path="/verify-email"
          element={
            isAuthenticated && user && !user.isVerify ? (
              <VerifyEmail />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ReAuthenticatedUser>
              <ForgotPassword />
            </ReAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <ReAuthenticatedUser>
              <ResetPassword />
            </ReAuthenticatedUser>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
