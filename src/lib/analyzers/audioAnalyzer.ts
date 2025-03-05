import { MediaMetadata } from '../types';

// Expanded training data for content classification with more specific categories
const TRAINING_DATA = [
  // Film genres
  {
    category: 'Action Movie',
    features: {
      energy: 0.8,
      dynamicRange: 0.9,
      rhythmicPattern: 0.7,
      speechPattern: 0.3,
      harmonicContent: 0.5,
      backgroundNoise: 0.4,
      tempo: 120,
      voicePresence: 0.4,
      emotionalIntensity: 0.8
    },
    keywords: ['intense', 'explosive', 'dynamic', 'fast-paced', 'dramatic', 'combat', 'chase', 'adventure']
  },
  {
    category: 'Drama',
    features: {
      energy: 0.4,
      dynamicRange: 0.6,
      rhythmicPattern: 0.2,
      speechPattern: 0.8,
      harmonicContent: 0.6,
      backgroundNoise: 0.2,
      tempo: 70,
      voicePresence: 0.8,
      emotionalIntensity: 0.7
    },
    keywords: ['emotional', 'character-driven', 'dialogue', 'relationships', 'conflict', 'personal', 'intimate']
  },
  {
    category: 'Horror',
    features: {
      energy: 0.5,
      dynamicRange: 0.9,
      rhythmicPattern: 0.3,
      speechPattern: 0.4,
      harmonicContent: 0.3,
      backgroundNoise: 0.7,
      tempo: 60,
      voicePresence: 0.5,
      emotionalIntensity: 0.9
    },
    keywords: ['scary', 'tense', 'suspenseful', 'frightening', 'eerie', 'supernatural', 'disturbing']
  },
  {
    category: 'Comedy',
    features: {
      energy: 0.6,
      dynamicRange: 0.5,
      rhythmicPattern: 0.5,
      speechPattern: 0.8,
      harmonicContent: 0.4,
      backgroundNoise: 0.3,
      tempo: 90,
      voicePresence: 0.7,
      emotionalIntensity: 0.4
    },
    keywords: ['funny', 'humorous', 'light-hearted', 'witty', 'amusing', 'playful', 'satirical']
  },
  {
    category: 'Science Fiction',
    features: {
      energy: 0.6,
      dynamicRange: 0.8,
      rhythmicPattern: 0.4,
      speechPattern: 0.5,
      harmonicContent: 0.7,
      backgroundNoise: 0.5,
      tempo: 85,
      voicePresence: 0.5,
      emotionalIntensity: 0.6
    },
    keywords: ['futuristic', 'technological', 'space', 'advanced', 'speculative', 'otherworldly']
  },
  
  // TV formats
  {
    category: 'Documentary',
    features: {
      energy: 0.3,
      dynamicRange: 0.5,
      rhythmicPattern: 0.2,
      speechPattern: 0.9,
      harmonicContent: 0.4,
      backgroundNoise: 0.3,
      tempo: 65,
      voicePresence: 0.9,
      emotionalIntensity: 0.4
    },
    keywords: ['informative', 'educational', 'factual', 'real-life', 'investigative', 'historical', 'analytical']
  },
  {
    category: 'News Broadcast',
    features: {
      energy: 0.4,
      dynamicRange: 0.3,
      rhythmicPattern: 0.1,
      speechPattern: 0.95,
      harmonicContent: 0.2,
      backgroundNoise: 0.2,
      tempo: 75,
      voicePresence: 0.95,
      emotionalIntensity: 0.3
    },
    keywords: ['current events', 'reporting', 'journalism', 'headlines', 'informative', 'timely']
  },
  {
    category: 'Reality TV',
    features: {
      energy: 0.7,
      dynamicRange: 0.6,
      rhythmicPattern: 0.4,
      speechPattern: 0.8,
      harmonicContent: 0.3,
      backgroundNoise: 0.5,
      tempo: 95,
      voicePresence: 0.8,
      emotionalIntensity: 0.7
    },
    keywords: ['unscripted', 'dramatic', 'personal', 'conflict', 'competition', 'emotional', 'confrontational']
  },
  {
    category: 'Talk Show',
    features: {
      energy: 0.5,
      dynamicRange: 0.4,
      rhythmicPattern: 0.3,
      speechPattern: 0.9,
      harmonicContent: 0.3,
      backgroundNoise: 0.2,
      tempo: 80,
      voicePresence: 0.9,
      emotionalIntensity: 0.4
    },
    keywords: ['interview', 'conversation', 'host', 'guest', 'discussion', 'opinion', 'entertainment']
  },
  
  // Music content
  {
    category: 'Pop Music',
    features: {
      energy: 0.7,
      dynamicRange: 0.5,
      rhythmicPattern: 0.9,
      speechPattern: 0.3,
      harmonicContent: 0.7,
      backgroundNoise: 0.1,
      tempo: 120,
      voicePresence: 0.7,
      emotionalIntensity: 0.6
    },
    keywords: ['catchy', 'upbeat', 'melodic', 'contemporary', 'vocals', 'rhythmic', 'mainstream']
  },
  {
    category: 'Rock Music',
    features: {
      energy: 0.8,
      dynamicRange: 0.7,
      rhythmicPattern: 0.8,
      speechPattern: 0.2,
      harmonicContent: 0.6,
      backgroundNoise: 0.3,
      tempo: 110,
      voicePresence: 0.6,
      emotionalIntensity: 0.8
    },
    keywords: ['guitar', 'drums', 'energetic', 'powerful', 'band', 'electric', 'intense']
  },
  {
    category: 'Classical Music',
    features: {
      energy: 0.5,
      dynamicRange: 0.9,
      rhythmicPattern: 0.6,
      speechPattern: 0.0,
      harmonicContent: 0.9,
      backgroundNoise: 0.1,
      tempo: 85,
      voicePresence: 0.1,
      emotionalIntensity: 0.7
    },
    keywords: ['orchestral', 'instrumental', 'symphonic', 'composed', 'acoustic', 'harmonic', 'refined']
  },
  {
    category: 'Electronic Music',
    features: {
      energy: 0.8,
      dynamicRange: 0.6,
      rhythmicPattern: 0.95,
      speechPattern: 0.1,
      harmonicContent: 0.5,
      backgroundNoise: 0.2,
      tempo: 130,
      voicePresence: 0.2,
      emotionalIntensity: 0.6
    },
    keywords: ['synthesized', 'beats', 'digital', 'produced', 'dance', 'rhythmic', 'electronic']
  },
  
  // Sports content
  {
    category: 'Sports Broadcast',
    features: {
      energy: 0.7,
      dynamicRange: 0.6,
      rhythmicPattern: 0.4,
      speechPattern: 0.7,
      harmonicContent: 0.3,
      backgroundNoise: 0.6,
      tempo: 90,
      voicePresence: 0.7,
      emotionalIntensity: 0.7
    },
    keywords: ['competitive', 'play-by-play', 'commentary', 'crowd', 'exciting', 'athletic', 'game']
  },
  
  // Educational content
  {
    category: 'Educational Video',
    features: {
      energy: 0.4,
      dynamicRange: 0.4,
      rhythmicPattern: 0.2,
      speechPattern: 0.9,
      harmonicContent: 0.3,
      backgroundNoise: 0.1,
      tempo: 70,
      voicePresence: 0.9,
      emotionalIntensity: 0.3
    },
    keywords: ['instructional', 'informative', 'explanatory', 'tutorial', 'learning', 'educational', 'detailed']
  },
  
  // Specific scene types
  {
    category: 'Action Sequence',
    features: {
      energy: 0.9,
      dynamicRange: 0.8,
      rhythmicPattern: 0.7,
      speechPattern: 0.2,
      harmonicContent: 0.4,
      backgroundNoise: 0.5,
      tempo: 140,
      voicePresence: 0.3,
      emotionalIntensity: 0.9
    },
    keywords: ['intense', 'fast-paced', 'combat', 'chase', 'explosive', 'dynamic', 'thrilling']
  },
  {
    category: 'Dialogue Scene',
    features: {
      energy: 0.3,
      dynamicRange: 0.4,
      rhythmicPattern: 0.1,
      speechPattern: 0.95,
      harmonicContent: 0.3,
      backgroundNoise: 0.2,
      tempo: 60,
      voicePresence: 0.95,
      emotionalIntensity: 0.5
    },
    keywords: ['conversation', 'character development', 'dialogue', 'verbal', 'discussion', 'interaction']
  },
  {
    category: 'Suspenseful Moment',
    features: {
      energy: 0.5,
      dynamicRange: 0.8,
      rhythmicPattern: 0.3,
      speechPattern: 0.3,
      harmonicContent: 0.5,
      backgroundNoise: 0.4,
      tempo: 65,
      voicePresence: 0.3,
      emotionalIntensity: 0.8
    },
    keywords: ['tense', 'atmospheric', 'building', 'anticipation', 'mysterious', 'suspenseful', 'climactic']
  },
  {
    category: 'Emotional Scene',
    features: {
      energy: 0.3,
      dynamicRange: 0.6,
      rhythmicPattern: 0.2,
      speechPattern: 0.6,
      harmonicContent: 0.7,
      backgroundNoise: 0.2,
      tempo: 55,
      voicePresence: 0.6,
      emotionalIntensity: 0.8
    },
    keywords: ['moving', 'intimate', 'personal', 'heartfelt', 'touching', 'poignant', 'sentimental']
  }
];

