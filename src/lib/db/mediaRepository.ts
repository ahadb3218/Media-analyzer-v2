import { getDB } from './sqlite';
import type { MediaMetadata } from '../types';

export async function insertMediaMetadata(metadata: MediaMetadata) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO media_files (
      filename, fileType, fileSize, duration, width, height,
      codec, bitrate, quality, hash, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  try {
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
  } finally {
    stmt.free();
  }
}