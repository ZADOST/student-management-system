import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { t } = useSettings();

  const studentProfile = {
    name: user?.name || "Demo User",
    id: "20260145",
    department: "Computer Education",
    gpa: "3.65",
    credits: 84,
    attendance: "94%"
  };

  const currentCourses = [
    { id: 1, title: "Project-Based Learning", code: "CE302", professor: "Dr. Ahmed", time: "Mon/Wed 10:00 AM" },
    { id: 2, title: "Web Application Development", code: "CE315", professor: "Mr. Karwan", time: "Tue/Thu 01:00 PM" }
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>{t('welcome')}, {studentProfile.name}</h1>
        <p>{t('studentId')}: <span style={{ direction: 'ltr', display: 'inline-block' }}>{studentProfile.id}</span> | {t('department')}: {studentProfile.department}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-title">{t('cumGpa')}</span>
          <p className="stat-value">{studentProfile.gpa}</p>
        </div>
        <div className="stat-card">
          <span className="stat-title">{t('creditsEarned')}</span>
          <p className="stat-value">{studentProfile.credits}</p>
        </div>
        <div className="stat-card">
          <span className="stat-title">{t('overallAttendance')}</span>
          <p className="stat-value" style={{ direction: 'ltr' }}>{studentProfile.attendance}</p>
        </div>
      </div>

      <div className="courses-section">
        <h2>{t('currentCourses')}</h2>
        <div className="courses-grid">
          {currentCourses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <span className="course-code" style={{ direction: 'ltr', display: 'inline-block' }}>{course.code}</span>
              <div className="course-details">
                <span>👨‍🏫 {course.professor}</span>
                <span style={{ direction: 'ltr' }}>⏱️ {course.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;