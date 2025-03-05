import React from 'react';
import { MediaMetadata } from '../../lib/types';
import { formatFileSize, formatDuration } from '../../lib/utils/format';

interface MetadataViewerProps {
  file: MediaMetadata;
}

export function MetadataViewer({ file }: MetadataViewerProps) {
  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div className="font-medium">Codec:</div>
      <div>{file.codec || 'N/A'}</div>
      
      <div className="font-medium">Bitrate:</div>
      <div>{file.bitrate ? `${(file.bitrate / 1000000).toFixed(2)} Mb/s` : 'N/A'}</div>
      
      <div className="font-medium">Resolution:</div>
      <div>{file.width && file.height ? `${file.width}x${file.height}` : 'N/A'}</div>
      
      <div className="font-medium">Duration:</div>
      <div>{file.duration ? formatDuration(file.duration) : 'N/A'}</div>
      
      <div className="font-medium">File Size:</div>
      <div>{formatFileSize(file.fileSize)}</div>
      
      <div className="font-medium">Created:</div>
      <div>{new Date(file.createdAt).toLocaleString()}</div>
    </div>
  );
}