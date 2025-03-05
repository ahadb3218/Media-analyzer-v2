import SQLiteESMFactory from '@sqlite.org/sqlite-wasm';

let db: any = null;

export async function initSQLite() {
  try {
    const sqlite3 = await SQLiteESMFactory({
      print: console.log,
      printErr: console.error,
      locateFile: (file: string) => {
        // Ensure correct MIME type for WASM files
        return `/node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/${file}`;
      }
    });

    db = new sqlite3.oo1.DB('/media.db', 'ct');
    await createTables();
    return db;
  } catch (error) {
    console.error('Failed to initialize SQLite:', error);
    throw error;
  }
}

export function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call initSQLite first.');
  }
  return db;
}

async function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS media_files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      fileType TEXT NOT NULL,
      fileSize INTEGER NOT NULL,
      duration INTEGER,
      width INTEGER,
      height INTEGER,
      codec TEXT,
      bitrate INTEGER,
      quality TEXT,
      hash TEXT NOT NULL UNIQUE,
      createdAt TEXT NOT NULL
    );
  `);
}