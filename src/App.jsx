import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Analyze from "./pages/Analyze";

const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/analyze"
          element={
            <PrivateRoute>
              <Analyze />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;