import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getCapacity, embedMessage, getMetrics } from "@/api/stego";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import ImageDropzone from "./image-dropzone";
import { toast } from "sonner";
import { Progress } from "./ui/progress";
import { Spinner } from "./ui/spinner";
import { Skeleton } from "./ui/skeleton";
import { DownloadIcon } from "@phosphor-icons/react";
import PasswordInput from "./password-input";
import type { MetricsResponse } from "@/types/stego";

export default function EmbedForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);

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
    onMutate: () => {
      setMetrics(null);
    },

    onSuccess: async ({ blob, filename }) => {
      const url = URL.createObjectURL(blob);
      setStego((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { url, filename };
      });

      // compute metrics
      const stegoFile = new File([blob], filename, { type: blob.type });
      try {
        const m = await getMetrics(file!, stegoFile);
        setMetrics(m);
      } catch {
        // non-critical, silently ignore
      }
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
    setMetrics(null);
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
      <div className="space-y-4">
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

        {metrics && (
          <div className="animate-in fade-in slide-in-from-bottom-2 grid grid-cols-3 gap-2 duration-300">
            {[
              { label: "MSE", value: metrics.mse.toFixed(4) },
              { label: "PSNR", value: `${metrics.psnr.toFixed(2)} dB` },
              { label: "SSIM", value: metrics.ssim.toFixed(4) },
            ].map(({ label, value }, i) => (
              <div
                key={label}
                className="bg-muted animate-in fade-in slide-in-from-bottom-2 rounded-lg p-3 text-center duration-300"
                style={{ animationDelay: `${i * 75}ms` }}
              >
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="mt-1 font-mono text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <PasswordInput
          id="password"
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

      <Button
        type="submit"
        className="w-full"
        disabled={isPending || !file || !message.trim() || !password.trim()}
      >
        {isPending && <Spinner />}
        {isPending ? "Embedding..." : "Embed"}
      </Button>
    </form>
  );
}
