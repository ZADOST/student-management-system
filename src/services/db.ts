import { Student, Course, AttendanceRecord } from '../types';

const STORAGE_KEYS = {
  STUDENTS: 'zas_students',
  COURSES: 'zas_courses',
  ATTENDANCE: 'zas_attendance',
  THEME: 'zas_theme'
};

export const DB = {
  // Students DB Logic
  getStudents: (): Student[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS) || '[]'),
  saveStudent: (student: Student) => {
    const students = DB.getStudents();
    students.push(student);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  },
  
  // Courses DB Logic
  getCourses: (): Course[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSES) || '[]'),
  saveCourse: (course: Course) => {
    const courses = DB.getCourses();
    courses.push(course);
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  },

  // Attendance DB Logic
  getAttendance: (): AttendanceRecord[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || '[]'),
  saveAttendance: (record: AttendanceRecord) => {
    const attendance = DB.getAttendance();
    attendance.push(record);
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  },

  // Theme Logic
  getTheme: (): string => localStorage.getItem(STORAGE_KEYS.THEME) || 'light',
  setTheme: (theme: string) => localStorage.setItem(STORAGE_KEYS.THEME, theme)
};