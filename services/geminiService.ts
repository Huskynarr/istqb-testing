
import { Difficulty, GeneratedQuestionResponse, Language } from "../types";
import { QUESTION_BANK_DE, QUESTION_BANK_EN } from "../constants";

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[j], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const generateQuestions = async (
  count: number,
  topic: string,
  difficulty: Difficulty,
  language: Language = 'de' // Default to German
): Promise<GeneratedQuestionResponse> => {
  
  // Select the correct question bank based on language
  const sourceBank = language === 'en' ? QUESTION_BANK_EN : QUESTION_BANK_DE;
  
  let filteredQuestions = sourceBank;

  if (topic !== 'all') {
    filteredQuestions = sourceBank.filter(q => q.topic === topic);
  }

  // Fallback if not enough questions (return all available for that language)
  if (filteredQuestions.length === 0) {
    filteredQuestions = sourceBank;
  }

  // Shuffle and slice
  const selectedQuestions = shuffleArray(filteredQuestions).slice(0, count);

  return {
    questions: selectedQuestions.map(q => ({
      questionText: q.text,
      options: q.options,
      correctOptionIndex: q.correctIndex,
      explanation: q.explanation,
      topic: q.topic
    }))
  };
};

export const explainConcept = async (concept: string): Promise<string> => {
  return `Concept explanation logic placeholder.`;
};

// --- Statistics Storage Service ---

const STORAGE_KEY = 'istqb_results_v1';

export interface ExamResult {
  id: string;
  date: string;
  score: number;
  total: number;
  topic: string;
  mode: string; // 'practice' | 'exam'
}

export const saveExamResult = (result: Omit<ExamResult, 'id' | 'date'>) => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    const results: ExamResult[] = existingData ? JSON.parse(existingData) : [];
    
    const newResult: ExamResult = {
      ...result,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    results.push(newResult);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch (e) {
    console.error("Failed to save result", e);
  }
};

export const getStatistics = (): ExamResult[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const clearStatistics = () => {
  localStorage.removeItem(STORAGE_KEY);
};
