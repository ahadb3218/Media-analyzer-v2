import React from 'react';
import { Volume2, FileText, Info, Tag } from 'lucide-react';
import { MediaMetadata } from '../../lib/types';

interface AudioAnalysisProps {
  file: MediaMetadata;
}

export function AudioAnalysis({ file }: AudioAnalysisProps) {
  if (!file.contentDescription && !file.contentType && !file.contentSummary) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-700">
          No audio analysis available for this file.
        </p>
      </div>
    );
  }

  // Extract suggested title from content summary if available
  let suggestedTitle = null;
  if (file.contentSummary) {
    const titleMatch = file.contentSummary.match(/Suggested title: "([^"]+)"/);
    if (titleMatch && titleMatch[1]) {
      suggestedTitle = titleMatch[1];
    }
  }

  return (
    <div className="space-y-4">
      {/* Suggested Title */}
      {suggestedTitle && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-blue-800">Suggested Title</h3>
          </div>
          <p className="text-lg font-medium text-blue-900">
            {suggestedTitle}
          </p>
        </div>
      )}

      {/* Content Type */}
      {file.contentType && (
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium">Content Type</h3>
          </div>
          <p className="text-sm text-gray-600">
            {file.contentType}
          </p>
        </div>
      )}

      {/* Content Description */}
      {file.contentDescription && (
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Volume2 className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium">Content Description</h3>
          </div>
          <p className="text-sm text-gray-600">
            {file.contentDescription}
          </p>
        </div>
      )}

      {/* Content Summary */}
      {file.contentSummary && (
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium">Content Analysis</h3>
          </div>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">
            {file.contentSummary.replace(/Suggested title: "[^"]+"\n\n/, '')}
          </p>
        </div>
      )}
    </div>
  );
}