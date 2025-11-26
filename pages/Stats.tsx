
import React, { useEffect, useState } from 'react';
import { getStatistics, clearStatistics, ExamResult } from '../services/geminiService';
import { Button } from '../components/Button';
import { Trash2, TrendingUp, Book, CheckCircle, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface StatsProps {
  lang: Language;
}

export const Stats: React.FC<StatsProps> = ({ lang }) => {
  const [results, setResults] = useState<ExamResult[]>([]);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    setResults(getStatistics());
  }, []);

  const handleClear = () => {
    if (window.confirm(t.resetConfirm)) {
      clearStatistics();
      setResults([]);
    }
  };

  const handleExport = () => {
    if (results.length === 0) return;
    const headers = ['Datum', 'Uhrzeit', 'Modus', 'Thema', 'Erreichte Punkte', 'Max. Punkte', 'Prozent', 'Bestanden'];
    const rows = results.map(r => {
      const date = new Date(r.date);
      const percentage = Math.round((r.score / r.total) * 100);
      const passed = percentage >= 65 ? 'Ja' : 'Nein';
      const modeLabel = r.mode === 'exam' ? 'Prüfung' : 'Übung';
      return [
        date.toLocaleDateString(), date.toLocaleTimeString(), modeLabel, r.topic, r.score, r.total, `${percentage}%`, passed
      ].map(field => `"${field}"`).join(',');
    });
    const csvContent = "\uFEFF" + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `istqb_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalExams = results.length;
  const averageScore = totalExams > 0 
    ? Math.round(results.reduce((acc, curr) => acc + (curr.score / curr.total * 100), 0) / totalExams) 
    : 0;
  
  const passedExams = results.filter(r => (r.score / r.total) >= 0.65).length;

  const chartData = results.map((r, i) => ({
    name: `${i + 1}`,
    score: Math.round((r.score / r.total) * 100),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.statTitle}</h1>
        {results.length > 0 && (
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExport} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 dark:hover:text-white border-slate-300 dark:border-slate-600">
              <Download size={18} className="mr-2" />
              {t.exportCsv}
            </Button>
            <Button variant="outline" onClick={handleClear} className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900">
              <Trash2 size={18} className="mr-2" />
              {t.resetStats}
            </Button>
          </div>
        )}
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
          <div className="inline-block p-4 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
            <TrendingUp size={32} className="text-slate-400 dark:text-slate-500" />
          </div>
          <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-2">{t.noStats}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t.noStatsDesc}</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Book size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.completedTests}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalExams}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${averageScore >= 65 ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400'}`}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.average}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{averageScore}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.passed} (≥65%)</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{passedExams} <span className="text-sm font-normal text-slate-400 dark:text-slate-500">/ {totalExams}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">{t.progress}</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--tw-prose-body)', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="limit" stroke="#ef4444" strokeDasharray="5 5" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* History List */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
             <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
               <h3 className="font-semibold text-slate-900 dark:text-white">{t.recentActivity}</h3>
             </div>
             <div className="divide-y divide-slate-100 dark:divide-slate-700">
               {[...results].reverse().map((r) => (
                 <div key={r.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between transition-colors">
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="font-medium text-slate-900 dark:text-white">
                         {r.mode === 'exam' ? t.examMode : t.practiceMode}
                       </span>
                       <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                         {r.topic === 'all' ? t.allTopics : r.topic}
                       </span>
                     </div>
                     <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(r.date).toLocaleString()}</p>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className={`block text-lg font-bold ${(r.score / r.total) >= 0.65 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {Math.round((r.score / r.total) * 100)}%
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{r.score}/{r.total}</span>
                      </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </>
      )}
    </div>
  );
};