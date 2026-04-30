import { api } from "@/lib/api";

import type { CapacityResponse, ExtractResponse } from "@/types/stego";

export async function getCapacity(image: File): Promise<CapacityResponse> {
  const formData = new FormData();

  formData.append("image", image);

  const response = await api.post<CapacityResponse>("/capacity", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function embedMessage(
  image: File,
  message: string,
  password: string,
): Promise<Blob> {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("message", message);
  formData.append("password", password);

  const response = await api.post("/embed", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob",
  });

  return response.data;
}

export async function extractMessage(
  image: File,
  password: string,
): Promise<ExtractResponse> {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("password", password);

  const response = await api.post<ExtractResponse>("/extract", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
