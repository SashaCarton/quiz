import React, { useState } from "react";
import type { QuizSettings } from "../types";

interface StartScreenProps {
  onStart: (settings: QuizSettings) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [settings, setSettings] = useState<QuizSettings>({
    difficulty: "easy",
    amount: 10,
    category: "general",
  });

  const handleStart = () => {
    onStart(settings);
  };

  return (
    <div className="start-screen">
      <h1>Bienvenue au Quiz</h1>
      
      <div className="settings-form">
        <label>
          Difficulté:
          <select 
            value={settings.difficulty} 
            onChange={(e) => setSettings({...settings, difficulty: e.target.value})}
          >
            <option value="easy">Facile</option>
            <option value="medium">Moyen</option>
            <option value="hard">Difficile</option>
          </select>
        </label>
        
        <label>
          Nombre de questions:
          <select 
            value={settings.amount}
            onChange={(e) => setSettings({...settings, amount: Number(e.target.value)})}
          >
            <option value="5">5 questions</option>
            <option value="10">10 questions</option>
            <option value="15">15 questions</option>
            <option value="20">20 questions</option>
          </select>
        </label>
      </div>
      
      <button className="start-button" onClick={handleStart}>
        Commencer le Quiz
      </button>
    </div>
  );
};

export default StartScreen;