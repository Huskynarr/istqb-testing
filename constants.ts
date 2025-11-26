
import { Difficulty, QuestionTopic, Question, Language, Flashcard, GuideSection } from './types';

export const APP_NAME = "ISTQB Master";

export const TOPICS_FOUNDATION = [
  QuestionTopic.Fundamentals,
  QuestionTopic.Lifecycle,
  QuestionTopic.Static,
  QuestionTopic.Techniques,
  QuestionTopic.Management,
  QuestionTopic.Tools,
];

export const GITHUB_URL = "https://github.com/Huskynarr/istqb-testing";

// --- TRANSLATIONS ---

export const TRANSLATIONS = {
  de: {
    home: "Startseite",
    stats: "Statistik",
    flashcards: "Lernkarten",
    guide: "Anleitungen",
    settings: "Einstellungen",
    heroTitle: "Meistern Sie Ihre",
    heroTitleHighlight: "ISTQB Prüfung",
    heroSub: "Umfangreicher Fragenpool, detaillierte Erklärungen und unbegrenztes Übungsmaterial für den Certified Tester.",
    practiceMode: "Schnelles Üben",
    practiceDesc: "Wählen Sie ein spezifisches Thema und üben Sie in Ihrem eigenen Tempo. Sofortiges Feedback nach jeder Frage.",
    examMode: "Prüfungssimulation",
    examDesc: "Simulieren Sie die echte Prüfungssituation. 40 Fragen, keine Zeitbeschränkung in dieser Demo. Kein Feedback bis zum Ende.",
    startPractice: "Übung starten",
    startExam: "Prüfung starten",
    topicSelect: "Thema auswählen",
    allTopics: "Alle Themen (Gemischt)",
    questionCount: "Anzahl Fragen",
    examInfo1: "Umfasst alle Kapitel des Lehrplans",
    examInfo2: "Bestehensgrenze: 65% (26 Punkte)",
    examInfo3: "Realistischer Schwierigkeitsgrad",
    syllabusRef: "Basierend auf dem ISTQB® Certified Tester Lehrplan",
    loading: "Laden...",
    errorTitle: "Ein Fehler ist aufgetreten",
    backHome: "Zurück zur Startseite",
    noQuestions: "Keine Fragen für dieses Thema gefunden.",
    question: "Frage",
    of: "von",
    explanation: "Erklärung",
    next: "Weiter",
    finish: "Abschließen",
    congrats: "Herzlichen Glückwunsch!",
    failed: "Schade, nicht bestanden.",
    resultText: "Sie haben {score} von {total} Fragen richtig beantwortet.",
    passMsg: "Damit liegen Sie über der Bestehensgrenze von 65%.",
    failMsg: "Sie benötigen 65%, um die Prüfung zu bestehen. Üben Sie weiter!",
    newQuiz: "Neue Übung",
    detailedResults: "Detaillierte Auswertung",
    yourAnswer: "Ihre Antwort:",
    correctAnswer: "Richtige Antwort:",
    statTitle: "Ihre Statistik",
    exportCsv: "CSV Exportieren",
    resetStats: "Statistik zurücksetzen",
    resetConfirm: "Möchten Sie wirklich alle gespeicherten Statistiken löschen?",
    noStats: "Keine Daten vorhanden",
    noStatsDesc: "Absolvieren Sie Übungen oder Prüfungen, um hier Ihre Fortschritte zu sehen.",
    completedTests: "Absolvierte Tests",
    average: "Durchschnitt",
    passed: "Bestanden",
    progress: "Lernfortschritt",
    recentActivity: "Letzte Aktivitäten",
    flipCard: "Karte drehen",
    nextCard: "Nächste",
    prevCard: "Vorherige",
    guideTitle: "Lernmaterialien",
    guideSub: "Wichtige Konzepte und Definitionen zum Nachlesen.",
    filterTopic: "Nach Thema filtern",
  },
  en: {
    home: "Home",
    stats: "Statistics",
    flashcards: "Flashcards",
    guide: "Study Guide",
    settings: "Settings",
    heroTitle: "Master your",
    heroTitleHighlight: "ISTQB Exam",
    heroSub: "Extensive question pool, detailed explanations, and unlimited practice material for the Certified Tester.",
    practiceMode: "Quick Practice",
    practiceDesc: "Choose a specific topic and practice at your own pace. Immediate feedback after every question.",
    examMode: "Mock Exam",
    examDesc: "Simulate the real exam situation. 40 questions, no time limit in this demo. No feedback until the end.",
    startPractice: "Start Practice",
    startExam: "Start Exam",
    topicSelect: "Select Topic",
    allTopics: "All Topics (Mixed)",
    questionCount: "Number of Questions",
    examInfo1: "Covers all syllabus chapters",
    examInfo2: "Pass mark: 65% (26 points)",
    examInfo3: "Realistic difficulty level",
    syllabusRef: "Based on ISTQB® Certified Tester Syllabus",
    loading: "Loading...",
    errorTitle: "An error occurred",
    backHome: "Back to Home",
    noQuestions: "No questions found for this topic.",
    question: "Question",
    of: "of",
    explanation: "Explanation",
    next: "Next",
    finish: "Finish",
    congrats: "Congratulations!",
    failed: "Sorry, you didn't pass.",
    resultText: "You answered {score} of {total} questions correctly.",
    passMsg: "You are above the pass mark of 65%.",
    failMsg: "You need 65% to pass the exam. Keep practicing!",
    newQuiz: "New Quiz",
    detailedResults: "Detailed Results",
    yourAnswer: "Your Answer:",
    correctAnswer: "Correct Answer:",
    statTitle: "Your Statistics",
    exportCsv: "Export CSV",
    resetStats: "Reset Statistics",
    resetConfirm: "Do you really want to delete all saved statistics?",
    noStats: "No data available",
    noStatsDesc: "Complete exercises or exams to see your progress here.",
    completedTests: "Completed Tests",
    average: "Average",
    passed: "Passed",
    progress: "Learning Progress",
    recentActivity: "Recent Activity",
    flipCard: "Flip Card",
    nextCard: "Next",
    prevCard: "Previous",
    guideTitle: "Study Guide",
    guideSub: "Important concepts and definitions to review.",
    filterTopic: "Filter by Topic",
  }
};

