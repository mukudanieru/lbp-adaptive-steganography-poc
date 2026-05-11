import numpy as np

from skimage.metrics import (
    mean_squared_error as skimage_mse,
    peak_signal_noise_ratio as skimage_psnr,
    structural_similarity as skimage_ssim,
)

def compute_mse(cover: np.ndarray, stego: np.ndarray) -> float:
    """
    MSE using scikit-image's mean_squared_error.
    Computed per channel then averaged for RGB.
    """
    if cover.ndim == 3:
        # Average MSE across RGB channels
        mse_vals = [skimage_mse(cover[:, :, ch], stego[:, :, ch]) for ch in range(3)]
        return float(np.mean(mse_vals))
    return float(skimage_mse(cover, stego))


def compute_psnr(cover: np.ndarray, stego: np.ndarray) -> float:
    """
    PSNR using scikit-image's peak_signal_noise_ratio.
    """
    return float(skimage_psnr(cover, stego, data_range=255))


def compute_ssim(cover: np.ndarray, stego: np.ndarray) -> float:
    """
    SSIM using scikit-image's structural_similarity.
    Uses channel_axis for RGB images.
    """
    if cover.ndim == 3:
        return float(skimage_ssim(cover, stego, channel_axis=2, data_range=255))
    return float(skimage_ssim(cover, stego, data_range=255))