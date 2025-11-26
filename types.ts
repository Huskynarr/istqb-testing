
export enum Difficulty {
  Foundation = 'Foundation Level',
  Advanced = 'Advanced Level',
}

export enum QuestionTopic {
  Fundamentals = 'Grundlagen des Testens',
  Lifecycle = 'Testen im Softwarelebenszyklus',
  Static = 'Statischer Test',
  Techniques = 'Testverfahren',
  Management = 'Testmanagement',
  Tools = 'Werkzeugunterstützung',
}

// Maps topics to English for logic, though display values are handled via translation
export const QuestionTopicEn = {
  [QuestionTopic.Fundamentals]: 'Fundamentals of Testing',
  [QuestionTopic.Lifecycle]: 'Testing throughout the Software Life Cycle',
  [QuestionTopic.Static]: 'Static Testing',
  [QuestionTopic.Techniques]: 'Test Techniques',
  [QuestionTopic.Management]: 'Test Management',
  [QuestionTopic.Tools]: 'Tool Support for Testing',
};

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string; // We keep the German Topic Enum as the key internally
  difficulty: Difficulty;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<string, number>; // questionId -> optionIndex
  isFinished: boolean;
  score: number;
  isLoading: boolean;
  error: string | null;
}

export interface GeneratedQuestionResponse {
  questions: {
    questionText: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
    topic: string;
  }[];
}

export type Language = 'de' | 'en';

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  topic: QuestionTopic;
}

export interface GuideSection {
  id: string;
  title: string;
  content: string; // Supports basic markdown-like structure
  topic: QuestionTopic;
}
