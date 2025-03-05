export interface VideoStandard {
  name: string;
  resolution: {
    width: number;
    height: number;
  };
  bitrate: {
    min: number;  // in Mbps
    recommended: number;
    max: number;
  };
  frameRate: number[];
  codec: string[];
  audioCodec: string[];
  audioBitrate: number;  // in kbps
  container: string[];
}

export const VIDEO_STANDARDS: Record<string, VideoStandard> = {
  'youtube': {
    name: 'YouTube Recommended',
    resolution: { width: 1920, height: 1080 },
    bitrate: {
      min: 8,
      recommended: 12,
      max: 16
    },
    frameRate: [30, 60],
    codec: ['H.264', 'VP9'],
    audioCodec: ['AAC-LC'],
    audioBitrate: 384,
    container: ['MP4', 'WebM']
  },
  'netflix': {
    name: 'Netflix 1080p',
    resolution: { width: 1920, height: 1080 },
    bitrate: {
      min: 4,
      recommended: 5,
      max: 7
    },
    frameRate: [23.976, 24, 25, 29.97, 30],
    codec: ['H.264', 'HEVC'],
    audioCodec: ['AAC', 'AC-3'],
    audioBitrate: 192,
    container: ['MP4']
  },
  'broadcast-hd': {
    name: 'Broadcast HD',
    resolution: { width: 1920, height: 1080 },
    bitrate: {
      min: 12,
      recommended: 15,
      max: 20
    },
    frameRate: [29.97, 30, 50, 59.94, 60],
    codec: ['H.264', 'XDCAM HD422'],
    audioCodec: ['PCM', 'AC-3'],
    audioBitrate: 384,
    container: ['MXF', 'MOV']
  },
  'web-optimal': {
    name: 'Web Optimal',
    resolution: { width: 1920, height: 1080 },
    bitrate: {
      min: 2,
      recommended: 4,
      max: 6
    },
    frameRate: [30],
    codec: ['H.264', 'VP9'],
    audioCodec: ['AAC-LC'],
    audioBitrate: 128,
    container: ['MP4', 'WebM']
  },
  '4k-premium': {
    name: '4K Premium',
    resolution: { width: 3840, height: 2160 },
    bitrate: {
      min: 35,
      recommended: 45,
      max: 68
    },
    frameRate: [24, 30, 60],
    codec: ['H.265/HEVC', 'AV1'],
    audioCodec: ['AAC-LC', 'AC-3'],
    audioBitrate: 512,
    container: ['MP4', 'MOV']
  }
};