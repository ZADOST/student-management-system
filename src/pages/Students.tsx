import React, { useState, useEffect } from 'react';
import { DB } from '../services/db';
import { Student } from '../types';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    setStudents(DB.getStudents());
  }, []);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newStudent: Student = {
      id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      enrollmentDate: new Date().toISOString().split('T')[0],
    };

    DB.saveStudent(newStudent);
    setStudents(DB.getStudents());
    setFormData({ name: '', email: '' });
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Students Management</h1>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Add New Student</h3>
        <form onSubmit={handleAddStudent}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <button type="submit" className="btn">Add Student</button>
        </form>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Student Directory</h3>
        <input 
          type="text" 
          placeholder="🔍 Search students by name or email..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className="grid">
          {filteredStudents.length === 0 ? (
            <p>No students found.</p>
          ) : (
            filteredStudents.map(student => (
              <div key={student.id} className="card">
                <h4>{student.name}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{student.email}</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Enrolled: {student.enrollmentDate}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;