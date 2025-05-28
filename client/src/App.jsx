import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeList from "./pages/EmployeeList";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/create-employee" element={<EmployeeForm />} />
        <Route path="/edit-employee/:id" element={<EmployeeForm />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </div>
  );
};

export default App;
