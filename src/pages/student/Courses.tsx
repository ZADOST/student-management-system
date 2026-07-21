import Layout from '../../components/Layout';
import { BookOpen, Clock, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../context/ToastContext';

export default function StudentCourses() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const courses = [
    { code: 'CS101', name: 'Introduction to Computer Science', credits: 4, instructor: 'Dr. Alan Turing', status: 'enrolled', color: 'blue' },
    { code: 'MATH201', name: 'Advanced Calculus', credits: 3, instructor: 'Dr. John Nash', status: 'enrolled', color: 'purple' },
    { code: 'PHY101', name: 'Physics Mechanics', credits: 4, instructor: 'Dr. Marie Curie', status: 'enrolled', color: 'green' },
    { code: 'ENG102', name: 'Technical Writing', credits: 2, instructor: 'Prof. Ernest', status: 'completed', color: 'slate' },
  ];

  return (
    <Layout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('student.courses_title')}</h1>
        <p className="text-slate-500 mt-2">{t('student.courses_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.code} className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute -right-6 -top-6 w-32 h-32 bg-${course.color}-500/10 rounded-full blur-3xl group-hover:bg-${course.color}-500/20 transition-colors duration-500`} />
            
            <div className="flex justify-between items-start mb-4 relative">
              <div className={`p-3 rounded-2xl bg-${course.color}-100 dark:bg-${course.color}-500/20 text-${course.color}-600 dark:text-${course.color}-400`}>
                <BookOpen className="w-6 h-6" />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                course.status === 'enrolled' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' 
                  : 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
              }`}>
                {course.status === 'enrolled' ? t('student.enrolled') : t('student.completed')}
              </span>
            </div>

            <div className="relative">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{course.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 font-mono mb-4">
                <span>{course.code}</span>
                <span>•</span>
                <span>{course.credits} {t('student.credits')}</span>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <AlertCircle className="w-4 h-4 text-slate-400" />
                  <span>{t('student.instructor')}: {course.instructor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Mon, Wed, Fri 10:00 AM</span>
                </div>
              </div>

              <button 
                onClick={() => showToast(t('toast.success'), 'Material downloaded!', 'info')}
                className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl transition-colors"
              >
                {t('student.view_materials')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
