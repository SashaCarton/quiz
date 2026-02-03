import React, { useState, useEffect } from "react";
import type { QuizSettings, Category } from "../types";

interface StartScreenProps {
  onStart: (settings: QuizSettings) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [settings, setSettings] = useState<QuizSettings>({
    difficulty: "easy",
    amount: 10,
    category: "",
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => {
        setCategories(data.trivia_categories.map((cat: any) => ({
          id: cat.id.toString(),
          theme: cat.name
        })));
        setLoadingCategories(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des catégories:", error);
        setLoadingCategories(false);
      });
  }, []);

  const handleStart = () => {
    onStart(settings);
  };

  return (
    <div className="start-screen">
      <h1>Bienvenue au Quiz</h1>
      
      <div className="settings-form">
        <label>
          Catégorie:
          <select 
            value={settings.category} 
            onChange={(e) => setSettings({...settings, category: e.target.value})}
            disabled={loadingCategories}
          >
            <option value="">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.theme}
              </option>
            ))}
          </select>
        </label>
        
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