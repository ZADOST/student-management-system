import React, { useState, useEffect } from 'react';
import { DB } from '../services/db';
import { Student, Course, AttendanceRecord } from '../types';

const Attendance: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  
  const [formData, setFormData] = useState({ studentId: '', courseId: '', status: 'Present' as 'Present' | 'Absent' | 'Late' });

  useEffect(() => {
    setStudents(DB.getStudents());
    setCourses(DB.getCourses());
    setRecords(DB.getAttendance());
  }, []);

  const handleMarkAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.courseId) return alert('Select student and course');

    const newRecord: AttendanceRecord = {
      id: crypto.randomUUID(),
      studentId: formData.studentId,
      courseId: formData.courseId,
      date: new Date().toISOString().split('T')[0],
      status: formData.status
    };

    DB.saveAttendance(newRecord);
    setRecords(DB.getAttendance());
  };

  const getStudentName = (id: string) => students.find(s => s.id === id)?.name || 'Unknown Student';
  const getCourseName = (id: string) => courses.find(c => c.id === id)?.title || 'Unknown Course';

  return (
    <div>
      <h1>Attendance Tracking</h1>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Mark Attendance</h3>
        <form onSubmit={handleMarkAttendance}>
          <select 
            value={formData.studentId} 
            onChange={(e) => setFormData({...formData, studentId: e.target.value})}
          >
            <option value="">Select Student...</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select 
            value={formData.courseId} 
            onChange={(e) => setFormData({...formData, courseId: e.target.value})}
          >
            <option value="">Select Course...</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.title} ({c.code})</option>)}
          </select>

          <select 
            value={formData.status} 
            onChange={(e) => setFormData({...formData, status: e.target.value as any})}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>

          <button type="submit" className="btn">Record Attendance</button>
        </form>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Recent Records</h3>
        <div className="grid">
          {records.length === 0 ? (
            <p>No attendance records found.</p>
          ) : (
            records.slice().reverse().map(record => (
              <div key={record.id} className="card">
                <h4>{getStudentName(record.studentId)}</h4>
                <p style={{ color: 'var(--text-secondary)' }}>{getCourseName(record.courseId)}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.8rem' }}>{record.date}</span>
                  <span className={`badge ${record.status.toLowerCase()}`}>{record.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;