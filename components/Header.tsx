
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Layers, BookOpen, Languages, Sun, Moon } from 'lucide-react';
import { APP_NAME, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang, theme, toggleTheme }) => {
  const location = useLocation();
  const t = TRANSLATIONS[lang];

  const isActive = (path: string) => location.pathname === path;
  const linkClass = (path: string) => `text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${isActive(path) ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'}`;

  const toggleLang = () => {
    setLang(lang === 'de' ? 'en' : 'de');
  };

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight hidden sm:block">{APP_NAME}</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link to="/" className={linkClass('/')}>{t.home}</Link>
            <Link to="/flashcards" className={linkClass('/flashcards')}>{t.flashcards}</Link>
            <Link to="/guide" className={linkClass('/guide')}>{t.guide}</Link>
            <Link to="/stats" className={linkClass('/stats')}>{t.stats}</Link>
          </nav>

          <div className="flex items-center gap-2">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button 
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              <Languages size={16} />
              <span className="uppercase">{lang}</span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Nav Bar (Simplified) */}
      <div className="md:hidden border-t border-slate-100 dark:border-slate-700 flex justify-around py-2 bg-slate-50 dark:bg-slate-800">
         <Link to="/" className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"><GraduationCap size={20}/></Link>
         <Link to="/flashcards" className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"><Layers size={20}/></Link>
         <Link to="/guide" className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"><BookOpen size={20}/></Link>
      </div>
    </header>
  );
};