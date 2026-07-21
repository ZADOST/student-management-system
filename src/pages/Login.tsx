import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Mail, Lock, LogIn, CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const isRtl = document.documentElement.dir === 'rtl';

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const role = await login(email, password);
      
      if (role === 'student') {
        navigate('/student');
      } else if (role === 'teacher') {
        navigate('/teacher');
      } else if (role === 'principal') {
        navigate('/principal');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center relative overflow-hidden transition-colors duration-500">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-50 flex gap-2">
        <button onClick={() => changeLanguage('en')} className={clsx("px-3 py-1 rounded-full text-sm font-medium transition-all", i18n.language === 'en' ? "bg-white dark:bg-slate-800 shadow-md text-blue-600 dark:text-blue-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200")}>EN</button>
        <button onClick={() => changeLanguage('ku')} className={clsx("px-3 py-1 rounded-full text-sm font-medium transition-all", i18n.language === 'ku' ? "bg-white dark:bg-slate-800 shadow-md text-blue-600 dark:text-blue-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200")}>KU</button>
        <button onClick={() => changeLanguage('ar')} className={clsx("px-3 py-1 rounded-full text-sm font-medium transition-all", i18n.language === 'ar' ? "bg-white dark:bg-slate-800 shadow-md text-blue-600 dark:text-blue-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200")}>AR</button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-8 glass rounded-3xl z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
            <Building2 className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t('login.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t('login.subtitle')}</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl flex items-center gap-2 mb-6 text-sm"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('login.id_placeholder')}</label>
            <div className="relative flex items-center">
              <Mail className={clsx("absolute w-5 h-5 text-slate-400", isRtl ? "right-3" : "left-3")} />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={clsx(
                  "w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-900 dark:text-white",
                  isRtl ? "pr-10 pl-4" : "pl-10 pr-4"
                )}
                placeholder="student@institution.edu.iq"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('login.password')}</label>
            <div className="relative flex items-center">
              <Lock className={clsx("absolute w-5 h-5 text-slate-400", isRtl ? "right-3" : "left-3")} />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={clsx(
                  "w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-900 dark:text-white",
                  isRtl ? "pr-10 pl-4" : "pl-10 pr-4"
                )}
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-end pt-1">
              <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                {t('login.forgot')}
              </a>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-6 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>{t('login.submit')}</span>
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          <p>Demo accounts: student@, teacher@, principal@ (password: any)</p>
        </div>
      </motion.div>
    </div>
  );
}