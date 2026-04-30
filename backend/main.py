"""
FastAPI application entry point
"""

import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routers.stego import router as stego_router

app = FastAPI(
    title="Adaptive LSB Steganography API",
    description="Embed and extract hidden messages in images using texture-adaptive LSB steganography.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
       os.getenv("FRONTEND_URL", "http://localhost:5173")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stego_router)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {str(exc)}"},
    )


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok"}