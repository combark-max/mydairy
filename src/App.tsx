import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import EntryList from './components/EntryList';
import Editor from './components/Editor';
import LockScreen from './components/LockScreen';
import Settings from './components/Settings';

const AppContent = () => {
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const pin = localStorage.getItem('diary_pin');
    if (pin) {
      setIsLocked(true);
    }
  }, []);

  if (isLocked) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cozy-bg pb-20">
      <Routes>
        <Route path="/" element={<EntryList />} />
        <Route path="/write" element={<Editor />} />
        <Route path="/edit/:id" element={<Editor />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-cozy-paper/80 backdrop-blur-md border-t border-cozy-warm/30 h-16 flex items-center justify-around px-6">
        <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 text-cozy-text/60 hover:text-cozy-accent">
          <span className="text-xs">목록</span>
        </button>
        <button onClick={() => navigate('/write')} className="bg-cozy-accent text-white p-3 rounded-full -mt-10 shadow-lg active:scale-90 transition-transform">
          <span className="font-bold text-xl">+</span>
        </button>
        <button onClick={() => navigate('/settings')} className="flex flex-col items-center gap-1 text-cozy-text/60 hover:text-cozy-accent">
          <span className="text-xs">설정</span>
        </button>
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
