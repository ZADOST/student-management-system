import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import StudentCourses from './pages/student/Courses';
import StudentAttendance from './pages/student/Attendance';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherClasses from './pages/teacher/Classes';
import TeacherGrading from './pages/teacher/Grading';
import PrincipalDashboard from './pages/PrincipalDashboard';
import PrincipalUsers from './pages/principal/Users';
import PrincipalPayroll from './pages/principal/Payroll';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Ensure body has the correct dark/light classes if we implement theme toggling later
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/classes" element={<TeacherClasses />} />
        <Route path="/teacher/grades" element={<TeacherGrading />} />
        <Route path="/principal" element={<PrincipalDashboard />} />
        <Route path="/principal/users" element={<PrincipalUsers />} />
        <Route path="/principal/payroll" element={<PrincipalPayroll />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}