
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { generateQuestions, saveExamResult } from '../services/geminiService';
import { QuizState, Difficulty, Language } from '../types';
import { Button } from '../components/Button';
import { CheckCircle2, XCircle, ChevronRight, AlertCircle, HelpCircle } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface QuizProps {
  lang: Language;
}

export const Quiz: React.FC<QuizProps> = ({ lang }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topic = searchParams.get('topic') || 'all';
  const count = parseInt(searchParams.get('count') || '10', 10);
  const mode = searchParams.get('mode') || 'practice'; // 'practice' or 'exam'
  const t = TRANSLATIONS[lang];

  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    isFinished: false,
    score: 0,
    isLoading: true,
    error: null,
  });

  const [showExplanation, setShowExplanation] = useState(false);

  // Initialize Quiz
  useEffect(() => {
    const initQuiz = async () => {
      try {
        const response = await generateQuestions(
            count, 
            topic, 
            Difficulty.Foundation,
            lang
        );
        
        const generatedQuestions = response.questions.map((q, idx) => ({
            id: `q-${Date.now()}-${idx}`,
            text: q.questionText,
            options: q.options,
            correctIndex: q.correctOptionIndex,
            explanation: q.explanation,
            topic: q.topic,
            difficulty: Difficulty.Foundation
        }));

        setState(prev => ({
          ...prev,
          questions: generatedQuestions,
          isLoading: false
        }));

      } catch (err) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: t.errorTitle
        }));
      }
    };

    initQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleAnswer = (optionIndex: number) => {
    if (state.isFinished) return;
    
    // In practice mode, we can't change answer once selected
    if (mode === 'practice' && state.userAnswers[state.questions[state.currentQuestionIndex].id] !== undefined) {
        return;
    }

    setState(prev => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [prev.questions[prev.currentQuestionIndex].id]: optionIndex
      }
    }));
    
    if (mode === 'practice') {
        setShowExplanation(true);
    }
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (state.currentQuestionIndex < state.questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let score = 0;
    state.questions.forEach(q => {
        if (state.userAnswers[q.id] === q.correctIndex) {
            score++;
        }
    });

    saveExamResult({
      score,
      total: state.questions.length,
      topic: topic,
      mode: mode
    });

    navigate('/results', { 
        state: { 
            questions: state.questions, 
            userAnswers: state.userAnswers, 
            score,
            total: state.questions.length
        } 
    });
  };

  if (state.isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
         <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">{t.loading}</h2>
      </div>
    );
  }

  if (state.error || state.questions.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center max-w-md border border-red-100 dark:border-red-900">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">{t.errorTitle}</h3>
            <p className="text-red-600 dark:text-red-300 mb-6">{state.error || t.noQuestions}</p>
            <Button onClick={() => navigate('/')}>{t.backHome}</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const hasAnswered = state.userAnswers[currentQuestion.id] !== undefined;
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t.question} {state.currentQuestionIndex + 1} {t.of} {state.questions.length}
            </span>
            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                {currentQuestion.topic}
            </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
            <div 
                className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${((state.currentQuestionIndex + 1) / state.questions.length) * 100}%` }}
            ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-300">
        <div className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-8 leading-relaxed">
                {currentQuestion.text}
            </h2>

            <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                    let optionClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 group relative ";
                    
                    if (mode === 'practice' && hasAnswered) {
                        if (idx === currentQuestion.correctIndex) {
                            optionClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-300";
                        } else if (state.userAnswers[currentQuestion.id] === idx) {
                            optionClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300"; 
                        } else {
                            optionClass += "border-slate-100 dark:border-slate-700 opacity-50 text-slate-900 dark:text-slate-400";
                        }
                    } else {
                        // Exam mode or not answered yet
                        if (state.userAnswers[currentQuestion.id] === idx) {
                            optionClass += "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300";
                        } else {
                            optionClass += "border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300";
                        }
                    }

                    return (
                        <button 
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className={optionClass}
                            disabled={mode === 'practice' && hasAnswered}
                        >
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border shrink-0
                                ${mode === 'practice' && hasAnswered && idx === currentQuestion.correctIndex ? 'bg-green-500 border-green-500 text-white' : 
                                  mode === 'practice' && hasAnswered && state.userAnswers[currentQuestion.id] === idx ? 'bg-red-500 border-red-500 text-white' :
                                  state.userAnswers[currentQuestion.id] === idx ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400'}
                            `}>
                                {String.fromCharCode(65 + idx)}
                            </div>
                            <span className="font-medium flex-1">{option}</span>
                            
                            {mode === 'practice' && hasAnswered && idx === currentQuestion.correctIndex && (
                                <CheckCircle2 className="text-green-600 dark:text-green-400 w-6 h-6 shrink-0" />
                            )}
                            {mode === 'practice' && hasAnswered && state.userAnswers[currentQuestion.id] === idx && idx !== currentQuestion.correctIndex && (
                                <XCircle className="text-red-600 dark:text-red-400 w-6 h-6 shrink-0" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Explanation Footer (Practice Mode) */}
        {mode === 'practice' && showExplanation && (
            <div className={`
                p-6 border-t animate-in fade-in slide-in-from-bottom-4 duration-300
                ${state.userAnswers[currentQuestion.id] === currentQuestion.correctIndex 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900'}
            `}>
                <div className="flex items-start gap-3">
                    {state.userAnswers[currentQuestion.id] === currentQuestion.correctIndex ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    ) : (
                        <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                        <h4 className={`font-semibold mb-1 ${
                            state.userAnswers[currentQuestion.id] === currentQuestion.correctIndex ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'
                        }`}>
                            {state.userAnswers[currentQuestion.id] === currentQuestion.correctIndex ? 'Richtig!' : 'Falsch!'}
                        </h4>
                        <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base mt-2">
                             <span className="font-semibold block mb-1">{t.explanation}:</span>
                             {currentQuestion.explanation}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Action Bar */}
        <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
             <Button 
                onClick={nextQuestion} 
                disabled={!hasAnswered}
                className="pl-6 pr-4"
             >
                {state.currentQuestionIndex === state.questions.length - 1 ? t.finish : t.next}
                <ChevronRight size={18} className="ml-2" />
             </Button>
        </div>
      </div>
    </div>
  );
};