// Expanded content descriptors for more specific title generation
const CONTENT_DESCRIPTORS = {
  // Film genres
  'Action Film': ['high-octane', 'adrenaline-fueled', 'explosive', 'combat', 'adventure', 'heroic', 'thrilling'],
  'Drama': ['emotional', 'character-driven', 'relationship', 'conflict', 'personal journey', 'human condition'],
  'Thriller': ['suspenseful', 'gripping', 'intense', 'mystery', 'danger', 'threat', 'psychological'],
  'Horror': ['frightening', 'terrifying', 'supernatural', 'eerie', 'disturbing', 'macabre', 'dread'],
  'Comedy': ['humorous', 'funny', 'witty', 'satirical', 'light-hearted', 'amusing', 'comedic'],
  'Romance': ['love story', 'relationship', 'romantic', 'emotional', 'intimate', 'passionate', 'heartfelt'],
  'Science Fiction': ['futuristic', 'technological', 'speculative', 'otherworldly', 'scientific', 'advanced'],
  'Fantasy': ['magical', 'mythical', 'imaginative', 'supernatural', 'legendary', 'fantastical', 'wondrous'],
  'Documentary': ['factual', 'informative', 'real-life', 'educational', 'investigative', 'historical'],
  
  // TV formats
  'TV Series': ['episodic', 'character-arc', 'storyline', 'recurring', 'seasonal', 'narrative', 'ensemble'],
  'Reality Show': ['unscripted', 'competition', 'personal drama', 'real-life', 'contestants', 'elimination'],
  'Talk Show': ['interview', 'host', 'guest', 'conversation', 'discussion', 'opinion', 'topical'],
  'News Program': ['current events', 'reporting', 'journalism', 'headlines', 'broadcast', 'anchors'],
  'Game Show': ['competition', 'contestants', 'prizes', 'questions', 'challenges', 'host', 'winning'],
  
  // Music content
  'Music Video': ['visual', 'performance', 'artistic', 'choreographed', 'song', 'artist', 'band'],
  'Concert': ['live performance', 'audience', 'stage', 'tour', 'band', 'venue', 'musical'],
  'Music Documentary': ['artist profile', 'behind-the-scenes', 'musical journey', 'band history'],
  
  // Educational content
  'Tutorial': ['step-by-step', 'instructional', 'how-to', 'demonstration', 'learning', 'skills'],
  'Lecture': ['educational', 'academic', 'informative', 'scholarly', 'professor', 'teaching'],
  'Educational Series': ['learning', 'informative', 'knowledge', 'educational', 'instructional'],
  
  // Sports content
  'Sports Event': ['competition', 'athletic', 'game', 'match', 'tournament', 'championship', 'players'],
  'Sports Documentary': ['athlete', 'team', 'competition', 'sports history', 'championship', 'profile'],
  
  // Specific production styles
  'Independent Film': ['artistic', 'low-budget', 'character-focused', 'creative', 'unique vision'],
  'Blockbuster': ['high-budget', 'spectacular', 'mainstream', 'special effects', 'commercial'],
  'Arthouse Film': ['experimental', 'artistic', 'unconventional', 'visionary', 'symbolic', 'abstract'],
  'Classic Cinema': ['timeless', 'iconic', 'influential', 'historic', 'golden age', 'masterpiece']
};

