import type { MediaMetadata } from '../types/types';

export interface QualityGroup {
  name: string;
  resolution: string;
  minHeight: number;
  maxHeight: number;
  priority: number;
  score: number; // Base score for this resolution
}

const QUALITY_GROUPS: QualityGroup[] = [
  {
    name: '8K UHD',
    resolution: '4320p',
    minHeight: 4320,
    maxHeight: Infinity,
    priority: 1,
    score: 100
  },
  {
    name: '4K UHD',
    resolution: '2160p',
    minHeight: 2160,
    maxHeight: 4319,
    priority: 2,
    score: 90
  },
  {
    name: 'QHD',
    resolution: '1440p',
    minHeight: 1440,
    maxHeight: 2159,
    priority: 3,
    score: 80
  },
  {
    name: 'Full HD',
    resolution: '1080p',
    minHeight: 1080,
    maxHeight: 1439,
    priority: 4,
    score: 70
  },
  {
    name: 'HD',
    resolution: '720p',
    minHeight: 720,
    maxHeight: 1079,
    priority: 5,
    score: 60
  },
  {
    name: 'SD',
    resolution: '480p',
    minHeight: 0,
    maxHeight: 719,
    priority: 6,
    score: 50
  }
];

// Advanced format support scoring
const FORMAT_SCORES = {
  codec: {
    'av1': { score: 100, supports: ['4320p', '2160p', '1440p'] },
    'hevc': { score: 90, supports: ['4320p', '2160p', '1440p'] },
    'vp9': { score: 85, supports: ['2160p', '1440p'] },
    'h.265': { score: 90, supports: ['4320p', '2160p', '1440p'] },
    'h.264': { score: 70, supports: ['2160p', '1440p'] },
    'vp8': { score: 60, supports: ['1440p'] }
  },
  container: {
    'webm': { score: 90, supports: ['4320p', '2160p', '1440p'] },
    'mp4': { score: 85, supports: ['4320p', '2160p', '1440p'] },
    'mov': { score: 80, supports: ['2160p', '1440p'] }
  }
};

export function getQualityScore(file: MediaMetadata): number {
  if (file.fileType.startsWith('video/')) {
    return calculateVideoQuality(file);
  } else if (file.fileType.startsWith('image/')) {
    return calculateImageQuality(file);
  }
  return 0;
}

function calculateVideoQuality(file: MediaMetadata): number {
  let score = 0;
  let maxPossibleScore = 0;
  
  // Resolution score (max 100 points)
  if (file.height) {
    const qualityGroup = getQualityGroup(file.height);
    score += qualityGroup.score;
    maxPossibleScore += 100;
  }
  
  // Format compatibility score (max 100 points)
  if (file.codec) {
    const formatScore = calculateFormatScore(file);
    score += formatScore;
    maxPossibleScore += 100;
  }
  
  // Bitrate score (max 100 points)
  if (file.bitrate && file.height) {
    const bitrateScore = calculateBitrateScore(file.bitrate, file.height);
    score += bitrateScore;
    maxPossibleScore += 100;
  }
  
  // Normalize score to 100-point scale
  return maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
}

function calculateFormatScore(file: MediaMetadata): number {
  let score = 0;
  
  // Codec scoring
  if (file.codec) {
    const lowerCodec = file.codec.toLowerCase();
    for (const [codec, details] of Object.entries(FORMAT_SCORES.codec)) {
      if (lowerCodec.includes(codec)) {
        score += details.score;
        
        // Bonus for supporting high resolutions
        if (file.height) {
          const resolution = getQualityGroup(file.height).resolution;
          if (details.supports.includes(resolution)) {
            score += 20; // Bonus for native resolution support
          }
        }
        break;
      }
    }
  }
  
  // Container format scoring
  if (file.container) {
    const lowerContainer = file.container.toLowerCase();
    for (const [container, details] of Object.entries(FORMAT_SCORES.container)) {
      if (lowerContainer.includes(container)) {
        score += details.score;
        
        // Bonus for supporting high resolutions
        if (file.height) {
          const resolution = getQualityGroup(file.height).resolution;
          if (details.supports.includes(resolution)) {
            score += 10; // Bonus for container format support
          }
        }
        break;
      }
    }
  }
  
  // Normalize score to 100
  return Math.min(100, score);
}

