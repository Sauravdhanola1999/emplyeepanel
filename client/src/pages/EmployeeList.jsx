import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/api/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load employees');
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await axios.delete(`/api/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      alert('Failed to delete employee');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (employees.length === 0) {
    return (
      <div className="p-4">
        <h2>No employees found</h2>
        <button onClick={() => navigate('/create-employee')} className="btn btn-primary">Create Employee</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
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
          {employees.map(emp => (
            <tr key={emp._id} className="border-t">
              <td>{emp.f_Name}</td>
              <td>{emp.f_Email}</td>
              <td>{emp.f_Mobile}</td>
              <td>{emp.f_Designation}</td>
              <td>{emp.f_gender}</td>
              <td>{emp.f_Course.join(', ')}</td>
              <td>
                <button onClick={() => navigate(`/edit-employee/${emp._id}`)} className="btn btn-sm btn-info mr-2">Edit</button>
                <button onClick={() => deleteEmployee(emp._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