// --- DATA: QUESTIONS (DE) ---
export const QUESTION_BANK_DE: Omit<Question, 'id' | 'difficulty'>[] = [
  // --- GRUNDLAGEN (Fundamentals) ---
  {
    text: "Welches ist ein Hauptziel des Testens?",
    options: ["Fehlerfreiheit der Software beweisen", "Vertrauen in die Qualität des Testobjekts gewinnen", "Entwickler bestrafen", "Die Software so schnell wie möglich releasen"],
    correctIndex: 1,
    explanation: "Eines der Hauptziele des Testens ist es, Vertrauen in die Qualität des Testobjekts zu gewinnen. Fehlerfreiheit kann nie vollständig bewiesen werden (Grundsatz 1).",
    topic: QuestionTopic.Fundamentals
  },
  {
    text: "Was ist ein Fehlerzustand (Defect)?",
    options: ["Eine menschliche Handlung, die zu einem falschen Ergebnis führt", "Eine Unzulänglichkeit oder ein Mangel in einem Arbeitsergebnis", "Ein Ereignis, bei dem eine Komponente eine geforderte Funktion nicht ausführt", "Ein Werkzeugfehler"],
    correctIndex: 1,
    explanation: "Ein Fehlerzustand (Defect/Bug) ist eine Unzulänglichkeit in einem Arbeitsergebnis. Eine Fehlhandlung (Error) führt zum Fehlerzustand, der zur Fehlerwirkung (Failure) führen kann.",
    topic: QuestionTopic.Fundamentals
  },
  // --- LEBENSZYKLUS ---
  {
    text: "Welches Testniveau konzentriert sich auf die Schnittstellen zwischen Komponenten?",
    options: ["Komponententest", "Integrationstest", "Systemtest", "Abnahmetest"],
    correctIndex: 1,
    explanation: "Der Integrationstest prüft die Interaktionen zwischen Komponenten oder Systemen, um Schnittstellenfehler zu finden.",
    topic: QuestionTopic.Lifecycle
  },
  {
    text: "Welches Entwicklungsmodell ordnet jedem Entwicklungslevel direkt eine Teststufe zu?",
    options: ["Wasserfallmodell", "V-Modell", "Scrum", "Iteratives Modell"],
    correctIndex: 1,
    explanation: "Das V-Modell stellt jeder Entwicklungsphase (z.B. Design) eine entsprechende Teststufe (z.B. Systemtest) gegenüber.",
    topic: QuestionTopic.Lifecycle
  },
   // --- STATISCH ---
  {
    text: "Welches ist KEIN Ziel eines Reviews?",
    options: ["Erkennen von Defekten", "Wissensaustausch im Team", "Finden von dynamischen Laufzeitfehlern", "Verbesserung der Dokumentation"],
    correctIndex: 2,
    explanation: "Laufzeitfehler (dynamische Fehler) können nur durch dynamische Tests gefunden werden. Reviews sind statische Tests.",
    topic: QuestionTopic.Static
  },
  // --- VERFAHREN ---
  {
    text: "Zu welcher Kategorie gehört die Äquivalenzklassenbildung?",
    options: ["Strukturbasiert (White-Box)", "Spezifikationsbasiert (Black-Box)", "Erfahrungsbasiert", "Fehlerbasiert"],
    correctIndex: 1,
    explanation: "Äquivalenzklassenbildung ist ein Black-Box-Verfahren, da es auf der Analyse der Ein- und Ausgabedaten gemäß Spezifikation basiert.",
    topic: QuestionTopic.Techniques
  },
   // --- MANAGEMENT ---
  {
    text: "Was ist ein Risikobasierter Testansatz?",
    options: ["Testen ohne Planung", "Fokussierung der Testaufwände auf Bereiche mit dem höchsten Ausfallrisiko", "Testen, um Risiken zu ignorieren", "Nur Sicherheitstests durchführen"],
    correctIndex: 1,
    explanation: "Risikobasiertes Testen priorisiert Testfälle basierend auf der Wahrscheinlichkeit und den Auswirkungen eines Fehlers.",
    topic: QuestionTopic.Management
  },
  // --- WERKZEUGE ---
  {
    text: "Was ist 'Intrusion' (Eingriff) bei Testwerkzeugen?",
    options: ["Ein Hackerangriff", "Die Veränderung des Testobjekts durch den Einsatz des Werkzeugs", "Ein Fehler im Werkzeug", "Die Installation des Werkzeugs"],
    correctIndex: 1,
    explanation: "Intrusion bedeutet, dass das Testwerkzeug das Verhalten oder die Performance des Testobjekts beeinflusst (z.B. Performance-Messung).",
    topic: QuestionTopic.Tools
  }
];

