import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Round2Data } from '../data/questions';
import { Bell } from 'lucide-react';

interface Round2Props {
  data: Round2Data;
  onComplete: (score: number) => void;
  onMCMessage: (msg: string) => void;
}

export default function Round2({ data, onComplete, onMCMessage }: Round2Props) {
  const [revealedRows, setRevealedRows] = useState<boolean[]>([false, false, false, false]);
  const [currentRow, setCurrentRow] = useState<number | null>(null);
  const [answerInput, setAnswerInput] = useState('');
  const [score, setScore] = useState(0);
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);
  const [showSecretInput, setShowSecretInput] = useState(false);
  const [secretInput, setSecretInput] = useState('');

  const handleRowSelect = (index: number) => {
    if (revealedRows[index] || isSecretRevealed) return;
    setCurrentRow(index);
    onMCMessage(`Hàng ngang số ${index + 1}: ${data.rows[index].question}`);
  };

  const handleRowAnswer = () => {
    if (currentRow === null) return;
    
    const correct = answerInput.toUpperCase().replace(/\s/g, '') === data.rows[currentRow].answer;
    
    if (correct) {
      const newRevealed = [...revealedRows];
      newRevealed[currentRow] = true;
      setRevealedRows(newRevealed);
      setScore(score + 10);
      onMCMessage(`Chính xác! Hàng ngang số ${currentRow + 1} là ${data.rows[currentRow].display}. Bạn được cộng 10 điểm.`);
    } else {
      onMCMessage(`Rất tiếc, câu trả lời chưa chính xác.`);
    }
    
    setCurrentRow(null);
    setAnswerInput('');
  };

  const handleSecretAnswer = () => {
    const correct = secretInput.toUpperCase().replace(/\s/g, '') === data.secretWord;
    
    if (correct) {
      setIsSecretRevealed(true);
      setRevealedRows([true, true, true, true]);
      const points = revealedRows.filter(r => !r).length * 10 + 40; // Bonus points
      setScore(score + points);
      onMCMessage(`XUẤT SẮC! Chướng ngại vật chính là ${data.secretWordDisplay}. Bạn nhận được ${points} điểm!`);
      setTimeout(() => onComplete(score + points), 4000);
    } else {
      onMCMessage(`Sai rồi! Bạn đã mất quyền tiếp tục vòng thi này.`);
      setTimeout(() => onComplete(score), 3000);
    }
    setShowSecretInput(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-900/90 p-6 md:p-8 rounded-2xl border border-blue-500/30 shadow-2xl backdrop-blur-md relative overflow-hidden">
      <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 uppercase tracking-wider">
          Vòng 2: Vượt chướng ngại vật
        </h2>
        
        <button 
          onClick={() => setShowSecretInput(true)}
          disabled={isSecretRevealed || showSecretInput}
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Bell className="w-5 h-5" />
          Trả lời CNV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Board */}
        <div className="flex flex-col gap-4 items-center justify-center bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          {data.rows.map((row, idx) => (
            <div key={idx} className="flex items-center gap-4 w-full max-w-md">
              <button 
                onClick={() => handleRowSelect(idx)}
                disabled={revealedRows[idx] || currentRow !== null || isSecretRevealed}
                className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shrink-0 transition-colors ${
                  revealedRows[idx] ? 'bg-green-500 text-white' : 
                  currentRow === idx ? 'bg-yellow-500 text-black animate-pulse' : 
                  'bg-slate-700 text-slate-300 hover:bg-blue-500 hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
              
              <div className="flex gap-1 flex-1 justify-center">
                {Array.from({ length: row.length }).map((_, charIdx) => (
                  <div 
                    key={charIdx} 
                    className={`w-8 h-10 md:w-10 md:h-12 border-2 flex items-center justify-center text-xl font-bold font-mono rounded-md shadow-inner transition-all duration-500 ${
                      revealedRows[idx] 
                        ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                        : 'bg-slate-900 border-slate-700 text-transparent'
                    }`}
                  >
                    {revealedRows[idx] ? row.display.replace(/\s/g, '')[charIdx] : ''}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Secret Word Display (Bottom) */}
          <div className="mt-8 pt-8 border-t border-slate-700 w-full flex flex-col items-center">
            <h3 className="text-slate-400 uppercase tracking-widest text-sm font-bold mb-4">Chướng ngại vật</h3>
            <div className="flex gap-1 flex-wrap justify-center">
              {Array.from({ length: data.secretWord.length }).map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-10 h-12 md:w-12 md:h-14 border-2 flex items-center justify-center text-2xl font-bold font-mono rounded-md shadow-inner transition-all duration-1000 ${
                    isSecretRevealed 
                      ? 'bg-yellow-500 border-yellow-300 text-black shadow-[0_0_20px_rgba(250,204,21,0.8)] scale-110' 
                      : 'bg-slate-900 border-slate-700 text-transparent'
                  }`}
                >
                  {isSecretRevealed ? data.secretWord[idx] : '?'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interaction Area */}
        <div className="flex flex-col justify-center">
          {showSecretInput ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/30 p-6 rounded-xl border border-red-500/50"
            >
              <h3 className="text-xl font-bold text-white mb-4">Nhập Chướng ngại vật:</h3>
              <input 
                type="text" 
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                className="w-full bg-slate-900 border-2 border-slate-600 rounded-lg p-4 text-white text-xl font-mono uppercase tracking-widest focus:border-red-500 focus:outline-none mb-4"
                placeholder="VD: NGHENGHIEP"
                autoFocus
              />
              <div className="flex gap-4">
                <button 
                  onClick={handleSecretAnswer}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg font-bold uppercase tracking-wider transition-colors"
                >
                  Trả lời
                </button>
                <button 
                  onClick={() => setShowSecretInput(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-bold uppercase tracking-wider transition-colors"
                >
                  Hủy
                </button>
              </div>
            </motion.div>
          ) : currentRow !== null ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-blue-900/30 p-6 rounded-xl border border-blue-500/50"
            >
              <h3 className="text-lg text-blue-300 font-bold mb-2 uppercase tracking-wider">Hàng ngang số {currentRow + 1}</h3>
              <p className="text-xl text-white mb-6 leading-relaxed">{data.rows[currentRow].question}</p>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRowAnswer()}
                  className="flex-1 bg-slate-900 border-2 border-slate-600 rounded-lg p-4 text-white text-xl font-mono uppercase focus:border-blue-500 focus:outline-none"
                  placeholder="Câu trả lời..."
                  autoFocus
                />
                <button 
                  onClick={handleRowAnswer}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-lg font-bold uppercase tracking-wider transition-colors"
                >
                  Gửi
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-lg italic text-center p-8 border-2 border-dashed border-slate-700 rounded-xl">
              {isSecretRevealed ? "Vòng thi đã kết thúc." : "Chọn một hàng ngang để mở câu hỏi."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
