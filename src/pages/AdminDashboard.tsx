import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = {
    totalStudents: 1245,
    activeFaculty: 84,
    departments: 12,
    serverUptime: "99.9%"
  };

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Abdulrahman Jakhsi", email: "a.jakhsi@tiu.edu.iq", role: "teacher", department: "Computer Education" },
    { id: 2, name: "Akar Shwan", email: "akar.shwan@std.tiu.edu.iq", role: "student", department: "Computer Education" },
    { id: 3, name: "Zina Mohammed", email: "zina.m@std.tiu.edu.iq", role: "student", department: "Computer Education" },
    { id: 4, name: "System Administrator", email: "admin@tiu.edu.iq", role: "admin", department: "IT Support" }
  ]);

  // Types added to parameters: userId is a number, userName is a string
  const handleDeleteUser = (userId: number, userName: string) => {
    if (window.confirm(`Are you sure you want to permanently delete ${userName}'s account? This action cannot be undone.`)) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  // Types added to parameters: userId is a number, currentRole is a string
  const handleChangeRole = (userId: number, currentRole: string) => {
    const roles = ["student", "teacher", "admin"];
    const currentIndex = roles.indexOf(currentRole);
    const nextRole = roles[(currentIndex + 1) % roles.length];
    
    setUsers(users.map(u => u.id === userId ? { ...u, role: nextRole } : u));
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-header">
        <div>
          <h1>System Administration</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>Welcome, {user?.name}</p>
        </div>
        <div className="system-status">
          <div className="status-dot"></div>
          Database Sync Active
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Enrolled Students</div>
          <div className="admin-stat-value">{stats.totalStudents}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">Active Faculty Members</div>
          <div className="admin-stat-value">{stats.activeFaculty}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">Registered Departments</div>
          <div className="admin-stat-value">{stats.departments}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">Server Uptime</div>
          <div className="admin-stat-value">{stats.serverUptime}</div>
        </div>
      </div>

      <div className="management-section">
        <div className="admin-card">
          <h2>User Management Directory</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Department</th>
                  <th>System Role</th>
                  <th>Administrative Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600 }}>{u.name}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{u.email}</td>
                    <td>{u.department}</td>
                    <td>
                      <span className={`role-badge role-${u.role}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn" onClick={() => handleChangeRole(u.id, u.role)}>
                        Change Role
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteUser(u.id, u.name)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <h2>Security Audit Log</h2>
          <ul className="audit-log">
            <li className="audit-item">
              <span className="audit-time">Today, 10:45 AM</span>
              <p className="audit-message">Automated MoHE attendance roster sync completed successfully.</p>
            </li>
            <li className="audit-item">
              <span className="audit-time">Today, 09:12 AM</span>
              <p className="audit-message">System Administrator elevated user ID #452 to Faculty status.</p>
            </li>
            <li className="audit-item">
              <span className="audit-time">Yesterday, 11:30 PM</span>
              <p className="audit-message">Nightly MySQL database backup executed without errors.</p>
            </li>
            <li className="audit-item">
              <span className="audit-time">Yesterday, 02:15 PM</span>
              <p className="audit-message">Multiple failed login attempts detected for IP address 192.168.1.104.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;