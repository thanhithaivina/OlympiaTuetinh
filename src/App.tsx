import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MC from './components/MC';
import Podium from './components/Podium';
import Round1 from './components/Round1';
import Round2 from './components/Round2';
import Round3 from './components/Round3';
import Round4 from './components/Round4';
import { Play, Trophy, ArrowRight } from 'lucide-react';
import { getGameSession } from './data/questions';

type GamePhase = 'intro' | 'round1' | 'round2' | 'round3' | 'round4' | 'outro';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0]);
  const [mcMessage, setMcMessage] = useState<string>('');
  const [currentPlayer, setCurrentPlayer] = useState<number | undefined>(undefined);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [gameData, setGameData] = useState<any>(null);

  useEffect(() => {
    if (phase === 'intro') {
      setGameData(getGameSession());
      setMcMessage("Chào mừng quý vị và các bạn đến với chương trình Đường lên đỉnh Olympia - Bản lĩnh nghề nghiệp! Hôm nay chúng ta có 4 thí sinh xuất sắc. Hãy cùng bắt đầu với Vòng 1: Khởi động!");
      setShowNextButton(true);
    }
  }, [phase]);

  const handleNextPhase = () => {
    setShowNextButton(false);
    if (phase === 'intro') {
      setPhase('round1');
      setCurrentPlayer(0);
      setMcMessage("Vòng 1: Khởi động! Thí sinh 1, bạn có 60 giây để trả lời 5 câu hỏi. Chúc bạn may mắn!");
    } else if (phase === 'round1') {
      setPhase('round2');
      setCurrentPlayer(undefined);
      setMcMessage("Vòng 2: Vượt chướng ngại vật! Chúng ta có một ô chữ gồm nhiều chữ cái. Hãy chọn hàng ngang để tìm ra từ khóa bí mật.");
    } else if (phase === 'round2') {
      setPhase('round3');
      setCurrentPlayer(undefined);
      setMcMessage("Vòng 3: Tăng tốc! 4 câu hỏi đang chờ đón các bạn. Hãy trả lời thật nhanh và chính xác để giành điểm cao nhất!");
    } else if (phase === 'round3') {
      setPhase('round4');
      setCurrentPlayer(0);
      setMcMessage("Vòng 4: Về đích! Thí sinh 1, bạn sẽ trả lời gói 3 câu hỏi 20 điểm. Hãy tận dụng Ngôi sao hy vọng nhé!");
    } else if (phase === 'round4') {
      setPhase('outro');
      setCurrentPlayer(undefined);
      
      const maxScore = Math.max(...scores);
      const winnerIndex = scores.indexOf(maxScore);
      const winnerName = winnerIndex === 0 ? "Thí sinh 1 (Bạn)" : `Thí sinh ${winnerIndex + 1}`;
      
      setMcMessage(`Chúc mừng ${winnerName} đã giành vòng nguyệt quế với ${maxScore} điểm! Những kiến thức hôm nay sẽ là hành trang quan trọng cho việc chọn nghề, chọn trường của các bạn học sinh lớp 12. Cảm ơn quý vị đã theo dõi!`);
    }
  };

  const simulateBots = async (roundScore: number, roundIndex: number) => {
    setIsSimulating(true);
    setMcMessage("Đang tổng hợp điểm số của các thí sinh khác...");
    
    // Simulate bot scores based on round
    const newScores = [...scores];
    newScores[0] += roundScore;
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add random points to bots
    for (let i = 1; i < 4; i++) {
      let botPoints = 0;
      if (roundIndex === 1) botPoints = Math.floor(Math.random() * 4) * 10; // 0-30
      if (roundIndex === 2) botPoints = Math.floor(Math.random() * 3) * 10; // 0-20
      if (roundIndex === 3) botPoints = Math.floor(Math.random() * 4) * 20; // 0-60
      if (roundIndex === 4) botPoints = Math.floor(Math.random() * 3) * 20; // 0-40
      newScores[i] += botPoints;
    }
    
    setScores(newScores);
    setIsSimulating(false);
    setMcMessage(`Điểm số hiện tại: Bạn (${newScores[0]}), TS2 (${newScores[1]}), TS3 (${newScores[2]}), TS4 (${newScores[3]}). Sẵn sàng cho vòng tiếp theo!`);
    setShowNextButton(true);
  };

  const handleRound1Complete = (score: number) => {
    simulateBots(score, 1);
  };

  const handleRound2Complete = (score: number) => {
    simulateBots(score, 2);
  };

  const handleRound3Complete = (score: number) => {
    simulateBots(score, 3);
  };

  const handleRound4Complete = (score: number) => {
    simulateBots(score, 4);
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-slate-200 font-sans overflow-x-hidden relative flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]"></div>
        <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] rounded-full bg-yellow-900/10 blur-[80px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Header / MC Area */}
      <div className="relative z-20 pt-8 pb-4 px-4 w-full flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 uppercase tracking-widest mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-center">
          Đường lên đỉnh Olympia
          <span className="block text-xl md:text-2xl mt-2 text-cyan-300 tracking-widest">Bản lĩnh nghề nghiệp</span>
        </h1>
        
        <MC message={mcMessage} />
        
        <AnimatePresence>
          {showNextButton && !isSimulating && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={handleNextPhase}
              className="mt-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.4)] flex items-center gap-2 transition-all transform hover:scale-105 uppercase tracking-wider"
            >
              {phase === 'intro' ? (
                <><Play className="w-5 h-5 fill-black" /> Bắt đầu ngay</>
              ) : phase === 'round4' ? (
                <><Trophy className="w-5 h-5" /> Xem kết quả</>
              ) : (
                <>Vòng tiếp theo <ArrowRight className="w-5 h-5" /></>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Main Game Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 w-full">
        <AnimatePresence mode="wait">
          {phase === 'round1' && !showNextButton && !isSimulating && gameData && (
            <motion.div key="r1" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full">
              <Round1 questions={gameData.round1} onComplete={handleRound1Complete} />
            </motion.div>
          )}
          
          {phase === 'round2' && !showNextButton && !isSimulating && gameData && (
            <motion.div key="r2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full">
              <Round2 data={gameData.round2} onComplete={handleRound2Complete} onMCMessage={setMcMessage} />
            </motion.div>
          )}
          
          {phase === 'round3' && !showNextButton && !isSimulating && gameData && (
            <motion.div key="r3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full">
              <Round3 questions={gameData.round3} onComplete={handleRound3Complete} onMCMessage={setMcMessage} />
            </motion.div>
          )}
          
          {phase === 'round4' && !showNextButton && !isSimulating && gameData && (
            <motion.div key="r4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full">
              <Round4 questions={gameData.round4} onComplete={handleRound4Complete} onMCMessage={setMcMessage} />
            </motion.div>
          )}

          {phase === 'outro' && (
            <motion.div key="outro" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]" />
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-widest">
                Người chiến thắng
              </h2>
              <div className="text-5xl md:text-7xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-lg">
                {Math.max(...scores)} ĐIỂM
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all uppercase tracking-wider"
              >
                Chơi lại
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Podiums */}
      <div className="relative z-20 mt-auto pb-0 w-full">
        <Podium scores={scores} currentPlayer={currentPlayer} />
      </div>
    </div>
  );
}