// --- DATA: QUESTIONS (EN) ---
export const QUESTION_BANK_EN: Omit<Question, 'id' | 'difficulty'>[] = [
  {
    text: "What is a main objective of testing?",
    options: ["To prove that the software is error-free", "To gain confidence in the quality of the test object", "To punish developers", "To release the software as quickly as possible"],
    correctIndex: 1,
    explanation: "One of the main objectives of testing is to gain confidence in the quality of the test object. Testing cannot prove the absence of defects (Principle 1).",
    topic: QuestionTopic.Fundamentals
  },
  {
    text: "What is a Defect?",
    options: ["A human action that produces an incorrect result", "An imperfection or deficiency in a work product", "An event in which a component or system does not perform a required function", "A tool error"],
    correctIndex: 1,
    explanation: "A defect (bug) is an imperfection or deficiency in a work product. An error (mistake) leads to a defect, which can lead to a failure.",
    topic: QuestionTopic.Fundamentals
  },
  {
    text: "Which test level focuses on the interactions between components?",
    options: ["Component Testing", "Integration Testing", "System Testing", "Acceptance Testing"],
    correctIndex: 1,
    explanation: "Integration testing evaluates the interactions between components or systems to detect interface defects.",
    topic: QuestionTopic.Lifecycle
  },
  {
    text: "Which development model associates a test level with each development stage?",
    options: ["Waterfall Model", "V-Model", "Scrum", "Iterative Model"],
    correctIndex: 1,
    explanation: "The V-model associates a corresponding test level (e.g., System Testing) with each development phase (e.g., System Design).",
    topic: QuestionTopic.Lifecycle
  },
  {
    text: "Which is NOT an objective of a review?",
    options: ["Detecting defects", "Knowledge sharing", "Finding dynamic runtime failures", "Improving documentation"],
    correctIndex: 2,
    explanation: "Runtime failures (dynamic errors) can only be found through dynamic testing. Reviews are static testing.",
    topic: QuestionTopic.Static
  },
  {
    text: "To which category does Equivalence Partitioning belong?",
    options: ["Structure-based (White-box)", "Specification-based (Black-box)", "Experience-based", "Defect-based"],
    correctIndex: 1,
    explanation: "Equivalence Partitioning is a black-box technique as it is based on the analysis of input and output data according to the specification.",
    topic: QuestionTopic.Techniques
  },
  {
    text: "What is a risk-based testing approach?",
    options: ["Testing without planning", "Focusing test efforts on areas with the highest risk of failure", "Testing to ignore risks", "Performing only security tests"],
    correctIndex: 1,
    explanation: "Risk-based testing prioritizes test cases based on the probability and impact of a failure.",
    topic: QuestionTopic.Management
  },
  {
    text: "What is 'Intrusion' (Probe Effect) in test tools?",
    options: ["A hacker attack", "The alteration of the test object due to the use of the tool", "A bug in the tool", "The installation of the tool"],
    correctIndex: 1,
    explanation: "Intrusion means the test tool affects the behavior or performance of the test object (e.g., performance monitoring tools slowing it down).",
    topic: QuestionTopic.Tools
  }
];

