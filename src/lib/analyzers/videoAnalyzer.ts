//VideoAnalyzer.ts
export async function extractVideoMetadata(file: File) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");

    // Set cross-origin to anonymous to handle potential CORS issues
    video.crossOrigin = "anonymous";
    video.preload = "metadata";

    // Create object URL with proper type
    const fileType = file.type || inferVideoType(file.name);
    const blob = new Blob([file], { type: fileType });
    const objectUrl = URL.createObjectURL(blob);

    const timeoutId = setTimeout(() => {
      cleanup();
      resolve({
        duration: 0,
        width: 0,
        height: 0,
        error: "Metadata extraction timeout",
      });
    }, 10000); // 10 second timeout

    function cleanup() {
      URL.revokeObjectURL(objectUrl);
      clearTimeout(timeoutId);
      video.removeEventListener("loadedmetadata", onMetadataLoaded);
      video.removeEventListener("error", onError);
    }

    function onMetadataLoaded() {
      cleanup();
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
      });
    }

    function onError(e: ErrorEvent) {
      cleanup();
      // Fallback to MediaSource if direct playback fails
      if (window.MediaSource && MediaSource.isTypeSupported(fileType)) {
        tryMediaSourceExtensions(file)
          .then(resolve)
          .catch(() => {
            resolve({
              duration: 0,
              width: 0,
              height: 0,
              error: `Format not supported: ${fileType}`,
            });
          });
      } else {
        resolve({
          duration: 0,
          width: 0,
          height: 0,
          error: e.error?.message || "Unknown error processing video",
        });
      }
    }

    video.addEventListener("loadedmetadata", onMetadataLoaded);
    video.addEventListener("error", onError);
    video.src = objectUrl;
  });
}

async function tryMediaSourceExtensions(file: File) {
  return new Promise((resolve, reject) => {
    const mediaSource = new MediaSource();
    const video = document.createElement("video");
    const url = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener("sourceopen", async () => {
      try {
        const sourceBuffer = mediaSource.addSourceBuffer(file.type);
        const data = await file.arrayBuffer();

        sourceBuffer.addEventListener("updateend", () => {
          if (!video.duration) {
            reject(new Error("Could not determine video duration"));
            return;
          }

          resolve({
            duration: video.duration,
            width: video.videoWidth,
            height: video.videoHeight,
          });

          URL.revokeObjectURL(url);
        });

        sourceBuffer.addEventListener("error", () => {
          reject(new Error("Error processing video data"));
          URL.revokeObjectURL(url);
        });

        sourceBuffer.appendBuffer(data);
      } catch (error) {
        reject(error);
        URL.revokeObjectURL(url);
      }
    });

    video.src = url;
  });
}

function inferVideoType(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    mp4: "video/mp4",
    webm: "video/webm",
    ogg: "video/ogg",
    mov: "video/quicktime",
    mkv: "video/x-matroska",
    avi: "video/x-msvideo",
    flv: "video/x-flv",
    "3gp": "video/3gpp",
    "3g2": "video/3gpp2",
    wmv: "video/x-ms-wmv",
    m4v: "video/x-m4v",
    ts: "video/MP2T",
    m3u8: "application/x-mpegURL",
  };

  return mimeTypes[extension || ""] || "video/mp4";
}
