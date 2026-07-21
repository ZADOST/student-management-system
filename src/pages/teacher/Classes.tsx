import { useState } from 'react';
import { Users, Search, Filter } from 'lucide-react';
import Layout from '../../components/Layout';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const mockStudents = [
  { id: 'STU-1001', name: 'Ahmad Mohammed', grade: 92, attendance: 95, avatar: 'A', status: 'excellent' },
  { id: 'STU-1002', name: 'Sarah Ahmed', grade: 88, attendance: 90, avatar: 'S', status: 'good' },
  { id: 'STU-1003', name: 'Omar Ali', grade: 75, attendance: 82, avatar: 'O', status: 'warning' },
  { id: 'STU-1004', name: 'Zainab Hassan', grade: 98, attendance: 100, avatar: 'Z', status: 'excellent' },
  { id: 'STU-1005', name: 'Ali Kareem', grade: 65, attendance: 70, avatar: 'A', status: 'critical' },
];

export default function TeacherClasses() {
  const { t } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout role="teacher">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('teacher.classes_title')}</h1>
          <p className="text-slate-500 mt-2">{t('teacher.classes_subtitle')}</p>
        </div>
        
        <div className="flex gap-4">
          <select 
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 glass rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="CS101">{t('teacher.course_cs101')}</option>
            <option value="CS201">{t('teacher.course_cs201')}</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search students by name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>
          <button className="p-2 ml-4 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Filter className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4 hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white shadow-md">
                {student.avatar}
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{student.name}</h3>
                <p className="text-sm font-mono text-slate-500">{student.id}</p>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 mt-2">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Attendance</p>
                  <p className={clsx("font-bold text-lg", student.attendance >= 90 ? "text-green-500" : student.attendance >= 80 ? "text-orange-500" : "text-red-500")}>
                    {student.attendance}%
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Grade</p>
                  <p className="font-bold text-lg text-slate-900 dark:text-white">{student.grade}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
