import React from 'react';
import { Trash2, FileVideo, Image } from 'lucide-react';
import type { MediaMetadata } from '../lib/types';
import { QualityAnalysis } from './analysis/QualityAnalysis';
import { DuplicateAnalysis } from './analysis/DuplicateAnalysis';
import { ConversionAdvisor } from './analysis/ConversionAdvisor';
import { StreamingReadiness } from './analysis/StreamingReadiness';
import { AudioAnalysis } from './analysis/AudioAnalysis';
import { formatFileSize } from '../lib/utils/format';
import { sortByQualityPriority, getQualityGroup, type QualityGroup } from '../lib/utils/quality';
import type { Feature } from './FeatureSelector';

interface MediaTableProps {
  files: MediaMetadata[];
  selectedFeature: Feature | null;
  onRemoveFile?: (hash: string) => void;
}

interface GroupedFiles {
  group: QualityGroup;
  files: MediaMetadata[];
}

export function MediaTable({ files, selectedFeature, onRemoveFile }: MediaTableProps) {
  // If duplicate detector is selected, show the duplicate analysis view
  if (selectedFeature?.id === 'duplicate-detector') {
    return (
      <div className="p-6">
        <DuplicateAnalysis files={files} onRemoveFile={onRemoveFile} />
      </div>
    );
  }

  // If conversion advisor is selected, show a different layout
  if (selectedFeature?.id === 'conversion-advisor') {
    return (
      <div className="divide-y">
        {files.map((file, index) => (
          <div key={`conversion-${file.hash}-${index}`} className="p-6">
            <div className="flex items-center mb-4">
              {file.fileType.startsWith('video/') ? (
                <FileVideo className="w-8 h-8 text-blue-500" />
              ) : (
                <Image className="w-8 h-8 text-green-500" />
              )}
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{file.filename}</h3>
                <p className="text-sm text-gray-500">
                  {formatFileSize(file.fileSize)} • {file.fileType.split('/')[0].toUpperCase()}
                </p>
              </div>
              {onRemoveFile && (
                <button
                  onClick={() => onRemoveFile(file.hash)}
                  className="ml-auto p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
                  title="Remove file"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <ConversionAdvisor file={file} />
          </div>
        ))}
      </div>
    );
  }

  // If streaming readiness is selected, show the streaming analysis view
  if (selectedFeature?.id === 'streaming-validator') {
    return (
      <div className="divide-y">
        {files.map((file, index) => (
          <div key={`streaming-${file.hash}-${index}`} className="p-6">
            <div className="flex items-center mb-4">
              {file.fileType.startsWith('video/') ? (
                <FileVideo className="w-8 h-8 text-blue-500" />
              ) : (
                <Image className="w-8 h-8 text-green-500" />
              )}
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{file.filename}</h3>
                <p className="text-sm text-gray-500">
                  {formatFileSize(file.fileSize)} • {file.fileType.split('/')[0].toUpperCase()}
                </p>
              </div>
              {onRemoveFile && (
                <button
                  onClick={() => onRemoveFile(file.hash)}
                  className="ml-auto p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
                  title="Remove file"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <StreamingReadiness file={file} />
          </div>
        ))}
      </div>
    );
  }

  // If audio analyzer is selected, show the audio analysis view
  if (selectedFeature?.id === 'audio-analyzer') {
    return (
      <div className="divide-y">
        {files.map((file, index) => (
          <div key={`audio-${file.hash}-${index}`} className="p-6">
            <div className="flex items-center mb-4">
              {file.fileType.startsWith('video/') ? (
                <FileVideo className="w-8 h-8 text-blue-500" />
              ) : (
                <Image className="w-8 h-8 text-green-500" />
              )}
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{file.filename}</h3>
                <p className="text-sm text-gray-500">
                  {formatFileSize(file.fileSize)} • {file.fileType.split('/')[0].toUpperCase()}
                </p>
              </div>
              {onRemoveFile && (
                <button
                  onClick={() => onRemoveFile(file.hash)}
                  className="ml-auto p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
                  title="Remove file"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <AudioAnalysis file={file} />
          </div>
        ))}
      </div>
    );
  }

  // Group files by quality for the quality organizer view
  const videoFiles = files.filter(file => file.fileType.startsWith('video/'));
  const sortedFiles = sortByQualityPriority(videoFiles);
  
  const groupedFiles: GroupedFiles[] = sortedFiles.reduce((groups: GroupedFiles[], file) => {
    if (!file.height) return groups;
    
    const group = getQualityGroup(file.height);
    const existingGroup = groups.find(g => g.group.resolution === group.resolution);
    
    if (existingGroup) {
      existingGroup.files.push(file);
    } else {
      groups.push({ group, files: [file] });
    }
    
    return groups;
  }, []);

  return (
    <div className="space-y-8 p-6">
      {groupedFiles.map(({ group, files }) => (
        <div key={group.resolution} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {group.name} ({group.resolution})
            </h2>
            <span className="text-sm text-gray-500">
              {files.length} file{files.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="grid gap-4">
            {files.map((file) => (
              <div key={file.hash} className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 flex items-center justify-between border-b">
                  <div className="flex items-center gap-4">
                    <FileVideo className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">{file.filename}</h3>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.fileSize)} • {file.width}x{file.height}
                      </p>
                    </div>
                  </div>
                  {onRemoveFile && (
                    <button
                      onClick={() => onRemoveFile(file.hash)}
                      className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
                      title="Remove file"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <QualityAnalysis file={file} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Show non-video files separately */}
      {files.some(file => !file.fileType.startsWith('video/')) && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Other Media Files</h2>
          <div className="grid gap-4">
            {files
              .filter(file => !file.fileType.startsWith('video/'))
              .map((file) => (
                <div key={file.hash} className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 flex items-center justify-between border-b">
                    <div className="flex items-center gap-4">
                      <Image className="w-8 h-8 text-green-500" />
                      <div>
                        <h3 className="font-medium text-gray-900">{file.filename}</h3>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.fileSize)} • {file.fileType.split('/')[0].toUpperCase()}
                        </p>
                      </div>
                    </div>
                    {onRemoveFile && (
                      <button
                        onClick={() => onRemoveFile(file.hash)}
                        className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
                        title="Remove file"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="p-4">
                    <QualityAnalysis file={file} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}