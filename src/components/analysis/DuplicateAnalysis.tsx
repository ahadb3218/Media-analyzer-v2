import { Trash2 } from 'lucide-react';
import { MediaMetadata } from '../../lib/types/types';
import { findDuplicates } from '../../lib/utils/duplicateDetector';
import { formatFileSize } from '../../lib/utils/format';

interface DuplicateAnalysisProps {
  files: MediaMetadata[];
  onRemoveFile?: (hash: string) => void;
}

export function DuplicateAnalysis({ files, onRemoveFile }: DuplicateAnalysisProps) {
  const duplicateGroups = findDuplicates(files);

  if (duplicateGroups.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No duplicate files found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {duplicateGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-blue-900">
                Duplicate Group #{groupIndex + 1}
              </h3>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {group.similarity}% Similar
              </span>
            </div>
            <p className="mt-1 text-xs text-blue-700">
              Reasons: {group.reason.join(', ')}
            </p>
          </div>
          
          <div className="divide-y">
            {group.files.map((file) => (
              <div key={file.hash} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{file.filename}</p>
                  <div className="mt-1 text-xs text-gray-500 space-y-1">
                    <p>Size: {formatFileSize(file.fileSize)}</p>
                    {file.width && file.height && (
                      <p>Resolution: {file.width}x{file.height}</p>
                    )}
                    {file.duration && (
                      <p>Duration: {file.duration.toFixed(1)}s</p>
                    )}
                  </div>
                </div>
                {onRemoveFile && (
                  <button
                    onClick={() => onRemoveFile(file.hash)}
                    className="ml-4 p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
                    title="Remove file"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}