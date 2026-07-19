import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './TeacherDashboard.css';

// Define the blueprint for a student row
interface RosterStudent {
  id: string;
  name: string;
  attendance: string;
  grade: string;
}

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [activeCourse, setActiveCourse] = useState<string>("CE302");

  // Apply the interface to the state array
  const [roster, setRoster] = useState<RosterStudent[]>([
    { id: "202601", name: "Akar Shwan", attendance: "Present", grade: "92" },
    { id: "202602", name: "Zina Mohammed", attendance: "Present", grade: "88" },
    { id: "202603", name: "Alaa Abdullah", attendance: "Late", grade: "75" },
    { id: "202604", name: "Mohammed Ali", attendance: "Absent", grade: "60" }
  ]);

  // Types added to parameters: id is a string, newGrade is a string
  const handleGradeChange = (id: string, newGrade: string) => {
    setRoster(roster.map(student => 
      student.id === id ? { ...student, grade: newGrade } : student
    ));
  };

  // Types added to parameters
  const handleAttendanceChange = (id: string, newStatus: string) => {
    setRoster(roster.map(student => 
      student.id === id ? { ...student, attendance: newStatus } : student
    ));
  };

  // Types added to parameter
  const saveChanges = (studentName: string) => {
    alert(`Changes securely saved to the database for ${studentName}.`);
  };

  return (
    <div className="faculty-wrapper">
      <div className="faculty-header">
        <div>
          <h1>Faculty Portal</h1>
          <p>Logged in as: {user?.name || "Professor"}</p>
        </div>
        
        <select 
          className="course-selector"
          value={activeCourse}
          onChange={(e) => setActiveCourse(e.target.value)}
        >
          <option value="CE302">CE302 - Project-Based Learning</option>
          <option value="CE315">CE315 - Web App Development</option>
          <option value="EDU401">EDU401 - Micro-teaching</option>
        </select>
      </div>

      <div className="roster-card">
        <table className="roster-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Today's Attendance</th>
              <th>Current Grade (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((student) => (
              <tr key={student.id}>
                <td className="student-id">{student.id}</td>
                <td className="student-name">{student.name}</td>
                <td>
                  <select 
                    className={`attendance-select status-${student.attendance.toLowerCase()}`}
                    value={student.attendance}
                    onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                  >
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
                <td>
                  <input 
                    type="number" 
                    className="grade-input" 
                    value={student.grade}
                    onChange={(e) => handleGradeChange(student.id, e.target.value)}
                    max="100"
                    min="0"
                  />
                </td>
                <td>
                  <button className="save-btn" onClick={() => saveChanges(student.name)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;