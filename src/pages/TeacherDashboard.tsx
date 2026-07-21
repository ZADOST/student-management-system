import { useState } from 'react';
import { Users, FileText, CheckCircle, Search, Filter, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import AnnouncementModal from '../components/AnnouncementModal';
import UploadMaterialModal from '../components/UploadMaterialModal';

const mockStudents = [
  { id: 'STU-1001', name: 'Ahmad Mohammed', grade: 92, attendance: 95, avatar: 'A', status: 'excellent' },
  { id: 'STU-1002', name: 'Sarah Ahmed', grade: 88, attendance: 90, avatar: 'S', status: 'good' },
  { id: 'STU-1003', name: 'Omar Ali', grade: 75, attendance: 82, avatar: 'O', status: 'warning' },
  { id: 'STU-1004', name: 'Zainab Hassan', grade: 98, attendance: 100, avatar: 'Z', status: 'excellent' },
  { id: 'STU-1005', name: 'Ali Kareem', grade: 65, attendance: 70, avatar: 'A', status: 'critical' },
];

export default function TeacherDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout role="teacher">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('dashboard.welcome', { name: user?.name || 'Instructor' })}</h1>
          <p className="text-slate-500 mt-2">{t('dashboard.teacher_summary')}</p>
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Content Area (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder={t('teacher.search_placeholder')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>
            <button className="p-2 ml-4 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Filter className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-xl font-bold text-white shadow-md">
                  {student.avatar}
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{student.name}</h3>
                  <p className="text-sm font-mono text-slate-500">{student.id}</p>
                </div>

                <div className="flex gap-8 text-center">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">{t('teacher.attendance')}</p>
                    <p className={clsx("font-bold text-xl", student.attendance >= 90 ? "text-green-500" : student.attendance >= 80 ? "text-orange-500" : "text-red-500")}>
                      {student.attendance}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">{t('teacher.overall_grade')}</p>
                    <p className="font-bold text-xl text-slate-900 dark:text-white">{student.grade}%</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => showToast(t('toast.success'), 'Grading modal opened (Mock)', 'info')} className="px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
                    {t('teacher.grade_btn')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Tools (1 col) */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              {t('teacher.quick_actions')}
            </h3>
            <div className="space-y-3">
              <button onClick={() => showToast(t('toast.success'), t('toast.attendance_saved'), 'success')} className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" /> {t('teacher.take_attendance')}
              </button>
              <button onClick={() => setIsMaterialOpen(true)} className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                {t('teacher.upload_material')}
              </button>
              <button onClick={() => setIsAnnouncementOpen(true)} className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                {t('teacher.new_announcement')}
              </button>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-500/5">
            <h3 className="font-bold text-lg mb-2 text-orange-700 dark:text-orange-400 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {t('teacher.profile_alerts')}
            </h3>
            <p className="text-sm text-orange-600 dark:text-orange-300 mb-4">{t('teacher.latency_warning')}</p>
            <button onClick={() => showToast('Redirecting', 'Navigating to payroll details...', 'info')} className="text-sm font-bold text-orange-700 dark:text-orange-400 hover:underline">{t('teacher.view_payroll')} &rarr;</button>
          </div>
        </div>
        
      </div>

      <AnnouncementModal 
        isOpen={isAnnouncementOpen} 
        onClose={() => setIsAnnouncementOpen(false)} 
      />
      <UploadMaterialModal 
        isOpen={isMaterialOpen} 
        onClose={() => setIsMaterialOpen(false)} 
      />
    </Layout>
  );
}