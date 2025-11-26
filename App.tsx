
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Results } from './pages/Results';
import { Stats } from './pages/Stats';
import { Flashcards } from './pages/Flashcards';
import { Guide } from './pages/Guide';
import { Language } from './types';
import { GITHUB_URL } from './constants';
import { Github } from 'lucide-react';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('de');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans transition-colors duration-300">
        <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/quiz" element={<Quiz lang={lang} />} />
            <Route path="/results" element={<Results lang={lang} />} />
            <Route path="/stats" element={<Stats lang={lang} />} />
            <Route path="/flashcards" element={<Flashcards lang={lang} />} />
            <Route path="/guide" element={<Guide lang={lang} />} />
            <Route path="*" element={<Home lang={lang} />} />
          </Routes>
        </main>
        <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-8 mt-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-slate-500 dark:text-slate-400 text-sm text-center md:text-left">
                  <p>&copy; {new Date().getFullYear()} ISTQB Master.</p>
                  <p className="text-xs mt-1">Unofficial practice tool based on ISTQB® Syllabus.</p>
                </div>
                
                <a 
                  href={GITHUB_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                >
                  <Github size={20} />
                  <span className="font-medium text-sm">View on GitHub</span>
                </a>
            </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;