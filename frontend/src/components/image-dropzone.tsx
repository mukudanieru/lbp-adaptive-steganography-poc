import { useDropzone } from "react-dropzone";

type ImageDropzoneProps = {
  preview?: string | null;
  onDrop: (file: File, previewUrl: string) => void;
};

export default function ImageDropzone({ preview, onDrop }: ImageDropzoneProps) {
  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    onDrop(file, url);
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop: handleDrop,
      multiple: false,
      accept: {
        "image/png": [".png"],
        "image/bmp": [".bmp"],
        "image/tiff": [".tiff", ".tif"],
      },
    });

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        {...getRootProps()}
        className={`relative flex h-64 w-64 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed ${
          isDragActive ? "border-blue-400" : ""
        }`}
      >
        <input {...getInputProps()} />

        {preview && (
          <img
            src={preview}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm text-white opacity-0 transition hover:opacity-100">
          Drop PNG, BMP, or TIFF image
        </div>
      </div>

      {/* 🔹 basic error feedback */}
      {fileRejections.length > 0 && (
        <p className="text-sm text-red-500">
          Only PNG, BMP, or TIFF images are allowed.
        </p>
      )}
    </div>
  );
}
