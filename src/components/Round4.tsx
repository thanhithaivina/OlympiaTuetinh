import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Question } from '../data/questions';
import { Star } from 'lucide-react';

interface Round4Props {
  questions: Question[];
  onComplete: (score: number) => void;
  onMCMessage: (msg: string) => void;
}

export default function Round4({ questions, onComplete, onMCMessage }: Round4Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isFinished, setIsFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hopeStar, setHopeStar] = useState(false);
  const [hopeStarUsed, setHopeStarUsed] = useState(false);

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
    const pointsChange = hopeStar ? -(questions[currentQ].points || 20) : 0;
    setScore(score + pointsChange);
    onMCMessage(`Hết thời gian! Đáp án đúng là ${String.fromCharCode(65 + questions[currentQ].a)}.`);
    setTimeout(nextQuestion, 4000);
  };

  const handleAnswer = (index: number) => {
    if (answered || isFinished) return;
    
    setSelectedOption(index);
    setAnswered(true);
    
    const correct = index === questions[currentQ].a;
    const points = questions[currentQ].points || 20;
    let pointsChange = 0;
    
    if (correct) {
      pointsChange = hopeStar ? points * 2 : points;
      setScore(score + pointsChange);
      onMCMessage(`Chính xác! Bạn được cộng ${pointsChange} điểm.`);
    } else {
      pointsChange = hopeStar ? -points : 0;
      setScore(score + pointsChange);
      onMCMessage(`Rất tiếc, đáp án đúng là ${String.fromCharCode(65 + questions[currentQ].a)}.`);
    }
    
    setTimeout(nextQuestion, 4000);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setTimeLeft(15);
      setAnswered(false);
      setSelectedOption(null);
      setHopeStar(false);
      onMCMessage(`Câu hỏi số ${currentQ + 2} trị giá ${questions[currentQ + 1].points || 20} điểm. Bạn có muốn chọn Ngôi sao hy vọng không?`);
    } else {
      setIsFinished(true);
      onMCMessage(`Kết thúc vòng thi Về đích! Bạn đã hoàn thành xuất sắc phần thi của mình.`);
      setTimeout(() => onComplete(score), 4000);
    }
  };

  const toggleHopeStar = () => {
    if (!hopeStarUsed && !answered) {
      setHopeStar(true);
      setHopeStarUsed(true);
      onMCMessage(`Bạn đã chọn Ngôi sao hy vọng cho câu hỏi này!`);
    }
  };

  const question = questions[currentQ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/80 p-6 md:p-8 rounded-2xl border border-blue-500/30 shadow-2xl backdrop-blur-md relative overflow-hidden">
      <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 uppercase tracking-wider">
          Vòng 4: Về đích
        </h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleHopeStar}
            disabled={hopeStarUsed || answered}
            className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 transition-all ${
              hopeStar 
                ? 'bg-yellow-500 border-yellow-300 text-black shadow-[0_0_15px_rgba(250,204,21,0.8)]' 
                : hopeStarUsed 
                  ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/20'
            }`}
          >
            <Star className={`w-5 h-5 ${hopeStar ? 'fill-black' : ''}`} />
            <span className="font-bold uppercase tracking-wider text-sm">Ngôi sao hy vọng</span>
          </button>
          
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-600 flex flex-col items-center">
            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Thời gian</span>
            <span className={`text-2xl font-mono font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="bg-blue-950/50 p-6 rounded-xl border border-blue-800 mb-8 min-h-[120px] flex flex-col items-center justify-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider border-2 border-slate-900">
              {question.points || 20} Điểm
            </div>
            <p className="text-xl md:text-2xl text-white font-medium text-center leading-relaxed mt-4">
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
          <h3 className="text-3xl font-bold text-white mb-4">Hoàn thành Về đích!</h3>
          <p className="text-xl text-slate-300 mb-6">Bạn đã giành được</p>
          <div className="text-6xl font-mono font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
            {score}
          </div>
          <p className="text-slate-400 mt-4">điểm trong vòng này</p>
        </div>
      )}
    </div>
  );
}
