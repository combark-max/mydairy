import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../db/db';
import { motion } from 'framer-motion';

const MOODS = ['😊', '🥰', '😐', '😢', '😡'];

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('😊');
  const [photo, setPhoto] = useState<string | undefined>();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (id) {
      db.entries.get(Number(id)).then((entry) => {
        if (entry) {
          setContent(entry.content);
          setMood(entry.mood);
          setPhoto(entry.photo);
          setDate(entry.date);
        }
      });
    }
  }, [id]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) return alert('내용을 입력해주세요.');

    const entryData = {
      date,
      content,
      mood,
      photo,
      createdAt: id ? undefined : Date.now(),
    };

    if (id) {
      await db.entries.update(Number(id), entryData);
    } else {
      await db.entries.add(entryData as any);
    }
    navigate('/');
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await db.entries.delete(Number(id));
      navigate('/');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 flex flex-col min-h-screen"
    >
      <header className="flex justify-between items-center py-4 mb-4">
        <button onClick={() => navigate('/')} className="text-cozy-text/60">취소</button>
        <div className="flex gap-2">
          {id && (
            <button onClick={handleDelete} className="text-red-400 px-3">삭제</button>
          )}
          <button onClick={handleSave} className="cozy-button">저장</button>
        </div>
      </header>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-transparent border-none text-xl font-bold text-cozy-accent mb-6 focus:ring-0"
      />

      <div className="flex justify-around mb-8 p-3 bg-cozy-paper rounded-2xl border border-cozy-warm/30">
        {MOODS.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`text-2xl p-2 rounded-xl transition-all ${mood === m ? 'bg-cozy-warm scale-125' : 'opacity-40 grayscale'}`}
          >
            {m}
          </button>
        ))}
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="어떤 하루였나요?"
        className="flex-grow bg-transparent border-none resize-none focus:ring-0 text-lg leading-relaxed placeholder:text-cozy-text/20"
      />

      <div className="mt-4">
        <label className="block w-full cursor-pointer">
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          {photo ? (
            <div className="relative rounded-2xl overflow-hidden group">
              <img src={photo} alt="Preview" className="w-full max-h-60 object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">사진 변경</span>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-cozy-warm rounded-2xl p-8 text-center text-cozy-text/40 hover:bg-cozy-warm/20 transition-colors">
              <p>📷 사진을 추가해보세요</p>
            </div>
          )}
        </label>
      </div>
    </motion.div>
  );
};

export default Editor;
