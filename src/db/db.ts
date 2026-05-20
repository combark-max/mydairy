import Dexie, { type Table } from 'dexie';

export interface DiaryEntry {
  id?: number;
  date: string;
  content: string;
  mood: string;
  photo?: string; // Base64 string
  createdAt: number;
}

export class CozyDiaryDB extends Dexie {
  entries!: Table<DiaryEntry>;

  constructor() {
    super('CozyDiaryDB');
    this.version(1).stores({
      entries: '++id, date, mood, createdAt'
    });
  }
}

export const db = new CozyDiaryDB();
