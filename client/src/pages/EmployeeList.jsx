import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load employees");
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    try {
      await axios.delete(`http://localhost:3000/api/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (employees.length === 0) {
    return (
      <div className="p-4">
        <h2>No employees found</h2>
        <button
          onClick={() => navigate("/create-employee")}
          className="btn btn-primary"
        >
          Create Employee
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th> {/* ✅ Add ID column */}
            <th>Image</th> {/* ✅ Add Image column */}
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Courses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.f_Id} className="border-t">
              <td>{emp.f_Id}</td> {/* ✅ Show employee ID */}
              <td>
                {emp.f_Image ? (
                  <img
                    src={`uploads/${emp.f_Image}`} // Or update based on your server setup
                    alt={emp.f_Name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                ) : (
                  <span className="text-gray-400 italic">No image</span>
                )}
              </td>
              <td>{emp.f_Name}</td>
              <td>{emp.f_Email}</td>
              <td>{emp.f_Mobile}</td>
              <td>{emp.f_Designation}</td>
              <td>{emp.f_gender}</td>
              <td>{emp.f_Course.join(", ")}</td>
              <td>
                <button
                  onClick={() => navigate(`/edit-employee/${emp.f_Id}`)}
                  className="btn btn-sm btn-info mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployee(emp.f_Id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
