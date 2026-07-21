import { useState } from 'react';
import { Search, Plus, Download, Edit2, Trash2 } from 'lucide-react';
import Layout from '../../components/Layout';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../context/ToastContext';

const mockUsers = [
  { id: 'USR-001', name: 'Admin User', role: 'Principal', dept: 'Administration', status: 'active', email: 'admin@ims.edu' },
  { id: 'USR-002', name: 'Dr. Alan Turing', role: 'Teacher', dept: 'Computer Science', status: 'active', email: 'alan@ims.edu' },
  { id: 'USR-003', name: 'John Doe', role: 'Student', dept: 'Computer Science', status: 'active', email: 'john@ims.edu' },
  { id: 'USR-004', name: 'Prof. Ernest', role: 'Teacher', dept: 'English', status: 'inactive', email: 'ernest@ims.edu' },
];

export default function UserManagement() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout role="principal">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('principal.users_title')}</h1>
          <p className="text-slate-500 mt-2">{t('principal.users_subtitle')}</p>
        </div>
        
        <div className="flex gap-4">
          <button onClick={() => showToast(t('toast.success'), 'Exported users to CSV', 'info')} className="px-4 py-2 glass rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> {t('principal.export')}
          </button>
          <button onClick={() => showToast(t('toast.success'), t('toast.user_added'), 'success')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2">
            <Plus className="w-4 h-4" /> {t('principal.add_new')}
          </button>
        </div>
      </div>

      <div className="glass rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder={t('principal.search_users')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 font-bold text-slate-900 dark:text-white">{t('principal.name')}</th>
                <th className="p-4 font-bold text-slate-900 dark:text-white">{t('principal.role')}</th>
                <th className="p-4 font-bold text-slate-900 dark:text-white">{t('principal.department')}</th>
                <th className="p-4 font-bold text-slate-900 dark:text-white">{t('principal.status')}</th>
                <th className="p-4 font-bold text-slate-900 dark:text-white text-right">{t('principal.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-slate-700 dark:text-slate-300 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">{user.role}</span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 text-sm">
                    {user.dept}
                  </td>
                  <td className="p-4">
                    <span className={clsx(
                      "px-2 py-1 rounded-full text-xs font-bold",
                      user.status === 'active' ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => showToast(t('toast.success'), 'Edit modal opened', 'info')} className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => showToast(t('toast.success'), t('toast.user_deleted'), 'error')} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
