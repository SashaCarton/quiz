import React, { useEffect, useState } from "react";
import type { QuizSettings } from "../types";
import Loader from "./Loader";
import QuestionCard from "./QuestionCard";
import ErrorMessage from "./ErrorMessage";
import Timer from "./Timer";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: string;
  allAnswers?: string[];
}

interface QuizProps {
  settings: QuizSettings; 
  onComplete: (score: number) => void;
}

const QUESTION_TIME = 15;

const Quiz: React.FC<QuizProps> = ({ settings, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  useEffect(() => {
    let url = `https://opentdb.com/api.php?amount=${settings.amount}&difficulty=${settings.difficulty}&type=multiple`;
    
    if (settings.category) {
      url += `&category=${settings.category}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.results.length > 0) {
          const preparedQuestions = data.results.map((q: Question) => ({
            ...q,
            allAnswers: [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5)
          }));
          setQuestions(preparedQuestions);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des questions :", error);
        setLoading(false);
      });
  }, [settings]);

  useEffect(() => {
    if (loading || questions.length === 0) return;
    if (timeLeft === 0 || selectedAnswer !== null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, selectedAnswer, loading, questions.length]);

  useEffect(() => {
    if (loading || questions.length === 0) return;
    if (timeLeft === 0 && selectedAnswer === null) {
      setSelectedAnswer("timeout");
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setTimeLeft(QUESTION_TIME);
        } else {
          onComplete(score);
        }
      }, 1000);
    }
  }, [timeLeft, selectedAnswer, loading, questions.length, currentQuestionIndex, score, onComplete]);

  if (loading) {
    return <Loader />;
  }

  if (questions.length === 0) {
    return <ErrorMessage message="Aucune question disponible. Veuillez réessayer plus tard." />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correct_answer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setTimeLeft(QUESTION_TIME);
      } else {
        onComplete(isCorrect ? score + 1 : score);
      }
    }, 1000);
  };

  return (
    <div className="quiz-screen">
      <div className="quiz-header">
        <p>Question {currentQuestionIndex + 1} / {questions.length}</p>
        <p>Score: {score}</p>
      </div>

      <Timer timeLeft={timeLeft} />

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswerClick={handleAnswerClick}
      />
    </div>
  );
};

export default Quiz;