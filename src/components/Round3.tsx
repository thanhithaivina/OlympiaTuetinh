import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Question } from '../data/questions';

interface Round3Props {
  questions: Question[];
  onComplete: (score: number) => void;
  onMCMessage: (msg: string) => void;
}

export default function Round3({ questions, onComplete, onMCMessage }: Round3Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished && !answered) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !isFinished && !answered) {
      handleTimeUp();
    }
  }, [timeLeft, isFinished, answered]);

  const handleTimeUp = () => {
    setAnswered(true);
    onMCMessage(`Hết thời gian! Đáp án đúng là ${String.fromCharCode(65 + questions[currentQ].a)}.`);
    setTimeout(nextQuestion, 3000);
  };

  const handleAnswer = (index: number) => {
    if (answered || isFinished) return;
    
    setSelectedOption(index);
    setAnswered(true);
    
    const correct = index === questions[currentQ].a;
    let pointsEarned = 0;
    
    if (correct) {
      if (timeLeft >= 20) pointsEarned = 40;
      else if (timeLeft >= 10) pointsEarned = 30;
      else if (timeLeft > 0) pointsEarned = 20;
      else pointsEarned = 10;
      
      setScore(score + pointsEarned);
      onMCMessage(`Chính xác! Bạn trả lời trong ${30 - timeLeft} giây, giành được ${pointsEarned} điểm.`);
    } else {
      onMCMessage(`Rất tiếc, đáp án đúng là ${String.fromCharCode(65 + questions[currentQ].a)}.`);
    }
    
    setTimeout(nextQuestion, 4000);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setTimeLeft(30);
      setAnswered(false);
      setSelectedOption(null);
      onMCMessage(`Câu hỏi số ${currentQ + 2}. 30 giây bắt đầu!`);
    } else {
      setIsFinished(true);
      onMCMessage(`Kết thúc vòng thi Tăng tốc! Bạn đã giành được tổng cộng ${score} điểm trong vòng này.`);
      setTimeout(() => onComplete(score), 4000);
    }
  };

  const question = questions[currentQ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/80 p-6 md:p-8 rounded-2xl border border-blue-500/30 shadow-2xl backdrop-blur-md relative overflow-hidden">
      <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 uppercase tracking-wider">
          Vòng 3: Tăng tốc
        </h2>
        <div className="flex items-center gap-4">
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-600 flex flex-col items-center">
            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Thời gian</span>
            <span className={`text-2xl font-mono font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-600 flex flex-col items-center">
            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Câu hỏi</span>
            <span className="text-2xl font-mono font-bold text-white">
              {currentQ + 1}/4
            </span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <div className="bg-blue-950/50 p-6 rounded-xl border border-blue-800 mb-8 min-h-[120px] flex items-center justify-center">
            <p className="text-xl md:text-2xl text-white font-medium text-center leading-relaxed">
              {question.q}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((opt, idx) => {
              const isCorrect = idx === question.a;
              const isSelected = idx === selectedOption;
              
              let btnClass = "bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500";
              
              if (answered) {
                if (isCorrect) {
                  btnClass = "bg-green-600 border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]";
                } else if (isSelected) {
                  btnClass = "bg-red-600 border-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]";
                } else {
                  btnClass = "bg-slate-800 border-slate-700 text-slate-500 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={answered}
                  className={`relative text-left p-4 rounded-xl border-2 transition-all duration-300 ${btnClass}`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold font-mono ${
                      answered && isCorrect ? 'bg-green-500 text-white' : 
                      answered && isSelected ? 'bg-red-500 text-white' : 
                      'bg-slate-700 text-white'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-medium text-lg">
                      {opt}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-12 relative z-10">
          <h3 className="text-3xl font-bold text-white mb-4">Hoàn thành Tăng tốc!</h3>
          <p className="text-xl text-slate-300 mb-6">Bạn đã giành được</p>
          <div className="text-6xl font-mono font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
            {score}
          </div>
          <p className="text-slate-400 mt-4">điểm</p>
        </div>
      )}
    </div>
  );
}
