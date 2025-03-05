export interface MediaMetadata {
  id?: number;
  filename: string;
  fileType: string;
  fileSize: number;
  duration?: number;
  width?: number;
  height?: number;
  codec?: string;
  container?: string;
  bitrate?: number;
  quality?: string;
  hash: string;
  createdAt: string;
  contentDescription?: string;
  contentType?: string;
  contentSummary?: string;
  isSupported?: boolean;
  error?: string;
  originalFormat?: string;
  recommendedFormat?: string;
}