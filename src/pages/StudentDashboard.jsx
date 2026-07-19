import React from 'react';
import { useAuth } from '../context/AuthContext';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();

  // MOCK DATA: Tomorrow, this will be replaced by an API call fetching your specific university data
  const studentProfile = {
    name: user?.name || "Student Name",
    id: "20260145",
    department: "Computer Education",
    gpa: "3.65",
    credits: 84,
    attendance: "94%"
  };

  const currentCourses = [
    { id: 1, title: "Project-Based Learning", code: "CE302", professor: "Dr. Ahmed", time: "Mon/Wed 10:00 AM" },
    { id: 2, title: "Web Application Development", code: "CE315", professor: "Mr. Karwan", time: "Tue/Thu 01:00 PM" },
    { id: 3, title: "Micro-teaching Practicum", code: "EDU401", professor: "Dr. Fatima", time: "Mon 02:30 PM" },
    { id: 4, title: "Database Management Systems", code: "CE208", professor: "Mr. Dler", time: "Wed/Thu 09:00 AM" }
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Welcome back, {studentProfile.name}</h1>
        <p>Student ID: {studentProfile.id} | Department: {studentProfile.department}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-title">Cumulative GPA</span>
          <p className="stat-value">{studentProfile.gpa}</p>
        </div>
        <div className="stat-card">
          <span className="stat-title">Credits Earned</span>
          <p className="stat-value">{studentProfile.credits}</p>
        </div>
        <div className="stat-card">
          <span className="stat-title">Overall Attendance</span>
          <p className="stat-value">{studentProfile.attendance}</p>
        </div>
      </div>

      <div className="courses-section">
        <h2>Current Semester Courses</h2>
        <div className="courses-grid">
          {currentCourses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <span className="course-code">{course.code}</span>
              <div className="course-details">
                <span>👨‍🏫 {course.professor}</span>
                <span>⏱️ {course.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;