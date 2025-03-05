import { calculateFileHash } from './utils/hash';
import { determineVideoQuality, determineImageQuality } from './utils/quality';
import { extractVideoMetadata } from './analyzers/videoAnalyzer';
import { extractImageMetadata } from './analyzers/imageAnalyzer';
import { analyzeAudio } from './analyzers/audioAnalyzer';
import type { MediaMetadata } from './types';

const SUPPORTED_VIDEO_FORMATS = new Set([
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
  'video/x-matroska',
  'video/x-msvideo',
  'video/x-flv',
  'video/3gpp',
  'video/3gpp2',
  'video/x-ms-wmv',
  'video/x-m4v',
  'application/x-mpegURL',
  'video/MP2T'
]);

const SUPPORTED_CODECS = new Set([
  'avc1', 'mp4v', 'h264', 'h265', 'hevc',
  'vp8', 'vp9', 'av1', 'theora', 'divx',
  'xvid', 'h263', 'mpeg2', 'mpeg4'
]);

export async function analyzeMedia(file: File): Promise<MediaMetadata> {
  const baseMetadata = {
    filename: file.name,
    fileType: detectFileType(file),
    fileSize: file.size,
    createdAt: new Date().toISOString(),
    hash: await calculateFileHash(file)
  };

  let extraMetadata = {};

  if (isVideoFile(file)) {
    try {
      const metadata = await extractVideoMetadata(file);
      
      // Process audio analysis
      let audioAnalysis = { contentDescription: '', contentType: '', contentSummary: '' };
      try {
        // Direct audio analysis from the file
        audioAnalysis = await analyzeAudio(file);
      } catch (audioError) {
        console.warn('Audio analysis failed:', audioError);
      }

      const formatInfo = await detectVideoFormat(file);
      
      extraMetadata = {
        ...metadata,
        ...formatInfo,
        quality: metadata.height ? determineVideoQuality(metadata.width, metadata.height) : 'Unknown',
        contentDescription: audioAnalysis.contentDescription,
        contentType: audioAnalysis.contentType,
        contentSummary: audioAnalysis.contentSummary,
        isSupported: !metadata.error,
        error: metadata.error,
        originalFormat: file.type,
        recommendedFormat: metadata.height ? getRecommendedFormat(file, metadata) : undefined
      };
    } catch (error) {
      console.warn('Error analyzing video:', error);
      extraMetadata = {
        isSupported: false,
        error: error instanceof Error ? error.message : 'Unknown error analyzing video'
      };
    }
  } else if (file.type.startsWith('image/')) {
    try {
      const metadata = await extractImageMetadata(file);
      extraMetadata = {
        ...metadata,
        quality: determineImageQuality(metadata.width, metadata.height)
      };
    } catch (error) {
      console.warn('Error analyzing image:', error);
      extraMetadata = {
        isSupported: false,
        error: error instanceof Error ? error.message : 'Unknown error analyzing image'
      };
    }
  }

  return {
    ...baseMetadata,
    ...extraMetadata
  } as MediaMetadata;
}

function detectFileType(file: File): string {
  if (!file.type) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return getTypeFromExtension(extension);
  }
  return file.type;
}

function getTypeFromExtension(extension?: string): string {
  const videoExtensions: Record<string, string> = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'mov': 'video/quicktime',
    'mkv': 'video/x-matroska',
    'avi': 'video/x-msvideo',
    'flv': 'video/x-flv',
    '3gp': 'video/3gpp',
    '3g2': 'video/3gpp2',
    'wmv': 'video/x-ms-wmv',
    'm4v': 'video/x-m4v',
    'ts': 'video/MP2T',
    'm3u8': 'application/x-mpegURL'
  };

  return videoExtensions[extension || ''] || 'application/octet-stream';
}

function isVideoFile(file: File): boolean {
  const type = detectFileType(file);
  return type.startsWith('video/') || type === 'application/x-mpegURL';
}

async function detectVideoFormat(file: File): Promise<{
  codec?: string;
  container?: string;
  bitrate?: number;
}> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      
      const codec = detectCodec(video);
      const container = detectContainer(file);
      const bitrate = estimateBitrate(file, video.duration);

      resolve({
        codec,
        container,
        bitrate
      });
    };

    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      resolve({});
    };

    video.src = URL.createObjectURL(file);
  });
}

function detectCodec(video: HTMLVideoElement): string | undefined {
  if (!video.canPlayType) return undefined;

  const codecTests = [
    'video/mp4; codecs="avc1.42E01E"',    // H.264
    'video/mp4; codecs="hev1.1.6.L93.B0"', // HEVC
    'video/webm; codecs="vp8"',            // VP8
    'video/webm; codecs="vp9"',            // VP9
    'video/webm; codecs="av1"'             // AV1
  ];

  for (const test of codecTests) {
    if (video.canPlayType(test) === 'probably') {
      const codec = test.split('codecs="')[1].split('"')[0];
      return SUPPORTED_CODECS.has(codec) ? codec : undefined;
    }
  }

  return undefined;
}

function detectContainer(file: File): string | undefined {
  const type = detectFileType(file);
  const containers: Record<string, string> = {
    'video/mp4': 'MP4',
    'video/webm': 'WebM',
    'video/ogg': 'OGG',
    'video/quicktime': 'MOV',
    'video/x-matroska': 'MKV',
    'video/x-msvideo': 'AVI',
    'video/x-flv': 'FLV',
    'video/3gpp': '3GP',
    'video/3gpp2': '3G2',
    'video/x-ms-wmv': 'WMV',
    'application/x-mpegURL': 'HLS'
  };

  return containers[type];
}

function estimateBitrate(file: File, duration?: number): number | undefined {
  if (!duration) return undefined;
  return Math.round((file.size * 8) / duration);
}

function getRecommendedFormat(file: File, metadata: any): string | undefined {
  if (!metadata.width || !metadata.height) return undefined;

  if (metadata.height >= 2160) {
    return 'video/mp4; codecs="hev1.1.6.L93.B0"';
  } else if (metadata.height >= 1080) {
    return 'video/webm; codecs="vp9"';
  } else {
    return 'video/mp4; codecs="avc1.42E01E"';
  }
}