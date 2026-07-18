import React, { useEffect, useState } from 'react';
import { DB } from '../services/db';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ students: 0, courses: 0, attendance: 0 });

  useEffect(() => {
    setStats({
      students: DB.getStudents().length,
      courses: DB.getCourses().length,
      attendance: DB.getAttendance().length,
    });
  }, []);

  return (
    <div>
      <h1>System Overview</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>Welcome to the ZAS Tech Student Management System Dashboard.</p>
      
      <div className="grid">
        <div className="card">
          <h3>Total Students</h3>
          <h1 style={{ fontSize: '3rem', color: 'var(--accent)' }}>{stats.students}</h1>
        </div>
        <div className="card">
          <h3>Active Courses</h3>
          <h1 style={{ fontSize: '3rem', color: 'var(--accent)' }}>{stats.courses}</h1>
        </div>
        <div className="card">
          <h3>Attendance Records</h3>
          <h1 style={{ fontSize: '3rem', color: 'var(--accent)' }}>{stats.attendance}</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;