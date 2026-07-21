import Layout from '../../components/Layout';
import { AlertTriangle, Calendar as CalendarIcon, Clock } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export default function StudentAttendance() {
  const { t } = useTranslation();

  const attendanceLog = [
    { date: 'Oct 15, 2026', course: 'CS101', status: 'present', notes: '-' },
    { date: 'Oct 14, 2026', course: 'MATH201', status: 'late', notes: '15 mins late' },
    { date: 'Oct 12, 2026', course: 'PHY101', status: 'absent', notes: 'Medical' },
    { date: 'Oct 10, 2026', course: 'ENG102', status: 'present', notes: '-' },
  ];

  return (
    <Layout role="student">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('student.attendance_title')}</h1>
          <p className="text-slate-500 mt-2">{t('student.attendance_subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl border border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-500/5">
            <h3 className="font-bold text-lg mb-2 text-orange-700 dark:text-orange-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {t('student.warning_title')}
            </h3>
            <p className="text-sm text-orange-600 dark:text-orange-300">
              {t('student.warning_desc')}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="p-4 font-bold text-slate-900 dark:text-white">{t('student.date')}</th>
                    <th className="p-4 font-bold text-slate-900 dark:text-white">{t('student.course')}</th>
                    <th className="p-4 font-bold text-slate-900 dark:text-white">{t('student.status')}</th>
                    <th className="p-4 font-bold text-slate-900 dark:text-white">{t('student.notes')}</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceLog.map((log, i) => (
                    <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-slate-400" />
                        {log.date}
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{log.course}</span>
                      </td>
                      <td className="p-4">
                        <span className={clsx(
                          "px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1",
                          log.status === 'present' ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" :
                          log.status === 'late' ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400" :
                          "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                        )}>
                          {log.status === 'present' ? t('student.present') : log.status === 'late' ? t('student.late') : t('student.absent')}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 text-sm">{log.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