// Title patterns for different content types
const TITLE_PATTERNS = [
  // Action titles
  { pattern: "The [Adjective] [Noun]", contentTypes: ["Action Film", "Thriller"] },
  { pattern: "[Noun] of [Noun]", contentTypes: ["Action Film", "Fantasy", "Science Fiction"] },
  { pattern: "[Adjective] [Noun]", contentTypes: ["Action Film", "Thriller", "Drama"] },
  
  // Drama titles
  { pattern: "The [Noun]'s [Noun]", contentTypes: ["Drama", "Romance"] },
  { pattern: "[Noun] and [Noun]", contentTypes: ["Drama", "Romance"] },
  { pattern: "A [Adjective] [Noun]", contentTypes: ["Drama", "Independent Film"] },
  
  // Documentary titles
  { pattern: "The [Adjective] [Noun]: A [Noun] Story", contentTypes: ["Documentary"] },
  { pattern: "[Noun]: The [Adjective] Truth", contentTypes: ["Documentary"] },
  { pattern: "Inside the [Noun] of [Noun]", contentTypes: ["Documentary"] },
  
  // TV titles
  { pattern: "[Noun] [Noun]", contentTypes: ["TV Series", "Reality Show"] },
  { pattern: "The [Noun] [Noun]", contentTypes: ["TV Series", "Talk Show"] },
  { pattern: "[Person]'s [Noun]", contentTypes: ["Talk Show", "Game Show"] },
  
  // Music titles
  { pattern: "[Artist] - [Song]", contentTypes: ["Music Video", "Concert"] },
  { pattern: "[Artist]: Live at [Venue]", contentTypes: ["Concert"] },
  { pattern: "The [Adjective] Sound of [Artist]", contentTypes: ["Music Documentary"] },
  
  // Educational titles
  { pattern: "How to [Verb] a [Noun]", contentTypes: ["Tutorial"] },
  { pattern: "Understanding [Noun]: A [Adjective] Guide", contentTypes: ["Educational Series"] },
  { pattern: "The Science of [Noun]", contentTypes: ["Lecture", "Educational Series"] }
];

// Word banks for title generation
const WORD_BANKS = {
  Adjective: {
    Action: ['ultimate', 'extreme', 'deadly', 'dangerous', 'explosive', 'unstoppable', 'relentless'],
    Drama: ['lost', 'broken', 'beautiful', 'forgotten', 'silent', 'eternal', 'hidden'],
    Comedy: ['crazy', 'wild', 'hilarious', 'ridiculous', 'unexpected', 'absurd', 'outrageous'],
    Horror: ['haunted', 'terrifying', 'dark', 'cursed', 'sinister', 'deadly', 'nightmarish'],
    SciFi: ['quantum', 'interstellar', 'cybernetic', 'futuristic', 'galactic', 'advanced', 'virtual'],
    Documentary: ['untold', 'hidden', 'remarkable', 'extraordinary', 'authentic', 'revealing', 'definitive'],
    Educational: ['comprehensive', 'essential', 'practical', 'fundamental', 'advanced', 'complete', 'ultimate']
  },
  Noun: {
    Action: ['mission', 'warrior', 'vengeance', 'justice', 'assassin', 'hunter', 'agent', 'operation'],
    Drama: ['journey', 'heart', 'secret', 'promise', 'memory', 'dream', 'life', 'truth'],
    Comedy: ['disaster', 'adventure', 'night', 'vacation', 'wedding', 'family', 'plan', 'scheme'],
    Horror: ['shadow', 'darkness', 'nightmare', 'curse', 'haunting', 'evil', 'terror', 'possession'],
    SciFi: ['dimension', 'protocol', 'algorithm', 'system', 'planet', 'future', 'intelligence', 'code'],
    Documentary: ['story', 'truth', 'investigation', 'journey', 'revelation', 'legacy', 'history', 'world'],
    Music: ['rhythm', 'beat', 'sound', 'harmony', 'melody', 'voice', 'concert', 'performance'],
    Educational: ['guide', 'principles', 'fundamentals', 'techniques', 'strategies', 'methods', 'concepts']
  },
  Verb: ['master', 'create', 'build', 'understand', 'develop', 'transform', 'optimize', 'design'],
  Person: ['Dr.', 'Professor', 'Mr.', 'Ms.', 'Captain', 'Agent', 'Detective'],
  Artist: ['The Band', 'The Orchestra', 'The Ensemble', 'The Quartet', 'The Performers'],
  Venue: ['Madison Square Garden', 'Royal Albert Hall', 'The Arena', 'The Stadium', 'The Theater'],
  Song: ['Greatest Hits', 'Live Performance', 'In Concert', 'Unplugged', 'The Sessions']
};

