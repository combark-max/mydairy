import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const savedPin = localStorage.getItem('diary_pin');

  const handleKeypadClick = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        if (newPin === savedPin) {
          onUnlock();
        } else {
          setTimeout(() => {
            setPin('');
            alert('비밀번호가 일치하지 않습니다.');
          }, 100);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-cozy-bg z-50 flex flex-col items-center justify-center p-8">
      <header className="text-center mb-12">
        <h2 className="text-2xl font-serif font-bold text-cozy-text mb-2">비밀번호 입력</h2>
        <p className="text-cozy-text/40">소중한 기록을 보호하고 있습니다</p>
      </header>

      <div className="flex gap-4 mb-16">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full border-2 border-cozy-accent transition-all ${
              pin.length > i ? 'bg-cozy-accent' : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((key, i) => (
          <button
            key={i}
            onClick={() => {
              if (key === '⌫') setPin(pin.slice(0, -1));
              else if (key !== '') handleKeypadClick(key);
            }}
            disabled={key === ''}
            className={`h-16 w-16 rounded-full flex items-center justify-center text-xl font-medium transition-colors ${
              key === '' ? 'invisible' : 'bg-cozy-paper hover:bg-cozy-warm active:bg-cozy-accent active:text-white'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LockScreen;
