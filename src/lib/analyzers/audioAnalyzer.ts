import axios from "axios";
import { API_CONFIG } from "../config/config";

const API_BASE_URL = API_CONFIG.BASE_URL;

export async function analyzeAudio(file: File): Promise<{
  contentDescription: string;
  contentType: string;
  contentSummary: string;
}> {
  try {
    // Use your backend's unified analyze_media endpoint
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await axios.post(
      `${API_BASE_URL}/analyze_media`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    // Extract the response data which should match your backend format
    const { contentDescription, contentType, contentSummary } = response.data;
    
    return {
      contentDescription: contentDescription || "No speech detected",
      contentType: contentType || "Unknown",
      contentSummary: contentSummary || "No summary available",
    };
  } catch (error) {
    console.error("Audio analysis error:", error);
    return {
      contentDescription: "Audio content analysis failed",
      contentType: "Unknown",
      contentSummary: "Unable to analyze audio content due to an error.",
    };
  }
}

// Optional: If you need to call individual endpoints separately
export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await axios.post(
    `${API_BASE_URL}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  
  return response.data.upload_url;
}

export async function getTranscription(audioUrl: string): Promise<string> {
  // First, start the transcription
  const transcriptResponse = await axios.post(
    `${API_BASE_URL}/transcript`,
    {
      audio_url: audioUrl,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const transcriptId = transcriptResponse.data.id;

  // Poll for results
  while (true) {
    const statusResponse = await axios.get(
      `${API_BASE_URL}/transcript/${transcriptId}`
    );

    const status = statusResponse.data.status;
    if (status === "completed") {
      return statusResponse.data.text;
    } else if (status === "failed" || status === "error") {
      throw new Error("Transcription failed");
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

export async function generateSummary(transcript: string, features: any): Promise<string> {
  if (!transcript) {
    return `This media contains ${features.duration.toFixed(1)} seconds of audio with ${
      features.energy > 0.1 ? "active" : "minimal"
    } sound levels. No speech was detected.`;
  }

  try {
    // Use your backend's summarize endpoint
    const response = await axios.post(
      `${API_BASE_URL}/summarize`,
      {
        transcript,
        features,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.summary;
  } catch (error) {
    console.error("Summarization error:", error);
    // Fallback to basic summary if API fails
    const sentences = transcript.match(/[^\.!\?]+[\.!\?]+/g) || [transcript];
    const summarySentences = sentences
      .slice(0, Math.min(3, sentences.length))
      .map((s) => s.trim())
      .join(" ");
    return `${summarySentences} The audio lasts ${features.duration.toFixed(1)} seconds.`;
  }
}