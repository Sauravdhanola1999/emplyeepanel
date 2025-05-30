import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) navigate("/");
    setUsername(user);
  }, [navigate]);

  const logout = () => {
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-employee">Create</Link>
        <Link to="/employees">Employees</Link>
      </div>
      <div className="flex space-x-3">
        <h2 className="text-2xl font-bold"> {username}</h2>
        <button onClick={logout} className="bg-red-600 px-4 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}
