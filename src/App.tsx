import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./components/pages/Login";

import Dashboard from "./components/pages/Dashboard";
import MainLayout from "./components/pages/Layout/MainLayout";

import ProjectDetails from "./components/pages/ProjectDetails";
import Projects from "./components/pages/Projects";
import type { User } from "./Types/types";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = localStorage.getItem("taskflow_user");
  if (!isAdmin) return <Navigate to={"/Login"} replace />;

  const user: User = JSON.parse(isAdmin);
  if (user.role !== "admin") return <Navigate to={"/Login"} replace />;

  return <>{children}</>;
};
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Projects />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Projects/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProjectDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
