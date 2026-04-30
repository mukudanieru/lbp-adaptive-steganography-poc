import { extractMessage } from "@/api/stego";
import ImageDropzone from "@/components/image-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { CopyIcon, CheckIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function ExtractForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ image, password }: { image: File; password: string }) =>
      extractMessage(image, password),
    onSuccess: (data) => {
      setMessage(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to extract message.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    mutate({ image: file, password });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex flex-col items-center space-y-1">
        <p className="text-sm font-medium">Stego image</p>
        <ImageDropzone
          preview={preview}
          onDrop={(file, url) => {
            setFile(file);
            setPreview((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return url;
            });
          }}
        />
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

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending && <Spinner />}
        {isPending ? "Extracting..." : "Extract"}
      </Button>

      {message && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs font-medium tracking-wide">
              Extracted message
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-6 gap-1 px-2 text-xs"
            >
              {copied ? (
                <CheckIcon className="h-3 w-3" />
              ) : (
                <CopyIcon className="h-3 w-3" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <p className="text-sm wrap-break-word whitespace-pre-wrap">
            {message}
          </p>
        </div>
      )}
    </form>
  );
}
