import { useState } from 'react'
import './App.css'
import StartScreen from './components/StartScreen'
import Quiz from './components/Quiz'
import ResultScreen from './components/ResultScreen'
import type { QuizSettings } from './types'

type AppState = 'start' | 'playing' | 'gameover'


function App() {
  const [currentState, setCurrentState] = useState<AppState>('start')
  const [score, setScore] = useState(0)
  const [quizSettings, setQuizSettings] = useState<QuizSettings | null>(null)

  const startGame = (settings: QuizSettings) => {
    setQuizSettings(settings)
    setScore(0)
    setCurrentState('playing')
  }

  const endGame = (finalScore: number) => {
    setScore(finalScore)
    setCurrentState('gameover')
  }

  const resetGame = () => {
    setScore(0)
    setCurrentState('start')
  }

  return (
    <>
      {currentState === 'start' && (
        <StartScreen onStart={startGame} />
        )}

      {currentState === 'playing' && quizSettings && (
        <Quiz 
          settings={quizSettings} 
          onComplete={endGame} 
        />
        )}

      {currentState === 'gameover' && (
      <ResultScreen score={score} totalQuestions={quizSettings?.amount || 0} onRestart={resetGame} />
      )}

    </>
  )
}

export default App
