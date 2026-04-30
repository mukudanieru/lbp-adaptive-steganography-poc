import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { getCapacity, embedMessage } from "@/api/stego";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import ImageDropzone from "./image-dropzone";

export default function EmbedForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [capacity, setCapacity] = useState(0);

  const capacityMutation = useMutation({
    mutationFn: getCapacity,
    onSuccess: (data) => {
      setCapacity(data.capacity_chars);
    },
  });

  const embedMutation = useMutation({
    mutationFn: ({
      image,
      message,
      password,
    }: {
      image: File;
      message: string;
      password: string;
    }) => embedMessage(image, message, password),

    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "embedded.png";
      a.click();

      URL.revokeObjectURL(url);
    },
  });

  const used = message.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    embedMutation.mutate({
      image: file,
      message,
      password,
    });
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      {/* ✅ DROPZONE (replaced) */}
      <ImageDropzone
        preview={preview}
        onDrop={(file, url) => {
          setFile(file);
          setPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return url;
          });
          capacityMutation.mutate(file);
        }}
      />

      {/* PASSWORD */}
      <Input
        type="password"
        placeholder="Password"
        className="w-full rounded border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* MESSAGE */}
      <div>
        <Textarea
          placeholder="Secret message"
          className="w-full rounded border p-2"
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= capacity) {
              setMessage(e.target.value);
            }
          }}
        />

        {/* CAPACITY DISPLAY */}
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>Limit: {capacity} chars</span>
          <span>
            {used} / {capacity}
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-2 h-1 w-full rounded bg-gray-200">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{
              width: capacity ? `${(used / capacity) * 100}%` : "0%",
            }}
          />
        </div>
      </div>

      {/* SUBMIT */}
      <Button
        type="submit"
        disabled={embedMutation.isPending}
        className="w-full"
      >
        {embedMutation.isPending ? "Embedding..." : "Submit"}
      </Button>
    </form>
  );
}
