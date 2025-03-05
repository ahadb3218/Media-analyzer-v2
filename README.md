# Media Analyzer

A powerful media analysis tool that helps you analyze video and audio files for quality, duplicates, streaming readiness, and content type.

## Features

- Video Quality Analysis
- Audio Content Analysis
- Duplicate Detection
- Streaming Platform Compatibility Check
- Media Quality Inspector
- Format Conversion Advisor

## Prerequisites

- Node.js 18.0.0 or higher
- Modern web browser with Web Audio API support (Chrome, Firefox, Safari, Edge)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd media-analyzer
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Browser Requirements

This application requires specific browser features:

- Web Audio API
- MediaSource Extensions
- IndexedDB
- Web Crypto API

For best results, use the latest version of Chrome, Firefox, Safari, or Edge.

## Technical Notes

- The application processes media files entirely in the browser
- No server-side processing is required
- Audio analysis is limited to the first 30 seconds of video files
- Supports most common video formats (MP4, WebM, MOV, etc.)
- File analysis is performed locally without uploading to any server

## Supported File Types

### Video
- MP4 (.mp4)
- WebM (.webm)
- QuickTime (.mov)
- Matroska (.mkv)
- AVI (.avi)
- FLV (.flv)
- 3GPP (.3gp)
- Windows Media (.wmv)
- MPEG Transport Stream (.ts)
- HLS Streams (.m3u8)

### Image
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)