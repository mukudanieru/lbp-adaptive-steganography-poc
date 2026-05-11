export interface CapacityResponse {
  capacity_bits: number;
  capacity_chars: number;
}

export interface ExtractResponse {
  message: string;
}

export interface MetricsResponse {
  mse: number;
  psnr: number;
  ssim: number;
}
