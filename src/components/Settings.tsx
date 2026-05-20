import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState(localStorage.getItem('diary_pin') || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSavePin = () => {
    if (pin.length !== 4 && pin.length !== 0) {
      return alert('비밀번호는 4자리 숫자로 입력해주세요.');
    }
    
    if (pin === '') {
      localStorage.removeItem('diary_pin');
    } else {
      localStorage.setItem('diary_pin', pin);
    }
    setIsEditing(false);
    alert('설정이 저장되었습니다.');
  };

  return (
    <div className="p-4">
      <header className="py-6 px-2 flex justify-between items-center">
        <h1 className="text-3xl font-bold font-serif text-cozy-text">설정</h1>
        <button onClick={() => navigate('/')} className="text-cozy-text/60">닫기</button>
      </header>

      <div className="space-y-6">
        <section className="cozy-card p-6">
          <h2 className="text-lg font-bold mb-4">보안 설정</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span>비밀번호 잠금</span>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-cozy-accent font-medium"
              >
                {pin ? '변경/해제' : '설정하기'}
              </button>
            </div>
            
            {isEditing && (
              <div className="pt-4 border-t border-cozy-warm/30 space-y-4">
                <p className="text-sm text-cozy-text/60">4자리 숫자를 입력하세요 (비우면 해제)</p>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-cozy-bg border border-cozy-warm rounded-xl px-4 py-3 text-center text-2xl tracking-[1em]"
                  placeholder="0000"
                />
                <button 
                  onClick={handleSavePin}
                  className="w-full cozy-button"
                >
                  비밀번호 저장
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="cozy-card p-6">
          <h2 className="text-lg font-bold mb-4">애플리케이션 정보</h2>
          <div className="space-y-2 text-sm text-cozy-text/60">
            <p>버전: 1.0.0</p>
            <p>따뜻하고 아늑한 나만의 비밀 일기장</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
