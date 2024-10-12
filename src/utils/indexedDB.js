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
export const saveLayout = async (type, key, layout) => {
  const db = await initDB();
  // Prefix the key with the type (e.g., 'admin_' or 'superadmin_')
  const prefixedKey = `${type}_${key}`;
  await db.put('layouts', { id: prefixedKey, layout });
};

// Get layout order from IndexedDB
export const getLayout = async (type, key) => {
  const db = await initDB();
  // Prefix the key with the type (e.g., 'admin_' or 'superadmin_')
  const prefixedKey = `${type}_${key}`;
  const entry = await db.get('layouts', prefixedKey);
  return entry ? entry.layout : null;
};
