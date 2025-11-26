
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, Zap, Clock, BrainCircuit, Play } from 'lucide-react';
import { Button } from '../components/Button';
import { TOPICS_FOUNDATION, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface HomeProps {
  lang: Language;
}

export const Home: React.FC<HomeProps> = ({ lang }) => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const t = TRANSLATIONS[lang];

  const startQuiz = () => {
    const params = new URLSearchParams({
      topic: selectedTopic,
      count: questionCount.toString(),
      mode: 'practice'
    });
    navigate(`/quiz?${params.toString()}`);
  };

  const startMockExam = () => {
     const params = new URLSearchParams({
      topic: 'all',
      count: '40',
      mode: 'exam'
    });
    navigate(`/quiz?${params.toString()}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          {t.heroTitle} <span className="text-blue-600 dark:text-blue-400">{t.heroTitleHighlight}</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-slate-500 dark:text-slate-400">
          {t.heroSub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Practice Mode Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl">
                <Zap size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.practiceMode}</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6 min-h-[48px]">
              {t.practiceDesc}
            </p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.topicSelect}</label>
                <select 
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="all">{t.allTopics}</option>
                  {TOPICS_FOUNDATION.map((topic) => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.questionCount}</label>
                <div className="flex gap-2">
                  {[5, 10, 20].map(num => (
                    <button
                      key={num}
                      onClick={() => setQuestionCount(num)}
                      className={`flex-1 py-2 text-sm font-medium rounded-md border transition-colors ${
                        questionCount === num 
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 ring-1 ring-blue-500' 
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button onClick={startQuiz} className="w-full justify-between group">
              <span>{t.startPractice}</span>
              <Play size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Exam Mode Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="p-8">
             <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-xl">
                <Clock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.examMode}</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6 min-h-[48px]">
              {t.examDesc}
            </p>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-8 border border-slate-100 dark:border-slate-700">
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <BookOpen size={16} className="text-slate-400 dark:text-slate-500" />
                  <span>{t.examInfo1}</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Trophy size={16} className="text-slate-400 dark:text-slate-500" />
                  <span>{t.examInfo2}</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <BrainCircuit size={16} className="text-slate-400 dark:text-slate-500" />
                  <span>{t.examInfo3}</span>
                </li>
              </ul>
            </div>

            <Button onClick={startMockExam} variant="outline" className="w-full justify-between group hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white">
              <span>{t.startExam}</span>
              <Play size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
         <p className="text-sm text-slate-400 dark:text-slate-500">{t.syllabusRef}</p>
      </div>
    </div>
  );
};