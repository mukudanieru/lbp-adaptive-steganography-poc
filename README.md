# Stego

A proof-of-concept web application for texture-adaptive image steganography using Local Binary Pattern (LBP) and pseudorandom pixel selection.

## Installation

### Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- **npm or yarn**

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the server:

```bash
uvicorn main:app --reload
```

The API will be available at http://127.0.0.1:8000 with interactive docs at http://127.0.0.1:8000/docs.

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port Vite assigns).

## Production Build

In production, FastAPI serves the built React app directly - no separate frontend server, single origin, no CORS.

1. Build the frontend (outputs into `backend/static`):

```bash
cd frontend
npm install
npm run build
```

2. Run the backend:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

The full app, frontend and API, will be available at http://127.0.0.1:8000.

## Deployment (Render)

The app deploys as a single Render Web Service. Connect the repo and use:

**Build command:**

```bash
cd frontend && npm install && npm run build && cd ../backend && pip install -r requirements.txt
```

**Start command:**

```bash
cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

Render assigns `$PORT` dynamically - don't hardcode it. Root directory can be left blank (repo root); the build command handles moving between `frontend/` and `backend/`.
