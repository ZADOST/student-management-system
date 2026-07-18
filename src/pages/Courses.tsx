import React, { useState, useEffect } from 'react';
import { DB } from '../services/db';
import { Course } from '../types';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState({ title: '', code: '', credits: 3 });

  useEffect(() => {
    setCourses(DB.getCourses());
  }, []);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.code) return;

    const newCourse: Course = {
      id: crypto.randomUUID(),
      title: formData.title,
      code: formData.code.toUpperCase(),
      credits: Number(formData.credits)
    };

    DB.saveCourse(newCourse);
    setCourses(DB.getCourses());
    setFormData({ title: '', code: '', credits: 3 });
  };

  return (
    <div>
      <h1>Courses Management</h1>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Create New Course</h3>
        <form onSubmit={handleAddCourse}>
          <input 
            type="text" 
            placeholder="Course Title (e.g., React Fundamentals)" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Course Code (e.g., CS101)" 
            value={formData.code}
            onChange={(e) => setFormData({...formData, code: e.target.value})}
          />
          <select 
            value={formData.credits} 
            onChange={(e) => setFormData({...formData, credits: Number(e.target.value)})}
          >
            <option value={2}>2 Credits</option>
            <option value={3}>3 Credits</option>
            <option value={4}>4 Credits</option>
          </select>
          <button type="submit" className="btn">Add Course</button>
        </form>
      </div>

      <div className="grid" style={{ marginTop: '2rem' }}>
        {courses.length === 0 ? (
          <p>No courses available. Create one above.</p>
        ) : (
          courses.map(course => (
            <div key={course.id} className="card">
              <h4>{course.title}</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Code: {course.code}</p>
              <p style={{ color: 'var(--text-secondary)' }}>Credits: {course.credits}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;