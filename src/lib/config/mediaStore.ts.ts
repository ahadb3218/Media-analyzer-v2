import type { MediaMetadata } from '../types/types';

export async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MediaAnalyzerDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('media_files')) {
        db.createObjectStore('media_files', { keyPath: 'hash' });
      }
    };
  });
}

export async function insertMediaMetadata(metadata: MediaMetadata): Promise<void> {
  const db = await initDB() as IDBDatabase;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['media_files'], 'readwrite');
    const store = transaction.objectStore('media_files');
    const request = store.put(metadata);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function getAllMediaFiles(): Promise<MediaMetadata[]> {
  const db = await initDB() as IDBDatabase;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['media_files'], 'readonly');
    const store = transaction.objectStore('media_files');
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function removeMediaFile(hash: string): Promise<void> {
  const db = await initDB() as IDBDatabase;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['media_files'], 'readwrite');
    const store = transaction.objectStore('media_files');
    const request = store.delete(hash);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}