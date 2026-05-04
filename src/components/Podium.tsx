import React from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';

interface PodiumProps {
  scores: number[];
  currentPlayer?: number;
}

export default function Podium({ scores, currentPlayer }: PodiumProps) {
  const names = ["Thí sinh 1 (Bạn)", "Thí sinh 2", "Thí sinh 3", "Thí sinh 4"];
  const colors = [
    "from-red-600 to-red-800",
    "from-blue-600 to-blue-800",
    "from-green-600 to-green-800",
    "from-yellow-600 to-yellow-800"
  ];

  return (
    <div className="flex justify-center gap-2 md:gap-4 mt-2 w-full max-w-4xl mx-auto px-2">
      {scores.map((score, index) => (
        <motion.div
          key={index}
          className={`relative flex flex-col items-center flex-1 transition-all duration-300 ${
            currentPlayer === index ? 'scale-105 z-10' : 'scale-100 opacity-80'
          }`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: currentPlayer === index ? 1 : 0.8 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Active indicator */}
          {currentPlayer === index && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute -top-4 w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,1)]"
            />
          )}

          {/* Avatar */}
          <div className="bg-slate-800 p-2 rounded-full border-2 border-slate-600 mb-[-1rem] z-10">
            <User className={`w-4 h-4 md:w-6 md:h-6 ${index === 0 ? 'text-yellow-400' : 'text-slate-400'}`} />
          </div>

          {/* Podium block */}
          <div className={`w-full bg-gradient-to-b ${colors[index]} rounded-t-lg border-t-2 border-l border-r border-white/20 shadow-xl overflow-hidden`}>
            <div className="bg-black/30 p-1 md:p-2 text-center border-b border-white/10">
              <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-wider block truncate">
                {names[index]}
              </span>
            </div>
            <div className="p-2 text-center bg-black/10">
              <span className="text-xl md:text-2xl font-mono font-bold text-white drop-shadow-md">
                {score}
              </span>
            </div>
            {/* Reflection effect */}
            <div className="h-4 md:h-6 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
