# LBP Adaptive Steganography POC

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
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000` with interactive docs at `/docs`.

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

4. To build for production:

```bash
npm run build
```