// ML model for audio analysis
export async function analyzeAudio(file: File): Promise<{ 
  contentDescription: string; 
  contentType: string;
  contentSummary: string;
}> {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a blob URL for the file
      const fileURL = URL.createObjectURL(file);
      
      // Create an audio context
      const audioContext = new AudioContext();
      
      // Create an audio element to load the file
      const audioElement = document.createElement('audio');
      audioElement.crossOrigin = 'anonymous';
      audioElement.src = fileURL;
      
      // Wait for the audio to be loaded
      await new Promise((resolveLoad) => {
        audioElement.addEventListener('canplaythrough', resolveLoad, { once: true });
        audioElement.addEventListener('error', () => {
          resolveLoad(); // Resolve anyway to continue with fallback
        }, { once: true });
        audioElement.load();
      });
      
      // Create a media element source
      const source = audioContext.createMediaElementSource(audioElement);
      
      // Create an analyzer node for time domain data
      const timeAnalyzer = audioContext.createAnalyser();
      timeAnalyzer.fftSize = 2048;
      
      // Create an analyzer node for frequency domain data
      const freqAnalyzer = audioContext.createAnalyser();
      freqAnalyzer.fftSize = 2048;
      
      // Connect the source to both analyzers
      source.connect(timeAnalyzer);
      source.connect(freqAnalyzer);
      
      // Connect the analyzers to the destination (speakers)
      timeAnalyzer.connect(audioContext.destination);
      
      // Create buffers to receive the audio data
      const timeBufferLength = timeAnalyzer.frequencyBinCount;
      const timeDataArray = new Float32Array(timeBufferLength);
      
      const freqBufferLength = freqAnalyzer.frequencyBinCount;
      const freqDataArray = new Float32Array(freqBufferLength);
      
      // Play the audio (required to get data)
      await audioElement.play();
      
      // Collect audio data samples at different points in the file
      const samples = [];
      const sampleCount = 15; // Increased number of samples for better analysis
      
      // Calculate sample positions to get a better representation of the entire file
      const duration = audioElement.duration || 30; // Default to 30 seconds if duration is unknown
      const sampleInterval = Math.min(duration / sampleCount, 2); // Sample every 2 seconds or less
      
      for (let i = 0; i < sampleCount; i++) {
        // Set position in the audio file (spread samples throughout the file)
        const position = i * sampleInterval;
        if (position < duration) {
          audioElement.currentTime = position;
          
          // Wait for audio to be at the new position
          await new Promise(r => setTimeout(r, 300));
          
          // Get time domain data
          timeAnalyzer.getFloatTimeDomainData(timeDataArray);
          
          // Get frequency domain data
          freqAnalyzer.getFloatFrequencyData(freqDataArray);
          
          // Clone the data arrays for this sample
          samples.push({
            time: new Float32Array(timeDataArray),
            freq: new Float32Array(freqDataArray),
            position: position
          });
        }
      }
      
      // Stop the audio
      audioElement.pause();
      
      // Clean up
      URL.revokeObjectURL(fileURL);
      source.disconnect();
      timeAnalyzer.disconnect();
      freqAnalyzer.disconnect();
      await audioContext.close();
      
      // Process the collected samples
      const featureVectors = samples.map(sample => 
        extractAudioFeatures(sample.time, sample.freq, sample.position, duration)
      );
      
      // Aggregate features across samples
      const aggregatedFeatures = aggregateFeatures(featureVectors);
      
      // Classify content using ML model
      const classification = classifyContent(aggregatedFeatures);
      
      // Generate content description
      const contentDescription = generateContentDescription(classification, aggregatedFeatures);
      
      // Generate content type
      const contentType = determineContentType(classification, aggregatedFeatures);
      
      // Generate content summary with title suggestion
      const contentSummary = generateContentSummary(classification, contentType, file.filename);
      
      resolve({
        contentDescription,
        contentType,
        contentSummary
      });
      
    } catch (error) {
      console.error('Audio analysis error:', error);
      
      // Provide fallback values if analysis fails
      resolve({
        contentDescription: 'Audio content with mixed elements',
        contentType: 'Audiovisual content',
        contentSummary: 'This appears to be audiovisual content with various elements. The specific characteristics could not be fully analyzed.'
      });
    }
  });
}

