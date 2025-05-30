import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeList from "./pages/EmployeeList";
import Navbar from "./components/NavBar";

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/create-employee" element={<EmployeeForm />} />
        <Route path="/edit-employee/:id" element={<EmployeeForm />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </div>
  );
}
