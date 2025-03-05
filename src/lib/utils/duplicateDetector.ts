import { MediaMetadata } from '../types';

interface DuplicateGroup {
  files: MediaMetadata[];
  similarity: number;
  reason: string[];
}

export function findDuplicates(files: MediaMetadata[]): DuplicateGroup[] {
  const duplicateGroups: DuplicateGroup[] = [];
  const processedHashes = new Set<string>();

  for (let i = 0; i < files.length; i++) {
    const file1 = files[i];
    
    if (processedHashes.has(file1.hash)) continue;
    
    const group: DuplicateGroup = {
      files: [file1],
      similarity: 100,
      reason: []
    };

    for (let j = i + 1; j < files.length; j++) {
      const file2 = files[j];
      
      // Check for exact matches in size and duration
      const isExactMatch = isExactDuplicate(file1, file2);
      
      if (isExactMatch) {
        group.files.push(file2);
        group.similarity = 100;
        group.reason = ['Exact match: identical file size and duration'];
        processedHashes.add(file2.hash);
      }
    }

    if (group.files.length > 1) {
      duplicateGroups.push(group);
    }
    processedHashes.add(file1.hash);
  }

  return duplicateGroups;
}

function isExactDuplicate(file1: MediaMetadata, file2: MediaMetadata): boolean {
  // Exact file size match is required
  if (file1.fileSize !== file2.fileSize) {
    return false;
  }

  // If both files have duration, they must match exactly
  if (file1.duration && file2.duration) {
    // Use a small epsilon for floating point comparison
    const epsilon = 0.1; // Allow 0.1 second difference due to potential rounding
    return Math.abs(file1.duration - file2.duration) < epsilon;
  }

  // If neither file has duration (e.g., images), match only on size
  if (!file1.duration && !file2.duration) {
    return true;
  }

  // If one has duration and the other doesn't, they're not duplicates
  return false;
}