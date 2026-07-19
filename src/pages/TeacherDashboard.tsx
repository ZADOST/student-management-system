import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

interface RosterStudent {
  id: string;
  name: string;
  attendance: string;
  grade: string;
}

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { t } = useSettings();
  const [activeCourse, setActiveCourse] = useState<string>("CE302");

  const [roster, setRoster] = useState<RosterStudent[]>([
    { id: "202601", name: "Akar Shwan", attendance: "present", grade: "92" },
    { id: "202602", name: "Zina Mohammed", attendance: "present", grade: "88" },
    { id: "202603", name: "Alaa Abdullah", attendance: "late", grade: "75" },
    { id: "202604", name: "Mohammed Ali", attendance: "absent", grade: "60" }
  ]);

  const handleGradeChange = (id: string, newGrade: string) => {
    setRoster(roster.map(student => student.id === id ? { ...student, grade: newGrade } : student));
  };

  const handleAttendanceChange = (id: string, newStatus: string) => {
    setRoster(roster.map(student => student.id === id ? { ...student, attendance: newStatus } : student));
  };

  const saveChanges = (studentName: string) => {
    alert(`Saved for ${studentName}.`);
  };

  return (
    <div className="faculty-wrapper">
      <div className="faculty-header">
        <div>
          <h1>{t('facultyPortal')}</h1>
          <p>{t('loggedInAs')}: {user?.name}</p>
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
              <th>{t('studentId')}</th>
              <th>{t('fullName')}</th>
              <th>{t('todayAttendance')}</th>
              <th>{t('currentGrade')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((student) => (
              <tr key={student.id}>
                <td className="student-id">{t(student.id)}</td>
                <td className="student-name">{student.name}</td>
                <td>
                  <select 
                    className={`attendance-select status-${student.attendance}`}
                    value={student.attendance}
                    onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                  >
                    <option value="present">{t('present')}</option>
                    <option value="late">{t('late')}</option>
                    <option value="absent">{t('absent')}</option>
                  </select>
                </td>
                <td>
                  <input 
                    type="number" 
                    className="grade-input" 
                    value={student.grade}
                    onChange={(e) => handleGradeChange(student.id, e.target.value)}
                    max="100" min="0"
                  />
                </td>
                <td>
                  <button className="save-btn" onClick={() => saveChanges(student.name)}>
                    {t('update')}
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