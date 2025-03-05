import SQLiteESMFactory from '@sqlite.org/sqlite-wasm';

export interface MediaMetadata {
  id?: number;
  filename: string;
  fileType: string;
  fileSize: number;
  duration?: number;
  width?: number;
  height?: number;
  codec?: string;
  bitrate?: number;
  quality?: string;
  hash: string;
  createdAt: string;
}

let db: any;

export async function initDB() {
  const sqlite3 = await SQLiteESMFactory({
    print: console.log,
    printErr: console.error,
  });

  db = new sqlite3.oo1.DB('/media.db');
  
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

export async function insertMediaMetadata(metadata: MediaMetadata) {
  const stmt = db.prepare(`
    INSERT INTO media_files (
      filename, fileType, fileSize, duration, width, height,
      codec, bitrate, quality, hash, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.bind([
    metadata.filename,
    metadata.fileType,
    metadata.fileSize,
    metadata.duration,
    metadata.width,
    metadata.height,
    metadata.codec,
    metadata.bitrate,
    metadata.quality,
    metadata.hash,
    metadata.createdAt
  ]);

  stmt.step();
  stmt.free();
}