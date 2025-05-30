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

  return (
    <div className="p-4 h-screen flex justify-center items-center">
      <h1 className="text-2xl font-bold">Welcome, {username} to Admin Panel</h1>
    </div>
  );
}