function extractAudioFeatures(timeData: Float32Array, freqData: Float32Array, position: number, duration: number) {
  const features = {
    energy: 0,
    zeroCrossings: 0,
    spectralCentroid: 0,
    rhythmicPattern: 0,
    harmonicContent: 0,
    speechPattern: 0,
    musicPattern: 0,
    backgroundNoise: 0,
    dynamicRange: 0,
    tempo: 0,
    voicePresence: 0,
    emotionalIntensity: 0,
    bassEnergy: 0,
    midEnergy: 0,
    trebleEnergy: 0,
    spectralFlatness: 0,
    spectralRolloff: 0,
    positionInFile: position / duration // Normalized position in file (0-1)
  };
  
  // Calculate energy (overall volume)
  features.energy = timeData.reduce((sum, sample) => sum + (sample * sample), 0) / timeData.length;
  
  // Calculate zero crossings (frequency content)
  for (let i = 1; i < timeData.length; i++) {
    if ((timeData[i] >= 0 && timeData[i - 1] < 0) || 
        (timeData[i] < 0 && timeData[i - 1] >= 0)) {
      features.zeroCrossings++;
    }
  }
  features.zeroCrossings /= timeData.length;
  
  // Calculate rhythmic pattern (beat detection)
  let beatSum = 0;
  const frameSize = 1024;
  for (let i = 0; i < timeData.length - frameSize; i += frameSize) {
    const frame = timeData.slice(i, i + frameSize);
    const frameEnergy = frame.reduce((sum, sample) => sum + Math.abs(sample), 0);
    beatSum += frameEnergy > 0.1 ? 1 : 0;
  }
  features.rhythmicPattern = beatSum / (timeData.length / frameSize);
  
  // Calculate harmonic content
  let harmonicSum = 0;
  for (let i = 0; i < timeData.length - 1; i++) {
    harmonicSum += Math.abs(timeData[i] - timeData[i + 1]);
  }
  features.harmonicContent = 1 - (harmonicSum / timeData.length);

  // Calculate speech pattern (typical speech frequency range)
  let speechSum = 0;
  for (let i = 0; i < timeData.length - frameSize; i += frameSize) {
    const frame = timeData.slice(i, i + frameSize);
    const frameEnergy = frame.reduce((sum, sample) => sum + Math.abs(sample), 0);
    if (frameEnergy > 0.05 && frameEnergy < 0.3) {
      speechSum++;
    }
  }
  features.speechPattern = speechSum / (timeData.length / frameSize);

  // Calculate music pattern (consistent rhythm and harmony)
  features.musicPattern = features.rhythmicPattern * features.harmonicContent;

  // Calculate background noise
  features.backgroundNoise = Math.min(...Array.from(timeData).map(Math.abs));

  // Calculate dynamic range
  const max = Math.max(...Array.from(timeData).map(Math.abs));
  const min = Math.min(...Array.from(timeData).map(Math.abs));
  features.dynamicRange = max - min;
  
  // Estimate tempo
  features.tempo = estimateTempo(timeData);
  
  // Estimate voice presence
  features.voicePresence = estimateVoicePresence(timeData, features.zeroCrossings);
  
  // Estimate emotional intensity
  features.emotionalIntensity = features.energy * features.dynamicRange;
  
  // Calculate frequency band energies from frequency data
  const bassRange = [20, 250];
  const midRange = [250, 4000];
  const trebleRange = [4000, 20000];
  
  // Normalize frequency data (convert from dB to linear scale)
  const normalizedFreqData = Array.from(freqData).map(db => Math.pow(10, db / 20));
  
  // Calculate energy in different frequency bands
  features.bassEnergy = calculateBandEnergy(normalizedFreqData, bassRange, 44100, freqData.length);
  features.midEnergy = calculateBandEnergy(normalizedFreqData, midRange, 44100, freqData.length);
  features.trebleEnergy = calculateBandEnergy(normalizedFreqData, trebleRange, 44100, freqData.length);
  
  // Calculate spectral flatness (measure of how noise-like vs. tone-like the sound is)
  features.spectralFlatness = calculateSpectralFlatness(normalizedFreqData);
  
  // Calculate spectral rolloff (frequency below which 85% of the spectrum's energy is contained)
  features.spectralRolloff = calculateSpectralRolloff(normalizedFreqData, 0.85);
  
  return features;
}

function calculateBandEnergy(freqData: number[], range: number[], sampleRate: number, fftSize: number): number {
  // Convert frequency range to bin indices
  const binWidth = sampleRate / (fftSize * 2);
  const startBin = Math.floor(range[0] / binWidth);
  const endBin = Math.min(Math.ceil(range[1] / binWidth), freqData.length - 1);
  
  // Calculate energy in the specified range
  let energy = 0;
  for (let i = startBin; i <= endBin; i++) {
    energy += freqData[i] * freqData[i];
  }
  
  // Normalize by the number of bins
  return energy / (endBin - startBin + 1);
}

function calculateSpectralFlatness(freqData: number[]): number {
  // Avoid zeros which would make geometric mean zero
  const nonZeroData = freqData.map(val => Math.max(val, 1e-10));
  
  // Calculate geometric mean
  const geometricMean = Math.exp(
    nonZeroData.reduce((sum, val) => sum + Math.log(val), 0) / nonZeroData.length
  );
  
  // Calculate arithmetic mean
  const arithmeticMean = nonZeroData.reduce((sum, val) => sum + val, 0) / nonZeroData.length;
  
  // Return the ratio (will be between  ```typescript
  // Return the ratio (will be between 0 and 1)
  return geometricMean / arithmeticMean;
}

function calculateSpectralRolloff(freqData: number[], percentile: number): number {
  // Calculate total energy
  const totalEnergy = freqData.reduce((sum, val) => sum + val, 0);
  
  // Find the bin where the cumulative energy exceeds the percentile
  let cumulativeEnergy = 0;
  for (let i = 0; i < freqData.length; i++) {
    cumulativeEnergy += freqData[i];
    if (cumulativeEnergy >= totalEnergy * percentile) {
      return i / freqData.length; // Return normalized bin index (0-1)
    }
  }
  
  return 1.0; // Default if not found
}

