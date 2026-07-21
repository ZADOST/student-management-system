import { useState } from 'react';
import { BookOpen, Check, Edit2 } from 'lucide-react';
import Layout from '../../components/Layout';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../context/ToastContext';

const mockAssignments = [
  { id: 'A1', title: 'Midterm Project', due: 'Oct 15, 2026', total: 100 },
  { id: 'A2', title: 'Data Structures Quiz', due: 'Oct 22, 2026', total: 50 },
];

const mockStudents = [
  { id: 'STU-1001', name: 'Ahmad Mohammed', a1: 95, a2: 48 },
  { id: 'STU-1002', name: 'Sarah Ahmed', a1: 88, a2: 45 },
  { id: 'STU-1003', name: 'Omar Ali', a1: 72, a2: 38 },
];

export default function TeacherGrading() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState('CS101');

  return (
    <Layout role="teacher">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('teacher.grading_title')}</h1>
          <p className="text-slate-500 mt-2">{t('teacher.grading_subtitle')}</p>
        </div>
        
        <div className="flex gap-4">
          <select 
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 glass rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="CS101">CS101 - Intro to Computer Science</option>
            <option value="CS201">CS201 - Data Structures</option>
          </select>
          <button 
            onClick={() => showToast(t('toast.success'), t('toast.grades_published'), 'success')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30"
          >
            {t('teacher.publish_btn')}
          </button>
        </div>
      </div>

      <div className="glass rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 font-bold text-slate-900 dark:text-white w-1/3">{t('teacher.student')}</th>
                {mockAssignments.map(a => (
                  <th key={a.id} className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                    <div className="flex flex-col">
                      <span>{a.title}</span>
                      <span className="text-xs text-slate-500 font-normal">{t('teacher.out_of')} {a.total}</span>
                    </div>
                  </th>
                ))}
                <th className="p-4 font-bold text-slate-900 dark:text-white text-right">{t('teacher.total_avg')}</th>
              </tr>
            </thead>
            <tbody>
              {mockStudents.map((student, i) => {
                const avg = ((student.a1 + (student.a2 * 2)) / 2).toFixed(1);
                return (
                  <tr key={student.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-slate-900 dark:text-white">{student.name}</p>
                      <p className="text-xs font-mono text-slate-500">{student.id}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <input type="number" defaultValue={student.a1} className="w-20 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <input type="number" defaultValue={student.a2} className="w-20 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span className={clsx("font-bold text-lg", Number(avg) >= 90 ? "text-green-500" : Number(avg) >= 80 ? "text-blue-500" : "text-orange-500")}>
                        {avg}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
