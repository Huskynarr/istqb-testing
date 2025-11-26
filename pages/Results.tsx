
import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Question, Language } from '../types';
import { Button } from '../components/Button';
import { CheckCircle2, XCircle, Home, RotateCcw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TRANSLATIONS } from '../constants';

interface ResultsProps {
  lang: Language;
}

interface LocationState {
    questions: Question[];
    userAnswers: Record<string, number>;
    score: number;
    total: number;
}

export const Results: React.FC<ResultsProps> = ({ lang }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;
    const t = TRANSLATIONS[lang];

    if (!state) {
        return <Navigate to="/" />;
    }

    const { questions, userAnswers, score, total } = state;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 65;

    const chartData = [
        { name: 'Richtig', value: score },
        { name: 'Falsch', value: total - score }
    ];
    const COLORS = ['#22c55e', '#ef4444'];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-block p-4 rounded-full bg-white dark:bg-slate-800 shadow-lg mb-6 transition-colors duration-300">
                     <div className="w-48 h-48">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                         </ResponsiveContainer>
                         <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center -mt-2 pointer-events-none">
                             <span className="text-3xl font-bold text-slate-800 dark:text-white">{percentage}%</span>
                         </div>
                     </div>
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {passed ? t.congrats : t.failed}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
                    {t.resultText.replace('{score}', score.toString()).replace('{total}', total.toString())}
                    {' '}
                    {passed ? t.passMsg : t.failMsg}
                </p>

                <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={() => navigate('/')} className="gap-2 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white">
                        <Home size={18} />
                        {t.backHome}
                    </Button>
                    <Button onClick={() => navigate('/quiz?topic=all&count=10')} className="gap-2">
                        <RotateCcw size={18} />
                        {t.newQuiz}
                    </Button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-300">
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t.detailedResults}</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {questions.map((q, idx) => {
                        const userAnswer = userAnswers[q.id];
                        const isCorrect = userAnswer === q.correctIndex;
                        
                        return (
                            <div key={q.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 mt-1">
                                        {isCorrect ? (
                                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                                        ) : (
                                            <XCircle className="w-6 h-6 text-red-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t.question} {idx + 1} • {q.topic}</p>
                                        <h4 className="font-medium text-slate-900 dark:text-white mb-3">{q.text}</h4>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className={`p-3 rounded-lg border text-sm ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'}`}>
                                                <span className="font-semibold block text-xs uppercase mb-1">{t.yourAnswer}</span>
                                                {q.options[userAnswer] || "---"}
                                            </div>
                                            {!isCorrect && (
                                                <div className="p-3 rounded-lg border bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-sm">
                                                    <span className="font-semibold block text-xs uppercase mb-1">{t.correctAnswer}</span>
                                                    {q.options[q.correctIndex]}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded text-sm text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                                            <span className="font-semibold text-slate-800 dark:text-slate-200 mr-2">{t.explanation}:</span>
                                            {q.explanation}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};