function estimateTempo(audioData: Float32Array): number {
  // Simple tempo estimation based on energy peaks
  const frameSize = 1024;
  const energies: number[] = [];
  
  for (let i = 0; i < audioData.length - frameSize; i += frameSize) {
    const frame = audioData.slice(i, i + frameSize);
    const energy = frame.reduce((sum, sample) => sum + (sample * sample), 0);
    energies.push(energy);
  }
  
  // Find peaks in energy
  const peaks: number[] = [];
  for (let i = 1; i < energies.length - 1; i++) {
    if (energies[i] > energies[i-1] && energies[i] > energies[i+1] && energies[i] > 0.1) {
      peaks.push(i);
    }
  }
  
  // Calculate average distance between peaks
  let totalDistance = 0;
  for (let i = 1; i < peaks.length; i++) {
    totalDistance += peaks[i] - peaks[i-1];
  }
  
  const averageDistance = peaks.length > 1 ? totalDistance / (peaks.length - 1) : 0;
  
  // Convert to BPM (assuming 44.1kHz sample rate)
  const framesPerSecond = 44100 / frameSize;
  const beatsPerSecond = framesPerSecond / averageDistance;
  const beatsPerMinute = beatsPerSecond * 60;
  
  return beatsPerMinute || 0;
}

function estimateVoicePresence(audioData: Float32Array, zeroCrossings: number): number {
  // Human voice typically has specific zero-crossing rate and energy distribution
  const typicalVoiceZCR = 0.05; // Typical zero-crossing rate for voice
  const zcDifference = Math.abs(zeroCrossings - typicalVoiceZCR);
  
  // Calculate energy in voice frequency range (300-3000 Hz)
  // This is a simplified approximation
  let voiceRangeEnergy = 0;
  const frameSize = 1024;
  
  for (let i = 0; i < audioData.length - frameSize; i += frameSize) {
    const frame = audioData.slice(i, i + frameSize);
    const energy = frame.reduce((sum, sample) => sum + (sample * sample), 0);
    voiceRangeEnergy += energy;
  }
  
  voiceRangeEnergy /= (audioData.length / frameSize);
  
  // Combine metrics for voice presence estimation
  return (1 - zcDifference) * voiceRangeEnergy;
}

function aggregateFeatures(featureVectors: any[]): any {
  if (featureVectors.length === 0) return {};
  
  const aggregated: any = {};
  const keys = Object.keys(featureVectors[0]);
  
  for (const key of keys) {
    // Calculate mean
    const values = featureVectors.map(fv => fv[key]);
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    // Calculate variance
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    
    // Calculate trend (correlation with position in file)
    const positions = featureVectors.map(fv => fv.positionInFile);
    const trend = calculateCorrelation(positions, values);
    
    aggregated[key] = {
      mean,
      variance,
      min: Math.min(...values),
      max: Math.max(...values),
      trend,
      values // Keep all values for more detailed analysis
    };
  }
  
  return aggregated;
}

function calculateCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length === 0) return 0;
  
  // Calculate means
  const xMean = x.reduce((sum, val) => sum + val, 0) / x.length;
  const yMean = y.reduce((sum, val) => sum + val, 0) / y.length;
  
  // Calculate covariance and variances
  let covariance = 0;
  let xVariance = 0;
  let yVariance = 0;
  
  for (let i = 0; i < x.length; i++) {
    const xDiff = x[i] - xMean;
    const yDiff = y[i] - yMean;
    covariance += xDiff * yDiff;
    xVariance += xDiff * xDiff;
    yVariance += yDiff * yDiff;
  }
  
  // Calculate correlation coefficient
  if (xVariance === 0 || yVariance === 0) return 0;
  return covariance / (Math.sqrt(xVariance) * Math.sqrt(yVariance));
}

