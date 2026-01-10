import React from "react";

interface Question {
  question: string;
  correct_answer: string;
  allAnswers?: string[];
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerClick: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerClick,
}) => {
  return (
    <div className="question-card">
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />

      <div className="answers-list">
        {question.allAnswers?.map((answer, index) => (
          <button
            key={index}
            className={`answer-button ${
              selectedAnswer === answer
                ? answer === question.correct_answer
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
            onClick={() => onAnswerClick(answer)}
            disabled={selectedAnswer !== null}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
