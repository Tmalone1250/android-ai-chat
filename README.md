# Android-Style AI Chatbot

A web-based AI chatbot application that simulates an Android interface, built with Python (Flask) backend and React frontend.

## Features

- Google search integration using SerpAPI
- Text-to-speech and speech-to-text functionality
- Futuristic Android-inspired UI design
- Real-time chat interface with smooth animations

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn
- SerpAPI key

## Setup

1. Clone the repository
2. Create a `.env` file in the root directory with your API keys:
```
SERPAPI_KEY=your_serpapi_key_here
```

### Backend Setup

```bash
# Create and activate virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
cd backend
python app.py
```

### Frontend Setup

```bash
# Install dependencies
cd frontend
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Tech Stack

- Backend:
  - Flask
  - SerpAPI
  - Google Cloud Speech-to-Text
  - Google Cloud Text-to-Speech

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - Emotion (styled components)
  - Framer Motion

## License

MIT
