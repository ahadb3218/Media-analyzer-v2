import React, { useEffect, useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { MediaTable } from './components/MediaTable';
import { FeatureSelector, type Feature } from './components/FeatureSelector';
import { initDB, insertMediaMetadata, getAllMediaFiles, removeMediaFile } from './lib/db/indexedDB';
import { analyzeMedia } from './lib/mediaAnalyzer';
import { FileVideo } from 'lucide-react';
import type { MediaMetadata } from './lib/types';

export function App() {
  const [files, setFiles] = useState<MediaMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await initDB();
        const savedFiles = await getAllMediaFiles();
        setFiles(savedFiles);
      } catch (err) {
        setError('Failed to initialize database. Please try again.');
        console.error('Database initialization error:', err);
      }
    };
    loadData();
  }, []);

  const handleFilesSelected = async (selectedFiles: File[]) => {
    setIsLoading(true);
    setError(null);
    const newFiles: MediaMetadata[] = [];

    for (const file of selectedFiles) {
      try {
        const metadata = await analyzeMedia(file);
        await insertMediaMetadata(metadata);
        newFiles.push(metadata);
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        setError(`Failed to process ${file.name}`);
      }
    }

    setFiles(prev => [...prev, ...newFiles]);
    setIsLoading(false);
  };

  const handleRemoveFile = async (hash: string) => {
    try {
      await removeMediaFile(hash);
      setFiles(prev => prev.filter(file => file.hash !== hash));
    } catch (error) {
      console.error('Failed to remove file:', error);
      setError('Failed to remove file. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <FileVideo className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Media Analyzer
          </h1>
          <p className="mt-2 text-gray-600">
            Upload your media files for analysis and organization
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Select Feature</h2>
          <FeatureSelector
            selectedFeature={selectedFeature}
            onFeatureSelect={setSelectedFeature}
          />
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <FileUpload onFilesSelected={handleFilesSelected} />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Analyzing files...</p>
          </div>
        ) : files.length > 0 ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <MediaTable 
              files={files} 
              selectedFeature={selectedFeature}
              onRemoveFile={handleRemoveFile} 
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}