
import React, { useState, useEffect } from 'react';
import { Language, QuestionTopic } from '../types';
import { FLASHCARDS_DATA, TRANSLATIONS, TOPICS_FOUNDATION } from '../constants';
import { Button } from '../components/Button';
import { RotateCw, ChevronLeft, ChevronRight, Layers, Filter } from 'lucide-react';

interface FlashcardsProps {
  lang: Language;
}

export const Flashcards: React.FC<FlashcardsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const allCards = FLASHCARDS_DATA[lang];
  
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filter logic
  const cards = filterTopic === 'all' 
    ? allCards 
    : allCards.filter(c => c.topic === filterTopic);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filterTopic, lang]);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 200);
  };

  if (cards.length === 0) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <h2 className="text-xl text-slate-900 dark:text-white">Keine Karten gefunden.</h2>
            <Button onClick={() => setFilterTopic('all')} className="mt-4">Alle anzeigen</Button>
        </div>
      )
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-8 w-full">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <Layers className="text-blue-600 dark:text-blue-400" />
            {t.flashcards}
        </h1>
        
        {/* Filter Control */}
        <div className="max-w-xs mx-auto mb-6">
            <div className="relative">
                <Filter className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <select
                    value={filterTopic}
                    onChange={(e) => setFilterTopic(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2 text-sm border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md border bg-white dark:bg-slate-800 text-slate-900 dark:text-white appearance-none cursor-pointer"
                >
                    <option value="all">{t.allTopics}</option>
                    {TOPICS_FOUNDATION.map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
                </select>
            </div>
        </div>

        <p className="text-slate-500 dark:text-slate-400">
            {currentIndex + 1} / {cards.length}
        </p>
      </div>

      <div className="w-full max-w-xl h-80 perspective-1000 mb-8 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
         <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
            
            {/* Front */}
            <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-8 text-center" style={{ backfaceVisibility: 'hidden' }}>
                <span className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-4">{currentCard.topic}</span>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">{currentCard.term}</h2>
                <div className="mt-8 text-sm text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <RotateCw size={14} />
                    {t.flipCard}
                </div>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full backface-hidden bg-blue-50 dark:bg-slate-700 rounded-2xl shadow-xl border border-blue-100 dark:border-slate-600 flex flex-col items-center justify-center p-8 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                 <p className="text-xl text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                    {currentCard.definition}
                 </p>
            </div>
         </div>
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={prevCard} className="gap-2 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
            <ChevronLeft size={18} />
            {t.prevCard}
        </Button>
        <Button onClick={nextCard} className="gap-2 pl-6 pr-4">
            {t.nextCard}
            <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
};