import React from "react";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const getTimerClass = () => {
    if (timeLeft <= 5) return 'timer danger';
    if (timeLeft <= 10) return 'timer warning';
    return 'timer';
  };

  return (
    <div className={getTimerClass()}>
      <p>Temps restant: {timeLeft}s</p>
    </div>
  );
};

export default Timer;