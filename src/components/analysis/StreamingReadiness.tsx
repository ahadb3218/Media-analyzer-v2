import { useState } from 'react';
import { Check, X, AlertTriangle, ChevronDown, ChevronUp, Video, Radio, PlaySquare } from 'lucide-react';
import { MediaMetadata } from '../../lib/types/types';
import { PLATFORM_REQUIREMENTS, type PlatformRequirement } from '../../lib/utils/streamingStandards';

interface StreamingReadinessProps {
  file: MediaMetadata;
}

interface CheckResult {
  passed: boolean;
  warning?: boolean;
  message: string;
}

export function StreamingReadiness({ file }: StreamingReadinessProps) {
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);

  if (!file.fileType.startsWith('video/')) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-700">
          Streaming readiness check is only available for video files.
        </p>
      </div>
    );
  }

  const togglePlatform = (platformName: string) => {
    setExpandedPlatform(prev => prev === platformName ? null : platformName);
  };

  const getPlatformIcon = (platformName: string) => {
    switch (platformName) {
      case 'Netflix':
        return <PlaySquare className="w-6 h-6 text-red-700" />;
      case 'Twitch':
        return <Radio className="w-6 h-6 text-purple-600" />;
      default:
        return <Video className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-4">
      {PLATFORM_REQUIREMENTS.map((platform) => {
        const checks = checkPlatformRequirements(file, platform);
        const isExpanded = expandedPlatform === platform.name;
        const passedCount = checks.filter(c => c.passed).length;
        const totalChecks = checks.length;
        const compatibility = (passedCount / totalChecks) * 100;

        return (
          <div key={platform.name} className="border rounded-lg overflow-hidden">
            <div 
              className="p-4 bg-white cursor-pointer hover:bg-gray-50"
              onClick={() => togglePlatform(platform.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getPlatformIcon(platform.name)}
                  <h3 className="font-medium text-gray-900">{platform.name}</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getCompatibilityColor(compatibility)}`}
                        style={{ width: `${compatibility}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {Math.round(compatibility)}%
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="border-t divide-y">
                {checks.map((check, index) => (
                  <div key={index} className="p-4 flex items-start">
                    {check.passed ? (
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : check.warning ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mt-0.5" />
                    )}
                    <p className="ml-3 text-sm text-gray-600">{check.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function checkPlatformRequirements(file: MediaMetadata, platform: PlatformRequirement): CheckResult[] {
  const checks: CheckResult[] = [];

  // Resolution check
  if (file.width && file.height) {
    const { min, recommended, max } = platform.requirements.resolution;
    if (file.width < min.width || file.height < min.height) {
      checks.push({
        passed: false,
        message: `Resolution (${file.width}x${file.height}) is below minimum requirement (${min.width}x${min.height})`
      });
    } else if (file.width < recommended.width || file.height < recommended.height) {
      checks.push({
        passed: true,
        warning: true,
        message: `Resolution (${file.width}x${file.height}) meets minimum but is below recommended (${recommended.width}x${recommended.height})`
      });
    } else if (max && (file.width > max.width || file.height > max.height)) {
      checks.push({
        passed: false,
        message: `Resolution (${file.width}x${file.height}) exceeds maximum allowed (${max.width}x${max.height})`
      });
    } else {
      checks.push({
        passed: true,
        message: `Resolution (${file.width}x${file.height}) meets platform requirements`
      });
    }
  }

  // Bitrate check
  if (file.bitrate) {
    const bitrateMbps = file.bitrate / 1000000;
    const { min, recommended, max } = platform.requirements.bitrate;
    if (bitrateMbps < min) {
      checks.push({
        passed: false,
        message: `Bitrate (${bitrateMbps.toFixed(1)} Mbps) is below minimum requirement (${min} Mbps)`
      });
    } else if (bitrateMbps < recommended) {
      checks.push({
        passed: true,
        warning: true,
        message: `Bitrate (${bitrateMbps.toFixed(1)} Mbps) meets minimum but is below recommended (${recommended} Mbps)`
      });
    } else if (max && bitrateMbps > max) {
      checks.push({
        passed: false,
        message: `Bitrate (${bitrateMbps.toFixed(1)} Mbps) exceeds maximum allowed (${max} Mbps)`
      });
    } else {
      checks.push({
        passed: true,
        message: `Bitrate (${bitrateMbps.toFixed(1)} Mbps) meets platform requirements`
      });
    }
  }

  // Codec check
  if (file.codec) {
    const { required, recommended } = platform.requirements.codec;
    const codecMatch = required.some(c => 
      file.codec!.toLowerCase().includes(c.toLowerCase())
    );
    const recommendedMatch = recommended.some(c => 
      file.codec!.toLowerCase().includes(c.toLowerCase())
    );

    if (!codecMatch) {
      checks.push({
        passed: false,
        message: `Codec (${file.codec}) is not supported. Required: ${required.join(', ')}`
      });
    } else if (!recommendedMatch) {
      checks.push({
        passed: true,
        warning: true,
        message: `Codec (${file.codec}) is supported but not optimal. Recommended: ${recommended.join(', ')}`
      });
    } else {
      checks.push({
        passed: true,
        message: `Codec (${file.codec}) is optimal for the platform`
      });
    }
  }

  // File size check
  if (platform.requirements.maxFileSize) {
    const fileSizeGB = file.fileSize / (1024 * 1024 * 1024);
    if (fileSizeGB > platform.requirements.maxFileSize) {
      checks.push({
        passed: false,
        message: `File size (${fileSizeGB.toFixed(1)} GB) exceeds maximum allowed (${platform.requirements.maxFileSize} GB)`
      });
    } else {
      checks.push({
        passed: true,
        message: `File size (${fileSizeGB.toFixed(1)} GB) is within limits`
      });
    }
  }

  return checks;
}

function getCompatibilityColor(percentage: number): string {
  if (percentage >= 90) return 'bg-green-500';
  if (percentage >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
}