import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, GraduationCap, Building, Banknote, ShieldCheck, Download, MoreVertical, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import Layout from '../components/Layout';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const financeData = [
  { name: 'Jan', revenue: 120000, expenses: 85000 },
  { name: 'Feb', revenue: 135000, expenses: 88000 },
  { name: 'Mar', revenue: 142000, expenses: 92000 },
  { name: 'Apr', revenue: 138000, expenses: 90000 },
  { name: 'May', revenue: 155000, expenses: 95000 },
  { name: 'Jun', revenue: 162000, expenses: 98000 },
];

const pendingApprovals = [
  { id: 'REQ-01', type: 'Budget', desc: 'Q3 Lab Equipment', amount: '$45,000', dept: 'Physics', date: 'Today' },
  { id: 'REQ-02', type: 'Hire', desc: 'Assistant Professor', amount: '-', dept: 'Comp Sci', date: 'Yesterday' },
  { id: 'REQ-03', type: 'Event', desc: 'Tech Symposium 2026', amount: '$12,000', dept: 'Engineering', date: '2 days ago' },
];

export default function PrincipalDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { showToast } = useToast();
  
  return (
    <Layout role="principal">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('dashboard.welcome', { name: user?.name || 'Admin' })}</h1>
          <p className="text-slate-500 mt-2">{t('dashboard.principal_summary')}</p>
        </div>
        
        <div className="flex gap-3">
          <button onClick={() => showToast(t('toast.success'), 'Report exported to CSV.', 'success')} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-medium transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: t('principal.total_students'), value: '2,845', icon: <Users className="w-6 h-6 text-blue-500" />, trend: '+4.2%', color: 'blue' },
          { label: t('principal.total_teachers'), value: '142', icon: <GraduationCap className="w-6 h-6 text-purple-500" />, trend: '+2', color: 'purple' },
          { label: t('principal.avg_attendance'), value: '94.8%', icon: <Building className="w-6 h-6 text-green-500" />, trend: '+1.1%', color: 'green' },
          { label: t('principal.pending_payrolls'), value: '12', icon: <Banknote className="w-6 h-6 text-orange-500" />, trend: 'Action Req.', color: 'orange', alert: true },
        ].map((stat, i) => (
          <div key={i} className={clsx(
            "glass p-6 rounded-3xl border shadow-sm relative overflow-hidden group",
            stat.alert ? "border-orange-200 dark:border-orange-900/50" : "border-slate-200 dark:border-slate-800"
          )}>
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${stat.color}-500/10 rounded-full blur-2xl group-hover:bg-${stat.color}-500/20 transition-colors duration-500`} />
            <div className="flex justify-between items-start mb-4 relative">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                {stat.icon}
              </div>
              <span className={clsx(
                "px-2 py-1 rounded-lg text-xs font-bold",
                stat.alert ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400" :
                stat.trend.startsWith('+') ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" :
                "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 glass p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" /> Financial Overview
            </h2>
            <select className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300">
              <option>H1 2026</option>
              <option>H2 2025</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: '1px solid rgba(51, 65, 85, 0.5)', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-500" /> {t('principal.pending_approvals')}
            </h2>
          </div>
          <div className="space-y-4">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                    {item.type}
                  </span>
                  <span className="text-xs text-slate-500">{item.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">{item.desc}</h4>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-xs text-slate-500">{item.dept}</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{item.amount}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => showToast(t('toast.success'), t('toast.denied'), 'error')} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      {t('principal.deny')}
                    </button>
                    <button onClick={() => showToast(t('toast.success'), t('toast.approved'), 'success')} className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                      {t('principal.approve')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">View All Requests &rarr;</button>
        </div>
      </div>
    </Layout>
  );
}
