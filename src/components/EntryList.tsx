import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EntryList = () => {
  const entries = useLiveQuery(() => db.entries.orderBy('createdAt').reverse().toArray());
  const navigate = useNavigate();

  if (!entries) return <div className="p-8 text-center opacity-50">로딩 중...</div>;

  return (
    <div className="p-4 space-y-4">
      <header className="py-6 px-2">
        <h1 className="text-3xl font-bold font-serif text-cozy-text">오늘의 조각들</h1>
        <p className="text-cozy-text/60 mt-1">소중한 순간을 기록해보세요</p>
      </header>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-cozy-text/40">
          <p className="text-lg mb-2">작성된 일기가 없어요.</p>
          <p className="text-sm">첫 번째 이야기를 들려주세요.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {entries.map((entry) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={entry.id}
              onClick={() => navigate(`/edit/${entry.id}`)}
              className="cozy-card p-4 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-cozy-accent uppercase tracking-wider">
                  {new Date(entry.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short'
                  })}
                </span>
                <span className="text-xl">{entry.mood}</span>
              </div>
              <p className="text-cozy-text/80 line-clamp-3 leading-relaxed mb-3">
                {entry.content}
              </p>
              {entry.photo && (
                <div className="rounded-xl overflow-hidden h-32 w-full">
                  <img src={entry.photo} alt="Daily" className="w-full h-full object-cover" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntryList;
