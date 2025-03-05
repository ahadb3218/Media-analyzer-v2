export interface PlatformRequirement {
  name: string;
  logo: string;
  requirements: {
    resolution: {
      min: { width: number; height: number };
      recommended: { width: number; height: number };
      max?: { width: number; height: number };
    };
    bitrate: {
      min: number;
      recommended: number;
      max: number;
    };
    frameRate: {
      supported: number[];
      recommended: number[];
    };
    codec: {
      required: string[];
      recommended: string[];
    };
    audio: {
      codec: string[];
      bitrate: {
        min: number;
        recommended: number;
      };
      channels: number[];
    };
    container: string[];
    maxDuration?: number; // in minutes
    maxFileSize?: number; // in GB
  };
}

export const PLATFORM_REQUIREMENTS: PlatformRequirement[] = [
  {
    name: 'YouTube',
    logo: '/youtube.svg',
    requirements: {
      resolution: {
        min: { width: 426, height: 240 },
        recommended: { width: 1920, height: 1080 },
        max: { width: 7680, height: 4320 }
      },
      bitrate: {
        min: 1,
        recommended: 12,
        max: 68
      },
      frameRate: {
        supported: [24, 25, 30, 48, 50, 60],
        recommended: [30, 60]
      },
      codec: {
        required: ['H.264', 'HEVC', 'VP9'],
        recommended: ['VP9', 'AV1']
      },
      audio: {
        codec: ['AAC-LC', 'OPUS'],
        bitrate: {
          min: 128,
          recommended: 384
        },
        channels: [2, 5.1]
      },
      container: ['MP4', 'WebM', 'MOV'],
      maxFileSize: 256
    }
  },
  {
    name: 'Netflix',
    logo: '/netflix.svg',
    requirements: {
      resolution: {
        min: { width: 1920, height: 1080 },
        recommended: { width: 3840, height: 2160 }
      },
      bitrate: {
        min: 5,
        recommended: 16,
        max: 25
      },
      frameRate: {
        supported: [23.976, 24, 25, 29.97, 30],
        recommended: [23.976, 24]
      },
      codec: {
        required: ['H.264', 'HEVC'],
        recommended: ['HEVC']
      },
      audio: {
        codec: ['AAC', 'AC-3', 'E-AC-3'],
        bitrate: {
          min: 192,
          recommended: 384
        },
        channels: [2, 5.1, 7.1]
      },
      container: ['MP4', 'MOV']
    }
  },
  {
    name: 'Vimeo',
    logo: '/vimeo.svg',
    requirements: {
      resolution: {
        min: { width: 640, height: 360 },
        recommended: { width: 1920, height: 1080 },
        max: { width: 7680, height: 4320 }
      },
      bitrate: {
        min: 2,
        recommended: 10,
        max: 60
      },
      frameRate: {
        supported: [23.976, 24, 25, 29.97, 30, 48, 50, 59.94, 60],
        recommended: [24, 25, 30]
      },
      codec: {
        required: ['H.264', 'HEVC'],
        recommended: ['H.264']
      },
      audio: {
        codec: ['AAC-LC'],
        bitrate: {
          min: 128,
          recommended: 320
        },
        channels: [2]
      },
      container: ['MP4', 'MOV', 'WMV'],
      maxFileSize: 256
    }
  },
  {
    name: 'Twitch',
    logo: '/twitch.svg',
    requirements: {
      resolution: {
        min: { width: 640, height: 360 },
        recommended: { width: 1920, height: 1080 }
      },
      bitrate: {
        min: 2.5,
        recommended: 6,
        max: 8
      },
      frameRate: {
        supported: [30, 60],
        recommended: [60]
      },
      codec: {
        required: ['H.264'],
        recommended: ['H.264']
      },
      audio: {
        codec: ['AAC-LC'],
        bitrate: {
          min: 128,
          recommended: 160
        },
        channels: [2]
      },
      container: ['MP4', 'MOV']
    }
  }
];