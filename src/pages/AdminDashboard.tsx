import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const { t } = useSettings();

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

  const handleDeleteUser = (userId: number, userName: string) => {
    if (window.confirm(`Are you sure you want to permanently delete ${userName}'s account?`)) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

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
          <h1>{t('systemAdmin')}</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>{t('welcome')}, {user?.name}</p>
        </div>
        <div className="system-status">
          <div className="status-dot"></div>
          {t('dbSync')}
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-title">{t('totalStudents')}</div>
          <div className="admin-stat-value">{stats.totalStudents}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">{t('activeFaculty')}</div>
          <div className="admin-stat-value">{stats.activeFaculty}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">{t('registeredDepts')}</div>
          <div className="admin-stat-value">{stats.departments}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">{t('serverUptime')}</div>
          <div className="admin-stat-value" style={{ direction: 'ltr' }}>{stats.serverUptime}</div>
        </div>
      </div>

      <div className="management-section">
        <div className="admin-card">
          <h2>{t('userDirectory')}</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="user-table">
              <thead>
                <tr>
                  <th>{t('fullName')}</th>
                  <th>{t('emailAddr')}</th>
                  <th>{t('department')}</th>
                  <th>{t('systemRole')}</th>
                  <th>{t('adminActions')}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600 }}>{u.name}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', direction: 'ltr', textAlign: 'start' }}>{u.email}</td>
                    <td>{u.department}</td>
                    <td>
                      <span className={`role-badge role-${u.role}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn" onClick={() => handleChangeRole(u.id, u.role)}>
                        {t('changeRole')}
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteUser(u.id, u.name)}>
                        {t('delete')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <h2>{t('auditLog')}</h2>
          <ul className="audit-log">
            <li className="audit-item">
              <span className="audit-time">10:45 AM</span>
              <p className="audit-message">Automated MoHE attendance roster sync completed successfully.</p>
            </li>
            <li className="audit-item">
              <span className="audit-time">09:12 AM</span>
              <p className="audit-message">System Administrator elevated user ID #452 to Faculty status.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;