// --- DATA: FLASHCARDS ---
export const FLASHCARDS_DATA: Record<Language, Flashcard[]> = {
  de: [
    { id: 'fc1', term: 'Fehlerwirkung (Failure)', definition: 'Ein Ereignis, bei dem eine Komponente oder ein System eine geforderte Funktion nicht im spezifizierten Rahmen ausführt.', topic: QuestionTopic.Fundamentals },
    { id: 'fc2', term: 'Fehlerzustand (Defect/Bug)', definition: 'Eine Unzulänglichkeit oder ein Mangel in einem Arbeitsergebnis, wie z.B. eine falsche Anweisung im Code.', topic: QuestionTopic.Fundamentals },
    { id: 'fc3', term: 'Fehlhandlung (Error)', definition: 'Eine menschliche Handlung, die zu einem falschen Ergebnis führt.', topic: QuestionTopic.Fundamentals },
    { id: 'fc4', term: 'Regressionstest', definition: 'Erneutes Testen eines bereits getesteten Programms nach Modifikationen, um sicherzustellen, dass keine neuen Fehler eingeführt wurden.', topic: QuestionTopic.Lifecycle },
    { id: 'fc5', term: 'Statischer Test', definition: 'Testen eines Arbeitsergebnisses ohne Ausführung des Codes (z.B. Reviews oder statische Analyse).', topic: QuestionTopic.Static },
    { id: 'fc6', term: 'Äquivalenzklasse', definition: 'Ein Teilbereich von Werten, für die angenommen wird, dass das System sie gleich behandelt (entweder alle validen oder alle invaliden).', topic: QuestionTopic.Techniques },
    
    // NEW DE Cards
    { id: 'fc7', term: 'Retest (Bestätigungstest)', definition: 'Wiederholung eines Tests, um zu bestätigen, dass ein Fehlerzustand erfolgreich behoben wurde.', topic: QuestionTopic.Lifecycle },
    { id: 'fc8', term: 'Alpha-Test', definition: 'Simulierter oder tatsächlicher operativer Test durch potenzielle Anwender/Kunden beim Entwickler.', topic: QuestionTopic.Lifecycle },
    { id: 'fc9', term: 'Beta-Test', definition: 'Operativer Test durch potenzielle Anwender an einem externen Ort (nicht beim Entwickler).', topic: QuestionTopic.Lifecycle },
    { id: 'fc10', term: 'Grenzwertanalyse', definition: 'Testverfahren, bei dem Testdaten an den Rändern von Äquivalenzklassen gewählt werden.', topic: QuestionTopic.Techniques },
    { id: 'fc11', term: 'Entscheidungstabelle', definition: 'Tabelle zur Darstellung von logischen Bedingungen und den daraus resultierenden Aktionen.', topic: QuestionTopic.Techniques },
    { id: 'fc12', term: 'Zustandsbezogener Test', definition: 'Testverfahren basierend auf einem Zustandsübergangsdiagramm.', topic: QuestionTopic.Techniques },
    { id: 'fc13', term: 'Anweisungstestabdeckung', definition: 'Der Prozentsatz der ausgeführten Anweisungen im Code durch Tests (Statement Coverage).', topic: QuestionTopic.Techniques },
    { id: 'fc14', term: 'Entscheidungsüberdeckung', definition: 'Der Prozentsatz der Entscheidungsausgänge (z.B. True/False), die getestet wurden.', topic: QuestionTopic.Techniques },
    { id: 'fc15', term: 'Exploratives Testen', definition: 'Informelles Testen, bei dem Testdurchführung und Testentwurf gleichzeitig stattfinden.', topic: QuestionTopic.Techniques },
    { id: 'fc16', term: 'Inspektion', definition: 'Formalste Reviewart mit Protokollierung, Moderation und definierten Rollen.', topic: QuestionTopic.Static },
    { id: 'fc17', term: 'Walkthrough', definition: 'Reviewart, bei der der Autor durch das Dokument führt; weniger formal als Inspektion.', topic: QuestionTopic.Static },
    { id: 'fc18', term: 'Technisches Review', definition: 'Review durch Fachkollegen mit dem Ziel, technische Probleme zu lösen.', topic: QuestionTopic.Static },
    { id: 'fc19', term: 'Testplan', definition: 'Dokument, das Umfang, Vorgehensweise, Ressourcen und Zeitplan der Testaktivitäten beschreibt.', topic: QuestionTopic.Management },
    { id: 'fc20', term: 'Teststrategie', definition: 'Eine generelle Beschreibung, wie getestet werden soll (High-Level).', topic: QuestionTopic.Management },
    { id: 'fc21', term: 'Eingangskriterien', definition: 'Bedingungen, die erfüllt sein müssen, bevor eine Testaktivität beginnen kann.', topic: QuestionTopic.Management },
    { id: 'fc22', term: 'Endekriterien', definition: 'Bedingungen, die erfüllt sein müssen, um eine Testaktivität als abgeschlossen zu betrachten.', topic: QuestionTopic.Management },
    { id: 'fc23', term: 'Fehlerdichte', definition: 'Anzahl der gefundenen Fehler pro Größeneinheit (z.B. KLoC) des Testobjekts.', topic: QuestionTopic.Management },
    { id: 'fc24', term: 'Testorakel', definition: 'Eine Quelle, um das erwartete Ergebnis eines Tests zu bestimmen (z.B. Spezifikation, Altsystem).', topic: QuestionTopic.Fundamentals },
    { id: 'fc25', term: 'Stub', definition: 'Ein Hilfsprogramm, das eine aufgerufene Komponente simuliert (ersetzt).', topic: QuestionTopic.Tools },
    { id: 'fc26', term: 'Treiber (Driver)', definition: 'Ein Hilfsprogramm, das die zu testende Komponente aufruft.', topic: QuestionTopic.Tools },
    { id: 'fc27', term: 'Datengesteuertes Testen', definition: 'Ein Skripttechnik, bei der Eingabedaten und erwartete Ergebnisse in einer Tabelle/Datei gespeichert sind.', topic: QuestionTopic.Tools },
    { id: 'fc28', term: 'Schlüsselwortbasiertes Testen', definition: 'Skripttechnik, bei der Testfälle durch Schlüsselwörter (Keywords) beschrieben werden.', topic: QuestionTopic.Tools },
    { id: 'fc29', term: 'Konfigurationsmanagement', definition: 'Verwaltung von Versionen und Änderungen an Software und Dokumentation.', topic: QuestionTopic.Management },
    { id: 'fc30', term: 'Wartungstest', definition: 'Testen nach Änderungen im Betrieb, Migration oder Aussonderung von Software.', topic: QuestionTopic.Lifecycle },
    { id: 'fc31', term: 'Use Case Testing', definition: 'Testfälle basierend auf Anwendungsfällen (Use Cases) und Benutzerinteraktionen.', topic: QuestionTopic.Techniques },
  ],
  en: [
    { id: 'fc1', term: 'Failure', definition: 'An event in which a component or system does not perform a required function within specified limits.', topic: QuestionTopic.Fundamentals },
    { id: 'fc2', term: 'Defect (Bug)', definition: 'An imperfection or deficiency in a work product where it does not meet its requirements or specifications.', topic: QuestionTopic.Fundamentals },
    { id: 'fc3', term: 'Error (Mistake)', definition: 'A human action that produces an incorrect result.', topic: QuestionTopic.Fundamentals },
    { id: 'fc4', term: 'Regression Testing', definition: 'Testing of a previously tested program following modification to ensure that defects have not been introduced.', topic: QuestionTopic.Lifecycle },
    { id: 'fc5', term: 'Static Testing', definition: 'Testing of a work product without execution of the code (e.g., reviews or static analysis).', topic: QuestionTopic.Static },
    { id: 'fc6', term: 'Equivalence Partition', definition: 'A portion of an input or output domain for which the behavior of a component or system is assumed to be the same.', topic: QuestionTopic.Techniques },

    // NEW EN Cards
    { id: 'fc7', term: 'Confirmation Testing (Re-testing)', definition: 'Dynamic testing conducted after fixing defects with the objective to confirm that failures have been corrected.', topic: QuestionTopic.Lifecycle },
    { id: 'fc8', term: 'Alpha Testing', definition: 'Simulated or actual operational testing by potential users/customers at the developers site.', topic: QuestionTopic.Lifecycle },
    { id: 'fc9', term: 'Beta Testing', definition: 'Operational testing by potential and/or existing users at an external site not otherwise involved with the developers.', topic: QuestionTopic.Lifecycle },
    { id: 'fc10', term: 'Boundary Value Analysis', definition: 'A black-box test technique in which test cases are designed based on boundary values.', topic: QuestionTopic.Techniques },
    { id: 'fc11', term: 'Decision Table Testing', definition: 'A black-box test technique in which test cases are designed to execute the combinations of inputs shown in a decision table.', topic: QuestionTopic.Techniques },
    { id: 'fc12', term: 'State Transition Testing', definition: 'A black-box test technique using a state transition diagram or state table.', topic: QuestionTopic.Techniques },
    { id: 'fc13', term: 'Statement Coverage', definition: 'The percentage of executable statements that have been exercised by a test suite.', topic: QuestionTopic.Techniques },
    { id: 'fc14', term: 'Decision Coverage', definition: 'The percentage of decision outcomes that have been exercised by a test suite.', topic: QuestionTopic.Techniques },
    { id: 'fc15', term: 'Exploratory Testing', definition: 'An approach to testing whereby the testers dynamically design and execute tests based on their knowledge and prior results.', topic: QuestionTopic.Techniques },
    { id: 'fc16', term: 'Inspection', definition: 'A type of formal review to identify issues in a work product, which provides measurements to improve the review process.', topic: QuestionTopic.Static },
    { id: 'fc17', term: 'Walkthrough', definition: 'A type of review where the author leads members of the review team through a work product.', topic: QuestionTopic.Static },
    { id: 'fc18', term: 'Technical Review', definition: 'A peer group discussion activity that focuses on achieving consensus on the technical content of a document.', topic: QuestionTopic.Static },
    { id: 'fc19', term: 'Test Plan', definition: 'A document describing the scope, approach, resources and schedule of intended test activities.', topic: QuestionTopic.Management },
    { id: 'fc20', term: 'Test Strategy', definition: 'A high-level description of the test levels to be performed and the testing within those levels.', topic: QuestionTopic.Management },
    { id: 'fc21', term: 'Entry Criteria', definition: 'The set of conditions for officially starting a defined task.', topic: QuestionTopic.Management },
    { id: 'fc22', term: 'Exit Criteria', definition: 'The set of conditions for officially completing a defined task.', topic: QuestionTopic.Management },
    { id: 'fc23', term: 'Defect Density', definition: 'The number of defects identified in a component or system divided by the size of the component or system.', topic: QuestionTopic.Management },
    { id: 'fc24', term: 'Test Oracle', definition: 'A source to determine expected results to compare with the actual result of the software under test.', topic: QuestionTopic.Fundamentals },
    { id: 'fc25', term: 'Stub', definition: 'A skeletal or special-purpose implementation of a software component, used to develop or test a component that calls or is otherwise dependent on it.', topic: QuestionTopic.Tools },
    { id: 'fc26', term: 'Test Driver', definition: 'A software component or test tool that replaces a component that takes care of the control and/or the calling of a component or system.', topic: QuestionTopic.Tools },
    { id: 'fc27', term: 'Data-driven Testing', definition: 'A scripting technique that stores test input and expected results in a table or spreadsheet, so that a single control script can execute all of the tests in the table.', topic: QuestionTopic.Tools },
    { id: 'fc28', term: 'Keyword-driven Testing', definition: 'A scripting technique that uses data files to contain not only test data and expected results, but also keywords related to the application being tested.', topic: QuestionTopic.Tools },
    { id: 'fc29', term: 'Configuration Management', definition: 'A discipline applying technical and administrative direction to identify and document the functional and physical characteristics of a configuration item.', topic: QuestionTopic.Management },
    { id: 'fc30', term: 'Maintenance Testing', definition: 'Testing the changes to an operational system or the impact of a changed environment to an operational system.', topic: QuestionTopic.Lifecycle },
    { id: 'fc31', term: 'Use Case Testing', definition: 'A black-box test technique in which test cases are designed to execute scenarios of use cases.', topic: QuestionTopic.Techniques },
  ]
};

