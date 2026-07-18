export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  credits: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}