import React from "react";

interface ResultScreenProps {
  score: number;
  totalQuestions: number; 
  onRestart: () => void;
}
const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart }) => {
    const getFeedbackMessage = () => {
        const percentage = (score / totalQuestions) * 100;
        if (percentage >= 80) {
            return "Excellent !";
        } else if (percentage >= 50) {
            return "Bien joué !";
        } else {
            return "Vous pouvez mieux faire !";
        }
    };

    return (
        <div className="result-screen">
            <h1>Quiz Terminé!</h1>
            <p>Votre score: {score} / {totalQuestions}</p>
            <p>{getFeedbackMessage()}</p>

            <button className="restart-button" onClick={onRestart}>
                Recommencer le Quiz
            </button>
        </div>
    );
};

export default ResultScreen;