// --- DATA: GUIDES ---
export const GUIDE_DATA: Record<Language, GuideSection[]> = {
  de: [
    {
      id: 'g1',
      title: 'Die 7 Grundsätze des Testens',
      topic: QuestionTopic.Fundamentals,
      content: `
1. **Testen zeigt die Anwesenheit von Fehlerzuständen:** Testen kann zeigen, dass Fehler vorhanden sind, aber nicht, dass keine vorhanden sind.
2. **Vollständiges Testen ist nicht möglich:** Alles zu testen (alle Kombinationen) ist außer bei trivialen Fällen unmöglich.
3. **Frühes Testen spart Zeit und Geld:** Fehler, die früh gefunden werden, sind günstiger zu beheben.
4. **Häufung von Fehlerzuständen:** Die meisten Fehler finden sich oft in wenigen Modulen.
5. **Pestizid-Paradoxon:** Wiederholt man die gleichen Tests immer wieder, finden sie irgendwann keine neuen Fehler mehr.
6. **Testen ist kontextabhängig:** Sicherheitstests sind anders als Tests für eine E-Commerce-Seite.
7. **Trugschluss der Fehlerfreiheit:** Ein fehlerfreies System ist nutzlos, wenn es nicht die Benutzeranforderungen erfüllt.
      `
    },
    {
      id: 'g2',
      title: 'Testarten vs. Teststufen',
      topic: QuestionTopic.Lifecycle,
      content: `
**Teststufen (Level):**
* *Komponententest:* Testet einzelne Module (Unit Tests).
* *Integrationstest:* Testet das Zusammenspiel zwischen Modulen oder Systemen.
* *Systemtest:* Testet das Gesamtsystem gegen Anforderungen.
* *Abnahmetest:* Validierung durch den Benutzer/Kunden.

**Testarten (Types):**
* *Funktional:* Was macht das System?
* *Nicht-funktional:* Wie gut macht es das? (Performance, Usability).
* *Strukturbasiert (White-box):* Basiert auf der internen Struktur.
* *Änderungsbezogen:* Regressionstest und Retest.
      `
    }
  ],
  en: [
     {
      id: 'g1',
      title: 'The 7 Principles of Testing',
      topic: QuestionTopic.Fundamentals,
      content: `
1. **Testing shows the presence of defects:** Testing can show that defects are present, but cannot prove that there are no defects.
2. **Exhaustive testing is impossible:** Testing everything (all combinations of inputs and preconditions) is not feasible except for trivial cases.
3. **Early testing saves time and money:** Defects found early are cheaper to fix.
4. **Defect clustering:** A small number of modules usually contain most of the defects discovered.
5. **Pesticide paradox:** If the same tests are repeated over and over again, eventually the same set of test cases will no longer find any new defects.
6. **Testing is context dependent:** Testing is done differently in different contexts (e.g., safety-critical vs. e-commerce).
7. **Absence-of-errors fallacy:** Finding and fixing defects does not help if the system built is unusable and does not fulfill the users' needs.
      `
    },
    {
      id: 'g2',
      title: 'Test Types vs. Test Levels',
      topic: QuestionTopic.Lifecycle,
      content: `
**Test Levels:**
* *Component Testing:* Tests individual units/modules.
* *Integration Testing:* Tests interactions between components or systems.
* *System Testing:* Tests the integrated system against requirements.
* *Acceptance Testing:* Validation by the user/customer.

**Test Types:**
* *Functional:* What the system does.
* *Non-functional:* How the system works (Performance, Usability).
* *Structure-based (White-box):* Based on internal structure.
* *Change-related:* Regression testing and confirmation testing.
      `
    }
  ]
};