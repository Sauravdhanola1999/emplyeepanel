import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [f_userName, setUsername] = useState("");
  const [f_Pwd, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!f_userName || !f_Pwd) {
      alert("Username and Password are required");
      return;
    }
    try {
      const res = await axios.post(
        "https://emplyeepanel.vercel.app/api/auth/login",
        { username: f_userName, password: f_Pwd },
        { withCredentials: true }
      );
      localStorage.setItem("username", res.data.username || f_userName);
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); // shows "Invalid login details"
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={f_userName}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={f_Pwd}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
