// src/utils/indexedDB.js
import { openDB } from 'idb';

// Initialize IndexedDB and create object store if it doesn't exist
export const initDB = async () => {
  return openDB('dashboardLayoutDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('layouts')) {
        db.createObjectStore('layouts', { keyPath: 'id' });
      }
    },
  });
};

// Save layout order to IndexedDB
export const saveLayout = async (key, layout) => {
  const db = await initDB();
  await db.put('layouts', { id: key, layout });
};

// Get layout order from IndexedDB
export const getLayout = async (key) => {
  const db = await initDB();
  const entry = await db.get('layouts', key);
  return entry ? entry.layout : null;
};