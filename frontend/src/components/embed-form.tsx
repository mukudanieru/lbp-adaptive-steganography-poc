import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getCapacity, embedMessage } from "@/api/stego";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import ImageDropzone from "./image-dropzone";
import { toast } from "sonner";
import { Progress } from "./ui/progress";
import { Spinner } from "./ui/spinner";
import { Skeleton } from "./ui/skeleton";
import { DownloadIcon } from "@phosphor-icons/react";

export default function EmbedForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [stego, setStego] = useState<{
    url: string;
    filename: string;
  } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["capacity", file?.name, file?.size, file?.lastModified],
    queryFn: () => getCapacity(file!),
    enabled: !!file,
    staleTime: Infinity,
  });

  const capacity = data?.capacity_chars ?? 0;
  const used = message.length;

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      image,
      message,
      password,
    }: {
      image: File;
      message: string;
      password: string;
    }) => embedMessage(image, message, password),

    onSuccess: ({ blob, filename }) => {
      const url = URL.createObjectURL(blob);
      setStego((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { url, filename };
      });
    },

    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to embed message.");
    },
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!file) return;
    mutate({ image: file, message, password });
  };

  const handleDrop = (file: File, url: string) => {
    setFile(file);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    setStego(null);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleDownload = () => {
    if (!stego) return;
    const a = document.createElement("a");
    a.href = stego.url;
    a.download = stego.filename;
    a.click();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="flex flex-col items-center space-y-1">
          <p className="text-sm font-medium">Cover image</p>
          <ImageDropzone preview={preview} onDrop={handleDrop} />
        </div>

        {(isPending || stego) && (
          <div className="flex flex-col items-center space-y-1">
            <p className="text-sm font-medium">Stego image</p>
            {isPending ? (
              <Skeleton className="size-64 rounded-lg" />
            ) : (
              <div
                role="button"
                onClick={handleDownload}
                className="border-border relative size-64 cursor-pointer overflow-hidden rounded-lg border-2"
              >
                <img
                  src={stego!.url}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="bg-background/70 text-foreground absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity hover:opacity-100">
                  <DownloadIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">Download</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <Textarea
          id="message"
          placeholder="Secret message"
          value={message}
          disabled={!file || isLoading}
          onChange={(e) => {
            const next = e.target.value;
            if (!capacity || next.length <= capacity) {
              setMessage(next);
            }
          }}
        />
        {file && (
          <FieldDescription>
            {isLoading
              ? "Calculating capacity..."
              : `${used} / ${capacity} characters`}
          </FieldDescription>
        )}
        {file && !isLoading && (
          <Progress
            value={capacity ? Math.min((used / capacity) * 100, 100) : 0}
            className="h-1"
          />
        )}
      </Field>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending && <Spinner />}
        {isPending ? "Embedding..." : "Embed"}
      </Button>
    </form>
  );
}
