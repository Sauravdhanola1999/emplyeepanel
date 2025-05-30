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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const storedEmployee = localStorage.getItem("newEmployee");
      if (storedEmployee) {
        setForm(JSON.parse(storedEmployee));
      } else {
        axios
          .get(`https://emplyeepanel.vercel.app/api/employees/${id}`)
          .then((res) => setForm(res.data))
          .catch(() => alert("Employee not found"));
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
          setErrors((prev) => ({
            ...prev,
            f_Image: "Only JPG or PNG files are allowed",
          }));
          return;
        } else {
          setErrors((prev) => ({ ...prev, f_Image: "" }));
        }
        setForm((prev) => ({ ...prev, [name]: file.name }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCourseChange = (e) => {
    const { options } = e.target;
    const selected = Array.from(options)
      .filter((o) => o.selected)
      .map((o) => o.value);
    setForm((prev) => ({ ...prev, f_Course: selected }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.f_Name.trim()) newErrors.f_Name = "Name is required";

    if (!form.f_Email.trim()) {
      newErrors.f_Email = "Email is required";
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.f_Email)) {
      newErrors.f_Email = "Invalid email format";
    } else {
      const stored = JSON.parse(localStorage.getItem("employees") || "[]");
      const duplicate = stored.some(
        (emp) =>
          emp.f_Email === form.f_Email && (!id || emp.f_Id !== parseInt(id))
      );
      if (duplicate) newErrors.f_Email = "Email already exists";
    }

    if (!form.f_Mobile.trim()) {
      newErrors.f_Mobile = "Mobile is required";
    } else if (!/^\d+$/.test(form.f_Mobile)) {
      newErrors.f_Mobile = "Mobile must be numeric";
    }

    if (!form.f_Designation) newErrors.f_Designation = "Select a designation";
    if (!form.f_gender) newErrors.f_gender = "Select gender";
    if (!form.f_Course.length) newErrors.f_Course = "Select at least one course";
    if (!form.f_Image) newErrors.f_Image = "Upload a valid JPG/PNG image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (id) {
        await axios.put(`https://emplyeepanel.vercel.app/api/employees/${id}`, form, {
          withCredentials: true,
        });
        alert("Employee updated");

        const stored = localStorage.getItem("employees");
        let employees = stored ? JSON.parse(stored) : [];

        employees = employees.map((emp) =>
          emp.f_Id === parseInt(id) ? { ...emp, ...form } : emp
        );

        localStorage.setItem("employees", JSON.stringify(employees));
      } else {
        await axios.post("https://emplyeepanel.vercel.app/api/employees", form, {
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
        <div>
          <input
            name="f_Name"
            value={form.f_Name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.f_Name && <p className="text-red-500 text-sm">{errors.f_Name}</p>}
        </div>

        <div>
          <input
            name="f_Email"
            value={form.f_Email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.f_Email && <p className="text-red-500 text-sm">{errors.f_Email}</p>}
        </div>

        <div>
          <input
            name="f_Mobile"
            value={form.f_Mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.f_Mobile && (
            <p className="text-red-500 text-sm">{errors.f_Mobile}</p>
          )}
        </div>

        <div>
          <select
            name="f_Designation"
            value={form.f_Designation}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select Designation</option>
            <option value="Manager">Manager</option>
            <option value="HR">HR</option>
            <option value="Developer">Developer</option>
          </select>
          {errors.f_Designation && (
            <p className="text-red-500 text-sm">{errors.f_Designation}</p>
          )}
        </div>

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
        {errors.f_gender && (
          <p className="text-red-500 text-sm">{errors.f_gender}</p>
        )}

        <div>
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
          {errors.f_Course && (
            <p className="text-red-500 text-sm">{errors.f_Course}</p>
          )}
        </div>

        <div>
          <input
            type="file"
            name="f_Image"
            onChange={handleChange}
            className="w-full"
          />
          {errors.f_Image && (
            <p className="text-red-500 text-sm">{errors.f_Image}</p>
          )}
        </div>

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