function classifyContent(features: any): any {
  // Calculate similarity scores with training data
  const scores = TRAINING_DATA.map(trainItem => {
    let similarity = 0;
    let totalWeight = 0;
    
    // Compare each feature with appropriate weights
    for (const [feature, weight] of Object.entries({
      energy: 1.0,
      dynamicRange: 0.8,
      rhythmicPattern: 0.9,
      speechPattern: 1.2,
      harmonicContent: 0.7,
      backgroundNoise: 0.5,
      tempo: 0.6,
      voicePresence: 1.1,
      emotionalIntensity: 0.9,
      bassEnergy: 0.7,
      midEnergy: 0.8,
      trebleEnergy: 0.6,
      spectralFlatness: 0.5,
      spectralRolloff: 0.6
    })) {
      if (features[feature] && trainItem.features[feature as keyof typeof trainItem.features] !== undefined) {
        // Calculate similarity based on how close the feature is to the training data
        const featureDiff = 1 - Math.abs(features[feature].mean - trainItem.features[feature as keyof typeof trainItem.features]);
        similarity += featureDiff * (weight as number);
        totalWeight += (weight as number);
      }
    }
    
    // Calculate final similarity score (normalized)
    const finalScore = totalWeight > 0 ? similarity / totalWeight : 0;
    
    return {
      category: trainItem.category,
      keywords: trainItem.keywords,
      score: finalScore
    };
  });
  
  // Sort by score
  scores.sort((a, b) => b.score - a.score);
  
  // Get top matches
  const topMatches = scores.slice(0, 3);
  
  // Find content descriptors that match the audio profile
  const descriptorMatches: {type: string, score: number}[] = [];
  
  for (const [type, keywords] of Object.entries(CONTENT_DESCRIPTORS)) {
    let matchScore = 0;
    
    // Check if audio features match this content type
    if (type.includes('Action') && features.energy.mean > 0.7) matchScore += 0.3;
    if (type.includes('Drama') && features.emotionalIntensity.mean > 0.6) matchScore += 0.3;
    if (type.includes('Horror') && features.dynamicRange.mean > 0.7) matchScore += 0.3;
    if (type.includes('Comedy') && features.speechPattern.mean > 0.7) matchScore += 0.3;
    if (type.includes('Documentary') && features.speechPattern.mean > 0.8) matchScore += 0.4;
    if (type.includes('Music') && features.musicPattern.mean > 0.6) matchScore += 0.4;
    if (type.includes('TV') && features.speechPattern.mean > 0.7) matchScore += 0.3;
    if (type.includes('Educational') && features.speechPattern.mean > 0.8) matchScore += 0.3;
    if (type.includes('Sports') && features.energy.trend > 0.3) matchScore += 0.3;
    
    // Add to matches if score is significant
    if (matchScore > 0.2) {
      descriptorMatches.push({
        type,
        score: matchScore
      });
    }
  }
  
  // Sort descriptor matches
  descriptorMatches.sort((a, b) => b.score - a.score);
  
  return {
    primaryCategory: topMatches[0],
    secondaryCategories: topMatches.slice(1),
    contentDescriptors: descriptorMatches.slice(0, 2),
    allScores: scores // Keep all scores for more detailed analysis
  };
}

function generateContentDescription(classification: any, features: any): string {
  const { primaryCategory, secondaryCategories, contentDescriptors } = classification;
  
  // Base description from primary category
  let description = primaryCategory.category;
  
  // Add qualifiers based on feature intensity
  if (features.energy.mean > 0.7) {
    description = `High-energy ${description.toLowerCase()}`;
  } else if (features.energy.mean < 0.3) {
    description = `Calm ${description.toLowerCase()}`;
  }
  
  if (features.speechPattern.mean > 0.8) {
    description += " with significant dialogue";
  }
  
  if (features.musicPattern.mean > 0.7) {
    description += " with prominent musical elements";
  }
  
  if (features.dynamicRange.mean > 0.8) {
    description += ", featuring dramatic dynamic range";
  }
  
  // Add trend information
  if (features.energy.trend > 0.5) {
    description += " that builds in intensity";
  } else if (features.energy.trend < -0.5) {
    description += " that gradually becomes calmer";
  }
  
  // Add secondary category influence if score is close
  if (secondaryCategories.length > 0 && secondaryCategories[0].score > 0.7) {
    description += ` with elements of ${secondaryCategories[0].category.toLowerCase()}`;
  }
  
  // Add content descriptor if available
  if (contentDescriptors.length > 0) {
    description += `, reminiscent of ${contentDescriptors[0].type}`;
  }
  
  return description;
}

function determineContentType(classification: any, features: any): string {
  const { primaryCategory, contentDescriptors } = classification;
  
  // Start with base content type
  let contentType = "";
  
  // Determine if it's likely a film, TV show, documentary, or music
  if (features.speechPattern.mean > 0.7 && features.dynamicRange.mean > 0.6) {
    if (features.energy.mean > 0.6) {
      contentType = "Action-oriented film";
    } else {
      contentType = "Dramatic film";
    }
  } else if (features.speechPattern.mean > 0.8 && features.dynamicRange.mean < 0.5) {
    contentType = "Television program";
  } else if (features.speechPattern.mean > 0.8 && features.musicPattern.mean < 0.3) {
    contentType = "Documentary or interview";
  } else if (features.musicPattern.mean > 0.7) {
    contentType = "Musical content";
  } else {
    contentType = "Audiovisual content";
  }
  
  // Add more specificity from content descriptors
  if (contentDescriptors.length > 0) {
    contentType = `${contentDescriptors[0].type}-style ${contentType.toLowerCase()}`;
  }
  
  // Add primary category influence
  contentType += ` featuring ${primaryCategory.category.toLowerCase()}`;
  
  return contentType;
}

function generateContentSummary(classification: any, contentType: string, filename: string): string {
  const { primaryCategory, secondaryCategories, contentDescriptors, allScores } = classification;
  
  // Create a summary using keywords from the categories
  const allKeywords = [
    ...primaryCategory.keywords,
    ...(secondaryCategories.length > 0 ? secondaryCategories[0].keywords : [])
  ];
  
  // Get top terms
  const topTerms = allKeywords.slice(0, 5);
  
  // Generate title suggestion based on content type
  const suggestedTitle = generateTitleSuggestion(contentType, primaryCategory, secondaryCategories, filename);
  
  // Generate summary
  let summary = `This appears to be a ${contentType} that can be described as `;
  
  // Add keywords in a natural way
  summary += topTerms.slice(0, -1).join(', ') + ' and ' + topTerms[topTerms.length - 1];
  
  // Add additional context
  summary += `. The content primarily features ${primaryCategory.category.toLowerCase()}`;
  
  if (secondaryCategories.length > 0 && secondaryCategories[0].score > 0.6) {
    summary += ` with elements of ${secondaryCategories[0].category.toLowerCase()}`;
  }
  
  // Add title suggestion
  if (suggestedTitle) {
    summary += `.\n\nSuggested title: "${suggestedTitle}"`;
  }
  
  // Add confidence information
  const confidence = Math.round(primaryCategory.score * 100);
  summary += `\n\nAnalysis confidence: ${confidence}%`;
  
  return summary;
}

