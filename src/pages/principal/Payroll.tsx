import { useState } from 'react';
import { Download, CheckCircle, Search } from 'lucide-react';
import Layout from '../../components/Layout';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../context/ToastContext';

const mockPayroll = [
  { id: 'PAY-001', name: 'Dr. Alan Turing', role: 'Teacher', amount: '$4,500', status: 'pending', date: 'Oct 28, 2026' },
  { id: 'PAY-002', name: 'Dr. John Nash', role: 'Teacher', amount: '$4,800', status: 'processed', date: 'Oct 28, 2026' },
  { id: 'PAY-003', name: 'Admin Staff', role: 'Staff', amount: '$3,200', status: 'pending', date: 'Oct 28, 2026' },
];

export default function PrincipalPayroll() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPayroll = mockPayroll.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout role="principal">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('principal.payroll_title')}</h1>
          <p className="text-slate-500 mt-2">{t('principal.payroll_subtitle')}</p>
        </div>
        
        <div className="flex gap-4">
          <button onClick={() => showToast(t('toast.success'), 'Payroll report downloaded.', 'info')} className="px-4 py-2 glass rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> {t('principal.export')}
          </button>
          <button onClick={() => showToast(t('toast.success'), t('toast.payroll_processed'), 'success')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {t('principal.process_all')}
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
                <th className="p-4 font-bold text-slate-900 dark:text-white">{t('principal.employee')}</th>
                <th className="p-4 font-bold text-slate-900 dark:text-white">{t('principal.role')}</th>
                <th className="p-4 font-bold text-slate-900 dark:text-white">{t('principal.amount')}</th>
                <th className="p-4 font-bold text-slate-900 dark:text-white">{t('principal.date')}</th>
                <th className="p-4 font-bold text-slate-900 dark:text-white">{t('principal.status')}</th>
                <th className="p-4 font-bold text-slate-900 dark:text-white text-right">{t('principal.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayroll.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{item.id}</p>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">{item.role}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 dark:text-white">{item.amount}</span>
                  </td>
                  <td className="p-4 text-slate-500 text-sm">
                    {item.date}
                  </td>
                  <td className="p-4">
                    <span className={clsx(
                      "px-2 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1",
                      item.status === 'processed' ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => showToast(t('toast.success'), t('toast.payroll_processed'), 'success')} className="px-3 py-1 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-bold transition-colors">
                        {t('principal.process')}
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
