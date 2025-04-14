import React from 'react';
import { Image, FileVideo, Copy, Archive, Settings, Youtube, Volume2 } from 'lucide-react';

export interface Feature {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const features: Feature[] = [
  {
    id: 'quality-organizer',
    name: 'Video Quality Organizer',
    icon: <FileVideo className="w-6 h-6" />,
    description: 'Organize videos based on quality (1080p, 1440p, etc.)'
  },
  {
    id: 'quality-inspector',
    name: 'Media Quality Inspector',
    icon: <Image className="w-6 h-6" />,
    description: 'Analyze quality metrics for images and videos'
  },
  {
    id: 'audio-analyzer',
    name: 'Audio Content Analyzer',
    icon: <Volume2 className="w-6 h-6" />,
    description: 'Analyze audio content and generate tags'
  },
  {
    id: 'duplicate-detector',
    name: 'Duplicate Detector',
    icon: <Copy className="w-6 h-6" />,
    description: 'Find duplicate media files'
  },
  {
    id: 'archive-analyzer',
    name: 'Video Archive Analyzer',
    icon: <Archive className="w-6 h-6" />,
    description: 'Analyze video archives and collections'
  },
  {
    id: 'conversion-advisor',
    name: 'Media Conversion Advisor',
    icon: <Settings className="w-6 h-6" />,
    description: 'Identify files needing format conversion'
  },
  {
    id: 'streaming-validator',
    name: 'Streaming Readiness',
    icon: <Youtube className="w-6 h-6" />,
    description: 'Validate media for YouTube streaming'
  }
];

interface FeatureSelectorProps {
  onFeatureSelect: (feature: Feature) => void;
  selectedFeature: Feature | null;
}

export function FeatureSelector({ onFeatureSelect, selectedFeature }: FeatureSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature) => (
        <button
          key={feature.id}
          onClick={() => onFeatureSelect(feature)}
          className={`p-4 rounded-lg border transition-all ${
            selectedFeature?.id === feature.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            {feature.icon}
            <div className="text-left">
              <h3 className="font-medium text-gray-900">{feature.name}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}