function generateTitleSuggestion(contentType: string, primaryCategory: any, secondaryCategories: any[], filename: string): string {
  // Try to extract a title from the filename first
  const filenameTitle = extractTitleFromFilename(filename);
  if (filenameTitle) {
    return filenameTitle;
  }
  
  // Find matching content descriptors
  let matchingDescriptors: string[] = [];
  for (const [type, _] of Object.entries(CONTENT_DESCRIPTORS)) {
    if (contentType.toLowerCase().includes(type.toLowerCase())) {
      matchingDescriptors.push(type);
    }
  }
  
  // If no direct matches, use the primary category
  if (matchingDescriptors.length === 0) {
    matchingDescriptors = [primaryCategory.category];
  }
  
  // Find matching title patterns
  const matchingPatterns = TITLE_PATTERNS.filter(pattern => 
    pattern.contentTypes.some(type => 
      matchingDescriptors.some(descriptor => 
        descriptor.toLowerCase().includes(type.toLowerCase())
      )
    )
  );
  
  // If no matching patterns, use a generic pattern
  if (matchingPatterns.length === 0) {
    return generateGenericTitle(primaryCategory, secondaryCategories);
  }
  
  // Select a random pattern from matching patterns
  const selectedPattern = matchingPatterns[Math.floor(Math.random() * matchingPatterns.length)];
  
  // Generate title based on pattern
  return fillTitlePattern(selectedPattern.pattern, primaryCategory, secondaryCategories);
}

function extractTitleFromFilename(filename: string): string | null {
  // Remove file extension
  const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
  
  // Remove common prefixes and suffixes
  const cleanName = nameWithoutExtension
    .replace(/^\d+[-_\s]*/, '') // Remove leading numbers
    .replace(/[-_\s]+(final|draft|v\d+|edit)$/i, '') // Remove common suffixes
    .replace(/[-_]/g, ' '); // Replace underscores and hyphens with spaces
  
  // If the name is too short or looks like a generic name, return null
  if (cleanName.length < 3 || /^(video|movie|clip|file|untitled)/i.test(cleanName)) {
    return null;
  }
  
  // Capitalize words properly
  const properTitle = cleanName.replace(/\b\w/g, c => c.toUpperCase());
  
  return properTitle;
}

function generateGenericTitle(primaryCategory: any, secondaryCategories: any[]): string {
  // Get adjectives and nouns based on the primary category
  let categoryType = 'Drama'; // Default
  
  if (primaryCategory.category.includes('Action')) categoryType = 'Action';
  else if (primaryCategory.category.includes('Comedy')) categoryType = 'Comedy';
  else if (primaryCategory.category.includes('Horror')) categoryType = 'Horror';
  else if (primaryCategory.category.includes('Science Fiction')) categoryType = 'SciFi';
  else if (primaryCategory.category.includes('Documentary')) categoryType = 'Documentary';
  else if (primaryCategory.category.includes('Educational')) categoryType = 'Educational';
  
  const adjectives = WORD_BANKS.Adjective[categoryType as keyof typeof WORD_BANKS.Adjective];
  const nouns = WORD_BANKS.Noun[categoryType as keyof typeof WORD_BANKS.Noun];
  
  // Select random words
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  // Generate title
  return `The ${adjective} ${noun}`;
}

function fillTitlePattern(pattern: string, primaryCategory: any, secondaryCategories: any[]): string {
  // Determine the category type for word selection
  let categoryType = 'Drama'; // Default
  
  if (primaryCategory.category.includes('Action')) categoryType = 'Action';
  else if (primaryCategory.category.includes('Comedy')) categoryType = 'Comedy';
  else if (primaryCategory.category.includes('Horror')) categoryType = 'Horror';
  else if (primaryCategory.category.includes('Science Fiction')) categoryType = 'SciFi';
  else if (primaryCategory.category.includes('Documentary')) categoryType = 'Documentary';
  else if (primaryCategory.category.includes('Educational')) categoryType = 'Educational';
  
  // Replace placeholders in the pattern
  return pattern.replace(/\[(.*?)\]/g, (match, placeholder) => {
    if (placeholder === 'Adjective') {
      const adjectives = WORD_BANKS.Adjective[categoryType as keyof typeof WORD_BANKS.Adjective];
      return adjectives[Math.floor(Math.random() * adjectives.length)];
    } 
    else if (placeholder === 'Noun') {
      const nouns = WORD_BANKS.Noun[categoryType as keyof typeof WORD_BANKS.Noun];
      return nouns[Math.floor(Math.random() * nouns.length)];
    }
    else if (placeholder === 'Verb') {
      return WORD_BANKS.Verb[Math.floor(Math.random() * WORD_BANKS.Verb.length)];
    }
    else if (placeholder === 'Person') {
      return WORD_BANKS.Person[Math.floor(Math.random() * WORD_BANKS.Person.length)];
    }
    else if (placeholder === 'Artist') {
      return WORD_BANKS.Artist[Math.floor(Math.random() * WORD_BANKS.Artist.length)];
    }
    else if (placeholder === 'Venue') {
      return WORD_BANKS.Venue[Math.floor(Math.random() * WORD_BANKS.Venue.length)];
    }
    else if (placeholder === 'Song') {
      return WORD_BANKS.Song[Math.floor(Math.random() * WORD_BANKS.Song.length)];
    }
    return match; // Return the original if no match
  });
}