function calculateBitrateScore(bitrate: number, height: number): number {
  const mbps = bitrate / 1000000;
  const qualityGroup = getQualityGroup(height);
  const expectedBitrate = getExpectedBitrate(height);
  
  // Calculate score based on how close the bitrate is to the expected value
  const ratio = mbps / expectedBitrate;
  
  if (ratio >= 1.2) {
    return 100; // Exceeds recommended bitrate
  } else if (ratio >= 1.0) {
    return 90; // Meets recommended bitrate
  } else if (ratio >= 0.8) {
    return 80; // Slightly below recommended
  } else if (ratio >= 0.6) {
    return 60; // Significantly below recommended
  } else {
    return 40; // Far below recommended
  }
}

function getExpectedBitrate(height: number): number {
  const qualityGroup = getQualityGroup(height);
  switch (qualityGroup.resolution) {
    case '4320p': return 120; // 8K
    case '2160p': return 60;  // 4K
    case '1440p': return 30;  // 2K
    case '1080p': return 15;  // Full HD
    case '720p': return 8;    // HD
    default: return 4;        // SD
  }
}

function calculateImageQuality(file: MediaMetadata): number {
  let score = 0;
  let maxPossibleScore = 0;
  
  // Resolution score (max 100 points)
  if (file.width && file.height) {
    const megapixels = (file.width * file.height) / 1000000;
    maxPossibleScore += 100;
    
    if (megapixels >= 33.2) { // 8K equivalent
      score += 100;
    } else if (megapixels >= 8.3) { // 4K equivalent
      score += 90;
    } else if (megapixels >= 3.7) { // 2K equivalent
      score += 80;
    } else if (megapixels >= 2.1) { // Full HD equivalent
      score += 70;
    } else if (megapixels >= 0.9) { // HD equivalent
      score += 60;
    } else {
      score += 50;
    }
  }
  
  // File size efficiency score (max 100 points)
  if (file.width && file.height) {
    maxPossibleScore += 100;
    const megapixels = (file.width * file.height) / 1000000;
    const expectedSize = megapixels * 0.5; // 0.5MB per megapixel as baseline
    const actualSize = file.fileSize / 1000000;
    const ratio = expectedSize / actualSize;
    
    if (ratio >= 1.2) {
      score += 100;
    } else if (ratio >= 1.0) {
      score += 90;
    } else if (ratio >= 0.8) {
      score += 80;
    } else if (ratio >= 0.6) {
      score += 70;
    } else {
      score += 60;
    }
  }
  
  // Normalize score to 100-point scale
  return maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
}

export function getQualityGroup(height: number): QualityGroup {
  return QUALITY_GROUPS.find(group => 
    height >= group.minHeight && height <= group.maxHeight
  ) || QUALITY_GROUPS[QUALITY_GROUPS.length - 1]; // Default to SD if no match
}

export function determineVideoQuality(width: number, height: number): string {
  const group = getQualityGroup(height);
  return `${group.name} (${group.resolution})`;
}

export function determineImageQuality(width: number, height: number): string {
  const megapixels = (width * height) / 1000000;
  if (megapixels >= 33.2) return '8K Quality';
  if (megapixels >= 8.3) return '4K Quality';
  if (megapixels >= 3.7) return '2K Quality';
  if (megapixels >= 2.1) return 'Full HD Quality';
  if (megapixels >= 0.9) return 'HD Quality';
  return 'SD Quality';
}

export function sortByQualityPriority(files: MediaMetadata[]): MediaMetadata[] {
  return [...files].sort((a, b) => {
    if (!a.height || !b.height) return 0;
    const groupA = getQualityGroup(a.height);
    const groupB = getQualityGroup(b.height);
    return groupA.priority - groupB.priority;
  });
}