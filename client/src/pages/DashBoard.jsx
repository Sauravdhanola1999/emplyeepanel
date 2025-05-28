import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) navigate("/");
    setUsername(user);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {username}</h1>
      <div className="mt-4 space-x-4">
        <button
          onClick={() => navigate("/create-employee")}
          className="btn btn-primary"
        >
          Create Employee
        </button>
        <button
          onClick={() => navigate("/employees")}
          className="btn btn-secondary"
        >
          View Employees
        </button>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
}
