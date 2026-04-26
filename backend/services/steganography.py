"""
Steganography service
Orchestrates the full embed / extract pipelines
"""

import numpy as np

from pathlib import Path

from stego_core.preprocessing import load_img_from_bytes, encode_img_to_bytes
from stego_core.lbp import compute_lbp_classification
from stego_core.pseudorandom import password_to_seed, generate_pixel_coordinates
from stego_core.embedding import embed_message
from stego_core.extraction import extract_message


def run_embed(
    image_bytes: bytes, filename: str, message: str, password: str
) -> tuple[bytes, str]:
    """
    Full embed pipeline.

    1. Decode image bytes → numpy array (BGR)
    2. Compute LBP classification map
    3. Derive pixel coordinates from password
    4. Embed message
    5. Encode result back to the original file format

    Args:
        image_bytes: Raw bytes of the uploaded cover image
        filename: Original filename (used for extension validation and output format)
        message: Secret ASCII message to embed
        password: Password used to derive the pixel traversal order

    Returns:
        Tuple of (encoded image bytes, file extension e.g. ".png")

    Raises:
        ValueError: For unsupported file types, corrupt images, or messages too large
    """
    ext: str = Path(filename).suffix.lower() if filename else ".png"

    img: np.ndarray = load_img_from_bytes(image_bytes, filename)

    classification_map: np.ndarray = compute_lbp_classification(img)

    height, width = img.shape[:2]
    seed: int = password_to_seed(password)
    pixel_coords: list[tuple[int, int]] = generate_pixel_coordinates(height, width, seed)

    stego_img: np.ndarray = embed_message(img, message, classification_map, pixel_coords)

    return encode_img_to_bytes(stego_img, ext), ext


def run_extract(image_bytes: bytes, filename: str, password: str) -> str:
    """
    Full extract pipeline.

    1. Decode stego-image bytes → numpy array (BGR)
    2. Compute LBP classification map (must match embedding conditions)
    3. Derive pixel coordinates from password
    4. Extract and return message

    Args:
        image_bytes: Raw bytes of the uploaded stego-image
        filename: Original filename (used for extension validation)
        password: Password used to derive the pixel traversal order

    Returns:
        Extracted secret message as a string

    Raises:
        ValueError: For unsupported file types, corrupt images, or extraction failures
    """
    img: np.ndarray = load_img_from_bytes(image_bytes, filename)

    classification_map: np.ndarray = compute_lbp_classification(img)

    height, width = img.shape[:2]
    seed: int = password_to_seed(password)
    pixel_coords: list[tuple[int, int]] = generate_pixel_coordinates(height, width, seed)

    return extract_message(img, classification_map, pixel_coords)