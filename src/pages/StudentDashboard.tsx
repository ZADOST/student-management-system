import { useState } from 'react';
import { BookOpen, GraduationCap, Clock, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const performanceData = [
  { name: 'Sep', grade: 82, attendance: 95 },
  { name: 'Oct', grade: 85, attendance: 92 },
  { name: 'Nov', grade: 88, attendance: 98 },
  { name: 'Dec', grade: 87, attendance: 96 },
  { name: 'Jan', grade: 90, attendance: 99 },
];

export default function StudentDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { showToast } = useToast();

  return (
    <Layout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('dashboard.welcome', { name: user?.name || 'Student' })}</h1>
        <p className="text-slate-500 mt-2">{t('dashboard.summary')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: t('dashboard.overall_gpa'), value: '3.8', icon: <GraduationCap className="w-6 h-6 text-blue-500" />, trend: '+0.2', color: 'blue' },
          { label: t('dashboard.total_courses'), value: '5', icon: <BookOpen className="w-6 h-6 text-purple-500" />, trend: '0', color: 'purple' },
          { label: t('dashboard.attendance_rate'), value: '96%', icon: <CheckCircle className="w-6 h-6 text-green-500" />, trend: '+2%', color: 'green' },
          { label: t('dashboard.late_hours'), value: '2h', icon: <Clock className="w-6 h-6 text-orange-500" />, trend: '-1h', color: 'orange' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${stat.color}-500/10 rounded-full blur-2xl group-hover:bg-${stat.color}-500/20 transition-colors duration-500`} />
            <div className="flex justify-between items-start mb-4 relative">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                {stat.icon}
              </div>
              <span className={clsx(
                "px-2 py-1 rounded-lg text-xs font-bold",
                stat.trend.startsWith('+') ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" :
                stat.trend === '0' ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400" :
                "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
              )}>
                {stat.trend}
              </span>
            </div>
            <div className="relative">
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 glass p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('student.performance_trend')}</h2>
            <select className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300">
              <option>Fall 2026</option>
              <option>Spring 2026</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: '1px solid rgba(51, 65, 85, 0.5)', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="grade" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorGrade)" />
                <Area type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('student.current_curriculum')}</h2>
            <div className="space-y-4">
              {[
                { name: 'Computer Science 101', code: 'CS101', progress: 75, color: 'blue' },
                { name: 'Advanced Mathematics', code: 'MATH201', progress: 60, color: 'purple' },
                { name: 'Physics Mechanics', code: 'PHY101', progress: 85, color: 'green' },
              ].map((course, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{course.name}</p>
                      <p className="text-xs text-slate-500">{course.code}</p>
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`bg-${course.color}-500 h-2 rounded-full transition-all duration-1000 group-hover:opacity-80`} 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => showToast(t('toast.success'), 'Material opened!', 'info')}
              className="w-full mt-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl transition-colors"
            >
              {t('student.view_materials')}
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
}