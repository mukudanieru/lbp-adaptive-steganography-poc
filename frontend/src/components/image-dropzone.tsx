import { ImageIcon } from "@phosphor-icons/react";
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/bmp": [".bmp"],
      "image/tiff": [".tiff", ".tif"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`relative size-64 cursor-pointer overflow-hidden rounded-lg border-2 border-dashed transition-colors ${
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      }`}
    >
      <input {...getInputProps()} />

      {preview ? (
        <>
          <img
            src={preview}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="bg-background/70 text-foreground absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity hover:opacity-100">
            <ImageIcon className="h-6 w-6" />
            <span className="text-sm font-medium">Replace image</span>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="bg-muted rounded-full p-3">
            <ImageIcon className="text-muted-foreground h-6 w-6" />
          </div>
          <div>
            <p className="text-foreground text-sm font-medium">
              {isDragActive ? "Drop image here" : "Drag & drop an image"}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              PNG, BMP, or TIFF &mdash; 512 × 512 px
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
