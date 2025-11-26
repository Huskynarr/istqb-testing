
import React from 'react';
import { Language } from '../types';
import { GUIDE_DATA, TRANSLATIONS } from '../constants';
import { BookOpen } from 'lucide-react';

interface GuideProps {
  lang: Language;
}

export const Guide: React.FC<GuideProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const guides = GUIDE_DATA[lang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t.guideTitle}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">{t.guideSub}</p>
      </div>

      <div className="space-y-8">
        {guides.map((section) => (
            <div key={section.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-300">
                <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
                    <BookOpen className="text-blue-600 dark:text-blue-400" size={20} />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{section.title}</h2>
                </div>
                <div className="p-6 md:p-8">
                     <div className="prose prose-slate dark:prose-invert max-w-none">
                         {section.content.split('\n').map((line, idx) => {
                             const trimmed = line.trim();
                             if (!trimmed) return <br key={idx} />;
                             if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                                 return <h3 key={idx} className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2">{trimmed.replace(/\*\*/g, '')}</h3>;
                             }
                             if (trimmed.startsWith('* ')) {
                                 return (
                                     <div key={idx} className="flex items-start gap-2 ml-4 mb-2">
                                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-2 shrink-0"></div>
                                         <span className="text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: trimmed.substring(2).replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>') }} />
                                     </div>
                                 );
                             }
                             if (trimmed.match(/^\d\./)) {
                                 return (
                                     <div key={idx} className="flex items-start gap-2 mb-2">
                                         <span className="font-bold text-slate-400 dark:text-slate-500 w-6">{trimmed.split('.')[0]}.</span>
                                         <span className="flex-1 text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: trimmed.substring(trimmed.indexOf(' ') + 1).replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                                     </div>
                                 )
                             }
                             return <p key={idx} className="mb-2 text-slate-700 dark:text-slate-300">{trimmed}</p>;
                         })}
                     </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};