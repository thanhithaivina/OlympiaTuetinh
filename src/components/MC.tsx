import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mic } from 'lucide-react';

interface MCProps {
  message: string;
  onComplete?: () => void;
  speed?: number;
}

export default function MC({ message, onComplete, speed = 30 }: MCProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(message.slice(0, i + 1));
      i++;
      if (i >= message.length) {
        clearInterval(interval);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [message, speed, onComplete]);

  return (
    <div className="bg-blue-900/80 border-2 border-yellow-400/50 rounded-xl p-3 md:p-4 shadow-2xl flex gap-3 md:gap-4 items-start max-w-4xl w-full mx-auto relative overflow-hidden backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
      
      <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700 p-2 md:p-3 rounded-full border-2 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]">
        <Mic className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </div>
      
      <div className="flex-1">
        <h3 className="text-yellow-400 font-bold text-xs md:text-sm uppercase tracking-wider mb-1">MC AI</h3>
        <p className="text-white text-base md:text-lg font-medium leading-relaxed">
          {displayedText}
          {isTyping && <span className="inline-block w-2 h-5 bg-yellow-400 ml-1 animate-pulse align-middle"></span>}
        </p>
      </div>
    </div>
  );
}
