"""
Steganography router
Defines /embed and /extract endpoints
"""

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import Response
from pydantic import BaseModel

from services.steganography import run_embed, run_extract

router = APIRouter(prefix="/api", tags=["steganography"])


class ExtractResponse(BaseModel):
    message: str


@router.post("/embed")
async def embed(
    image: UploadFile = File(..., description="Cover image (.png, .bmp, .tiff)"),
    message: str = Form(..., description="Secret ASCII message to embed"),
    password: str = Form(..., description="Password for pixel order derivation"),
) -> Response:
    """
    Embed a secret message into a cover image.

    Returns the stego-image as a PNG file download.
    """
    if not message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    if not password.strip():
        raise HTTPException(status_code=400, detail="Password cannot be empty.")

    image_bytes = await image.read()

    try:
        stego_bytes, ext = run_embed(
            image_bytes=image_bytes,
            filename=image.filename or "",
            message=message,
            password=password,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    mime_map = {
        ".png": "image/png",
        ".bmp": "image/bmp",
        ".tiff": "image/tiff",
        ".tif": "image/tiff",
    }
    mime_type = mime_map.get(ext, "image/png")
    output_filename = f"stego{ext}"

    return Response(
        content=stego_bytes,
        media_type=mime_type,
        headers={"Content-Disposition": f"attachment; filename={output_filename}"},
    )


@router.post("/extract", response_model=ExtractResponse)
async def extract(
    image: UploadFile = File(..., description="Stego-image (.png, .bmp, .tiff)"),
    password: str = Form(..., description="Password used during embedding"),
) -> ExtractResponse:
    """
    Extract a hidden message from a stego-image.

    Returns the extracted message as JSON.
    """
    if not password.strip():
        raise HTTPException(status_code=400, detail="Password cannot be empty.")

    image_bytes = await image.read()

    try:
        message = run_extract(
            image_bytes=image_bytes,
            filename=image.filename or "",
            password=password,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return ExtractResponse(message=message)