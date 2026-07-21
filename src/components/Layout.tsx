import { useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Menu, LogOut, Bell, Settings, BookOpen, Users, LayoutDashboard, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: ReactNode;
  role: 'student' | 'teacher' | 'principal';
}

export default function Layout({ children, role }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isRtl = document.documentElement.dir === 'rtl';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navItems = {
    student: [
      { path: '/student', icon: <LayoutDashboard />, label: t('sidebar.dashboard') },
      { path: '/student/courses', icon: <BookOpen />, label: t('sidebar.curriculum') },
      { path: '/student/attendance', icon: <Calendar />, label: t('sidebar.attendance') },
    ],
    teacher: [
      { path: '/teacher', icon: <LayoutDashboard />, label: t('sidebar.dashboard') },
      { path: '/teacher/classes', icon: <Users />, label: t('sidebar.my_classes') },
      { path: '/teacher/grades', icon: <BookOpen />, label: t('sidebar.grading') },
    ],
    principal: [
      { path: '/principal', icon: <LayoutDashboard />, label: t('sidebar.master_analytics') },
      { path: '/principal/users', icon: <Users />, label: t('sidebar.user_management') },
      { path: '/principal/payroll', icon: <Settings />, label: t('sidebar.payroll') },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="glass border-r border-slate-200 dark:border-slate-800 z-20 flex flex-col justify-between sticky top-0 h-screen overflow-hidden"
      >
        <div>
          <div className="h-20 flex items-center justify-center border-b border-slate-200 dark:border-slate-800">
            <h2 className={clsx("font-bold text-xl text-slate-800 dark:text-white transition-opacity duration-300 whitespace-nowrap", sidebarOpen ? "opacity-100" : "opacity-0 hidden")}>
              {t(`portal.${role}`)}
            </h2>
            {!sidebarOpen && <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">IMS</div>}
          </div>
          
          <nav className="p-4 space-y-2 mt-4">
            {navItems[role].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={clsx(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap",
                  location.pathname === item.path 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <div className="shrink-0">{item.icon}</div>
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
           <div className={clsx("flex mb-4 transition-all", sidebarOpen ? "justify-center gap-4" : "flex-col gap-3 items-center")}>
              <button onClick={() => changeLanguage('en')} className={clsx("text-xs font-bold hover:text-blue-600", i18n.language === 'en' ? "text-blue-600" : "text-slate-500")}>EN</button>
              <button onClick={() => changeLanguage('ku')} className={clsx("text-xs font-bold hover:text-blue-600", i18n.language === 'ku' ? "text-blue-600" : "text-slate-500")}>KU</button>
              <button onClick={() => changeLanguage('ar')} className={clsx("text-xs font-bold hover:text-blue-600", i18n.language === 'ar' ? "text-blue-600" : "text-slate-500")}>AR</button>
           </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="shrink-0" />
            {sidebarOpen && <span className="font-medium">{t('sidebar.logout')}</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden relative">
        {/* Decorative Background for Dashboards */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        {/* Topbar */}
        <header className="h-20 glass border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 flex items-center justify-between px-8">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            <Menu />
          </button>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Bell />
              <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className={clsx("flex items-center gap-3 border-slate-200 dark:border-slate-700", isRtl ? "pr-6 border-r" : "pl-6 border-l")}>
              <div className={clsx("hidden md:block", isRtl ? "text-left" : "text-right")}>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name || "Demo User"}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role || role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}