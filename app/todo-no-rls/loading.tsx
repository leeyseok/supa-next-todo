// app/todos/loading.tsx
"use client"
import React, { useState } from 'react';

const Loading = () => {
  const [score, setScore] = useState(0);

  const handleButtonClick = () => {
    setScore(score + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl mb-4">Loading, please wait...</div>
      <div className="text-xl mb-4">Click the button to pass the time!</div>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleButtonClick}
      >
        Click me!
      </button>
      <div className="mt-4 text-xl">Score: {score}</div>
    </div>
  );
};

export default Loading;
