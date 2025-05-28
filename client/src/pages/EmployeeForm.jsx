import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: [],
    f_Image: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/employees/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => alert("Employee not found"));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0].name }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCourseChange = (e) => {
    const { options } = e.target;
    const selected = Array.from(options)
      .filter((o) => o.selected)
      .map((o) => o.value);
    setForm((prev) => ({ ...prev, f_Course: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/employees/${id}`, form, {
          withCredentials: true,
        });
        alert("Employee updated");
      } else {
        await axios.post("http://localhost:3000/api/employees", form, {
          withCredentials: true,
        });
        alert("Employee created");
      }
      navigate("/employees");
    } catch {
      alert("Error saving employee");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {id ? "Edit Employee" : "Create Employee"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="f_Name"
          value={form.f_Name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          name="f_Email"
          value={form.f_Email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          name="f_Mobile"
          value={form.f_Mobile}
          onChange={handleChange}
          placeholder="Mobile"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <select
          name="f_Designation"
          value={form.f_Designation}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Select Designation</option>
          <option value="Manager">Manager</option>
          <option value="HR">HR</option>
          <option value="Developer">Developer</option>
        </select>

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="f_gender"
              value="Male"
              checked={form.f_gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="f_gender"
              value="Female"
              checked={form.f_gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <select
          multiple
          value={form.f_Course}
          onChange={handleCourseChange}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="MERN">MERN</option>
          <option value="MEAN">MEAN</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </select>

        <input
          type="file"
          name="f_Image"
          onChange={handleChange}
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
