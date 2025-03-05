import React from 'react';
import { MediaMetadata } from '../../lib/types';
import { getQualityScore } from '../../lib/utils/quality';
import { formatFileSize } from '../../lib/utils/format';

interface QualityAnalysisProps {
  file: MediaMetadata;
}

export function QualityAnalysis({ file }: QualityAnalysisProps) {
  const qualityScore = getQualityScore(file);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getQualityColor(qualityScore)}`}
              style={{ width: `${qualityScore}%` }}
            />
          </div>
        </div>
        <span className="text-lg font-semibold w-16 text-right">
          {qualityScore}%
        </span>
      </div>
      
      <div className="grid gap-3">
        {/* Resolution Analysis */}
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-medium mb-2">Resolution Quality</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {file.width && file.height ? (
                <>
                  {file.width}x{file.height} 
                  ({determineResolutionStandard(file.height)})
                </>
              ) : 'Resolution data not available'}
            </p>
            {file.width && file.height && (
              <div className="text-xs text-gray-500">
                Aspect Ratio: {calculateAspectRatio(file.width, file.height)}
              </div>
            )}
          </div>
        </div>

        {/* Bitrate Analysis */}
        {file.bitrate && (
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Bitrate Analysis</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {(file.bitrate / 1000000).toFixed(2)} Mbps
              </p>
              <div className="text-xs text-gray-500">
                {getBitrateQualityDescription(file.bitrate, file.height)}
              </div>
            </div>
          </div>
        )}

        {/* Codec Information */}
        {file.codec && (
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Codec Analysis</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{file.codec}</p>
              <div className="text-xs text-gray-500">
                {getCodecDescription(file.codec)}
              </div>
            </div>
          </div>
        )}

        {/* File Size Efficiency */}
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-medium mb-2">Size Efficiency</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {formatFileSize(file.fileSize)}
            </p>
            <div className="text-xs text-gray-500">
              {getFileSizeEfficiency(file)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getQualityColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  if (score >= 40) return 'bg-orange-500';
  return 'bg-red-500';
}

function determineResolutionStandard(height: number): string {
  if (height >= 2160) return '4K UHD';
  if (height >= 1440) return '2K QHD';
  if (height >= 1080) return 'Full HD';
  if (height >= 720) return 'HD';
  return 'SD';
}

function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width/divisor}:${height/divisor}`;
}

function getBitrateQualityDescription(bitrate: number, height?: number): string {
  const mbps = bitrate / 1000000;
  
  if (!height) return `Current bitrate: ${mbps.toFixed(1)} Mbps`;
  
  const expectedBitrate = height >= 2160 ? 45 :
                         height >= 1440 ? 24 :
                         height >= 1080 ? 8 :
                         height >= 720 ? 5 : 2.5;
  
  const ratio = mbps / expectedBitrate;
  
  if (ratio >= 1.2) return 'Bitrate is higher than recommended for this resolution';
  if (ratio >= 0.8) return 'Optimal bitrate for this resolution';
  if (ratio >= 0.5) return 'Acceptable bitrate, but could be improved';
  return 'Bitrate is lower than recommended for this resolution';
}

function getCodecDescription(codec: string): string {
  const lowerCodec = codec.toLowerCase();
  
  if (lowerCodec.includes('av1')) {
    return 'Next-generation codec with excellent compression';
  }
  if (lowerCodec.includes('hevc') || lowerCodec.includes('h.265')) {
    return 'Modern codec with very good compression';
  }
  if (lowerCodec.includes('vp9')) {
    return 'Modern codec with very good compression';
  }
  if (lowerCodec.includes('h.264') || lowerCodec.includes('avc')) {
    return 'Widely compatible codec with good compression';
  }
  return 'Basic codec with standard compression';
}

function getFileSizeEfficiency(file: MediaMetadata): string {
  if (!file.width || !file.height) return 'Size efficiency cannot be calculated without resolution data';
  
  const pixels = file.width * file.height;
  const megapixels = pixels / 1000000;
  const fileSizeMB = file.fileSize / 1000000;
  
  // Calculate MB per megapixel
  const mbPerMegapixel = fileSizeMB / megapixels;
  
  if (file.fileType.startsWith('video/')) {
    if (mbPerMegapixel < 1) return 'Excellent compression efficiency';
    if (mbPerMegapixel < 2) return 'Good compression efficiency';
    if (mbPerMegapixel < 4) return 'Average compression efficiency';
    return 'Below average compression efficiency';
  } else {
    if (mbPerMegapixel < 0.3) return 'Excellent compression efficiency';
    if (mbPerMegapixel < 0.5) return 'Good compression efficiency';
    if (mbPerMegapixel < 1) return 'Average compression efficiency';
    return 'Below average compression efficiency';
  }
}