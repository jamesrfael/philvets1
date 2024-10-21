// src/utils/indexedDB.js
import { openDB } from 'idb';

// Initialize IndexedDB and create object stores if they don't exist
export const initDB = async () => {
  return openDB('dashboardLayoutDB', 1, {
    upgrade(db) {
      // Create object store for layouts
      if (!db.objectStoreNames.contains('layouts')) {
        db.createObjectStore('layouts', { keyPath: 'id' });
      }

      // Create object store for company details
      if (!db.objectStoreNames.contains('companyDetails')) {
        db.createObjectStore('companyDetails', { keyPath: 'id' });
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

// Save company details to IndexedDB
export const saveCompanyDetails = async (details) => {
  const db = await initDB();
  await db.put('companyDetails', { id: 'companyInfo', ...details }); // Store with a fixed key
};

// Get company details from IndexedDB
export const getCompanyDetails = async () => {
  const db = await initDB();
  const entry = await db.get('companyDetails', 'companyInfo'); // Using fixed key
  return entry ? { name: entry.name, address: entry.address, contact: entry.contact } : null;
};
