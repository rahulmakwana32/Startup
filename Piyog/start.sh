#!/bin/bash

# Piyog Startup Script

echo "🧘 Starting Piyog Ecosystem..."

# Function to kill processes on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    # Kill all child processes (backend and frontend)
    pkill -P $$
    exit
}
trap cleanup SIGINT

# 0. Cleanup Previous Instances
echo "🧹 Cleaning up existing processes..."
lsof -ti:8000 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null

# 1. Backend Setup
echo "🔹 Setting up Backend..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
else
    source venv/bin/activate
fi

# Start Backend in background
echo "🚀 Starting Backend Server (Port 8000)..."
uvicorn app.main:app --reload &
BACKEND_PID=$!
cd ..

# 2. Frontend Setup
echo "🔹 Setting up Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start Frontend
echo "🚀 Starting Frontend Server (Port 5173)..."
npm run dev &
FRONTEND_PID=$!
cd ..

echo "------------------------------------------------"
echo "✅ Piyog is running!"
echo "   Backend API: http://localhost:8000/docs"
echo "   Frontend UI: http://localhost:5173"
echo "------------------------------------------------"
echo "Press Ctrl+C to stop both servers."

wait
