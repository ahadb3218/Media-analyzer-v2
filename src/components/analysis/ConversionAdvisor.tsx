import { useState } from 'react';
import { Settings, AlertTriangle, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { MediaMetadata } from '../../lib/types/types';
import { analyzeForConversion, type ConversionRecommendation } from '../../lib/utils/conversionAdvisor';

interface ConversionAdvisorProps {
  file: MediaMetadata;
}

export function ConversionAdvisor({ file }: ConversionAdvisorProps) {
  const recommendations = analyzeForConversion(file);
  const [expandedSettings, setExpandedSettings] = useState<string[]>([]);

  const toggleSettings = (index: number) => {
    setExpandedSettings(prev => 
      prev.includes(index.toString()) 
        ? prev.filter(i => i !== index.toString())
        : [...prev, index.toString()]
    );
  };

  if (recommendations.length === 0) {
    return (
      <div className="p-4 bg-green-50 rounded-lg">
        <div className="flex items-center">
          <Settings className="h-5 w-5 text-green-500" />
          <p className="ml-2 text-sm text-green-700">
            No conversion recommendations. This file is optimized!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${getPriorityStyles(rec.priority).bg}`}
        >
          <div className="flex items-start">
            {getPriorityStyles(rec.priority).icon}
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`text-sm font-medium ${getPriorityStyles(rec.priority).text}`}>
                  {getRecommendationTitle(rec.type)}
                </h4>
                {rec.options && (
                  <button
                    onClick={() => toggleSettings(index)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    {expandedSettings.includes(index.toString()) 
                      ? <ChevronUp className="h-4 w-4" />
                      : <ChevronDown className="h-4 w-4" />
                    }
                  </button>
                )}
              </div>
              
              <div className="mt-2 text-sm space-y-1">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Current:</span>
                  <span>{rec.current}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Recommended:</span>
                  <span>{rec.recommended}</span>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-600">
                {rec.improvement}
              </p>

              {rec.options && expandedSettings.includes(index.toString()) && (
                <div className="mt-4 space-y-3 text-sm">
                  <h5 className="font-medium text-gray-900">Available Options</h5>
                  {rec.type === 'standard' && rec.options.standards && (
                    <div className="space-y-2">
                      {rec.options.standards.map((standard, idx) => (
                        <div key={idx} className="p-3 bg-white rounded border">
                          <h6 className="font-medium text-gray-900">{standard.name}</h6>
                          <div className="mt-2 space-y-1 text-gray-600">
                            <p>Resolution: {standard.resolution.width}x{standard.resolution.height}</p>
                            <p>Bitrate: {standard.bitrate.recommended} Mbps (Range: {standard.bitrate.min}-{standard.bitrate.max} Mbps)</p>
                            <p>Frame Rate: {standard.frameRate.join(', ')} fps</p>
                            <p>Codecs: {standard.codec.join(', ')}</p>
                            <p>Audio: {standard.audioCodec.join(', ')} @ {standard.audioBitrate}kbps</p>
                            <p>Containers: {standard.container.join(', ')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {rec.options.settings && (
                    <div className="space-y-2">
                      {Object.entries(rec.options.settings).map(([key, values]) => (
                        <div key={key} className="flex items-center">
                          <span className="font-medium w-32 text-gray-700">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {values.map((value, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-white border rounded text-gray-600 text-xs"
                              >
                                {value}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getPriorityStyles(priority: ConversionRecommendation['priority']): {
  bg: string;
  text: string;
  icon: JSX.Element;
} {
  switch (priority) {
    case 'high':
      return {
        bg: 'bg-red-50',
        text: 'text-red-800',
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />
      };
    case 'medium':
      return {
        bg: 'bg-yellow-50',
        text: 'text-yellow-800',
        icon: <AlertCircle className="h-5 w-5 text-yellow-500" />
      };
    case 'low':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        icon: <Info className="h-5 w-5 text-blue-500" />
      };
  }
}

function getRecommendationTitle(type: ConversionRecommendation['type']): string {
  switch (type) {
    case 'resolution':
      return 'Resolution Optimization';
    case 'codec':
      return 'Codec Upgrade';
    case 'bitrate':
      return 'Bitrate Adjustment';
    case 'format':
      return 'Format Conversion';
    case 'standard':
      return 'Industry Standard Conversion';
    default:
      return 'Optimization Recommendation';
  }
}