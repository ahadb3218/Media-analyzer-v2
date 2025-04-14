import { MediaMetadata } from '../types/types';
import { VIDEO_STANDARDS, type VideoStandard } from './videoStandards';

export interface ConversionRecommendation {
  type: 'resolution' | 'codec' | 'bitrate' | 'format' | 'standard';
  priority: 'high' | 'medium' | 'low';
  current: string;
  recommended: string;
  reason: string;
  improvement: string;
  options?: ConversionOptions;
}

export interface ConversionOptions {
  standards?: VideoStandard[];
  settings?: {
    resolution?: string[];
    codec?: string[];
    bitrate?: number[];
    frameRate?: number[];
    audioCodec?: string[];
    audioBitrate?: number[];
    container?: string[];
  };
}

export function analyzeForConversion(file: MediaMetadata): ConversionRecommendation[] {
  const recommendations: ConversionRecommendation[] = [];

  if (file.fileType.startsWith('video/')) {
    // Find suitable video standards
    const suitableStandards = findSuitableStandards(file);
    if (suitableStandards.length > 0) {
      recommendations.push({
        type: 'standard',
        priority: 'medium',
        current: 'Custom Format',
        recommended: suitableStandards[0].name,
        reason: 'Non-standard video format',
        improvement: 'Convert to industry-standard format for better compatibility',
        options: {
          standards: suitableStandards,
          settings: {
            resolution: suitableStandards.map(s => `${s.resolution.width}x${s.resolution.height}`),
            codec: Array.from(new Set(suitableStandards.flatMap(s => s.codec))),
            bitrate: suitableStandards.map(s => s.bitrate.recommended),
            frameRate: Array.from(new Set(suitableStandards.flatMap(s => s.frameRate))),
            audioCodec: Array.from(new Set(suitableStandards.flatMap(s => s.audioCodec))),
            audioBitrate: Array.from(new Set(suitableStandards.map(s => s.audioBitrate))),
            container: Array.from(new Set(suitableStandards.flatMap(s => s.container)))
          }
        }
      });
    }

    // Resolution analysis
    if (file.width && file.height) {
      const resolution = file.height;
      const resolutionOptions = getResolutionOptions(resolution);
      if (resolutionOptions.length > 0) {
        recommendations.push({
          type: 'resolution',
          priority: resolution < 720 ? 'high' : 'medium',
          current: `${file.width}x${file.height}`,
          recommended: resolutionOptions[0],
          reason: resolution < 720 ? 'Low resolution video' : 'Non-standard resolution',
          improvement: 'Convert to standard resolution for better compatibility',
          options: {
            settings: {
              resolution: resolutionOptions
            }
          }
        });
      }
    }

    // Codec analysis with multiple options
    if (file.codec) {
      const codecOptions = getCodecOptions(file.codec);
      if (codecOptions.length > 0) {
        recommendations.push({
          type: 'codec',
          priority: 'medium',
          current: file.codec,
          recommended: codecOptions[0],
          reason: 'Using older or less efficient codec',
          improvement: 'Convert to a more efficient codec for better quality/size ratio',
          options: {
            settings: {
              codec: codecOptions
            }
          }
        });
      }
    }

    // Bitrate analysis with ranges
    if (file.bitrate && file.height) {
      const { current, recommended, options } = analyzeBitrate(file.bitrate, file.height);
      if (recommended !== current) {
        recommendations.push({
          type: 'bitrate',
          priority: Math.abs(recommended - current) > 5 ? 'high' : 'medium',
          current: `${current.toFixed(1)} Mbps`,
          recommended: `${recommended.toFixed(1)} Mbps`,
          reason: current > recommended ? 'Unnecessarily high bitrate' : 'Low bitrate affecting quality',
          improvement: current > recommended ? 
            'Reduce bitrate to save space without visible quality loss' : 
            'Increase bitrate for better visual quality',
          options: {
            settings: {
              bitrate: options
            }
          }
        });
      }
    }
  }

  return recommendations;
}

function findSuitableStandards(file: MediaMetadata): VideoStandard[] {
  if (!file.height) return [];
  
  return Object.values(VIDEO_STANDARDS).filter(standard => {
    // Find standards that match the resolution or are an upgrade
    return standard.resolution.height >= file.height!;
  }).sort((a, b) => {
    // Sort by closest resolution match
    return Math.abs(a.resolution.height - file.height!) - 
           Math.abs(b.resolution.height - file.height!);
  });
}

function getResolutionOptions(currentHeight: number): string[] {
  const standardResolutions = [
    { width: 3840, height: 2160 }, // 4K
    { width: 2560, height: 1440 }, // 2K
    { width: 1920, height: 1080 }, // Full HD
    { width: 1280, height: 720 }   // HD
  ];

  return standardResolutions
    .filter(res => res.height > currentHeight)
    .map(res => `${res.width}x${res.height}`);
}

function getCodecOptions(currentCodec: string): string[] {
  const codecPriority = [
    'AV1',        // Most efficient, newer
    'H.265/HEVC', // Very efficient, good support
    'VP9',        // Good efficiency, free
    'H.264/AVC'   // Wide compatibility
  ];

  const currentIndex = codecPriority.findIndex(codec => 
    currentCodec.toLowerCase().includes(codec.toLowerCase())
  );

  return currentIndex === -1 ? codecPriority : codecPriority.slice(0, currentIndex);
}

function analyzeBitrate(currentBitrate: number, height: number): {
  current: number;
  recommended: number;
  options: number[];
} {
  const currentMbps = currentBitrate / 1000000;
  let recommended: number;
  let options: number[];

  if (height >= 2160) { // 4K
    recommended = 45;
    options = [35, 45, 68];
  } else if (height >= 1440) { // 2K
    recommended = 24;
    options = [16, 24, 32];
  } else if (height >= 1080) { // Full HD
    recommended = 8;
    options = [4, 8, 12];
  } else if (height >= 720) { // HD
    recommended = 5;
    options = [2.5, 5, 7.5];
  } else { // SD
    recommended = 2.5;
    options = [1.5, 2.5, 4];
  }

  return { current: currentMbps, recommended, options };
}