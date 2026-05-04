import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Question } from '../data/questions';

interface Round1Props {
  questions: Question[];
  onComplete: (score: number) => void;
}

export default function Round1({ questions, onComplete }: Round1Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !isFinished) {
      handleFinish();
    }
  }, [timeLeft, isFinished]);

  const handleFinish = () => {
    setIsFinished(true);
    setTimeout(() => onComplete(score), 2000);
  };

  const handleAnswer = (index: number) => {
    if (isFinished) return;
    
    const correct = index === questions[currentQ].a;
    if (correct) {
      setScore(score + 10);
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      handleFinish();
    }
  };

  const question = questions[currentQ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/80 p-6 md:p-8 rounded-2xl border border-blue-500/30 shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 uppercase tracking-wider">
          Vòng 1: Khởi động
        </h2>
        <div className="flex items-center gap-4">
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-600 flex flex-col items-center">
            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Thời gian</span>
            <span className={`text-2xl font-mono font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-600 flex flex-col items-center">
            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Câu hỏi</span>
            <span className="text-2xl font-mono font-bold text-white">
              {currentQ + 1}/5
            </span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="relative z-10"
        >
          <div className="bg-blue-950/50 p-6 rounded-xl border border-blue-800 mb-8 min-h-[120px] flex items-center justify-center">
            <p className="text-xl md:text-2xl text-white font-medium text-center leading-relaxed">
              {question.q}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="group relative bg-slate-800 hover:bg-blue-600 text-left p-4 rounded-xl border border-slate-600 hover:border-blue-400 transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 group-hover:bg-blue-500 text-white font-bold font-mono">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-slate-200 group-hover:text-white font-medium text-lg">
                    {opt}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 relative z-10"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Hoàn thành Khởi động!</h3>
          <p className="text-xl text-slate-300 mb-6">Bạn đã giành được</p>
          <div className="text-6xl font-mono font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
            {score}
          </div>
          <p className="text-slate-400 mt-4">điểm</p>
        </motion.div>
      )}
    </div>
  );
}
