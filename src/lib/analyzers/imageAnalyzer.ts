export async function extractImageMetadata(file: File) {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve({
        width: img.width,
        height: img.height
      });
    };
    
    img.src = URL.createObjectURL(file);
  });
}