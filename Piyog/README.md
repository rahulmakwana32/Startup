# 🧘 Piyog: AI-Driven Pilates & Wellness Ecosystem

**Piyog** integrates high-end physical fitness products with a cutting-edge digital infrastructure, managed by a sophisticated **Multi-Agent System (MAS)**.

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- API Key for Google Gemini or DeepSeek

### 1. Backend Setup (FastAPI + AI Agents)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# EDIT .env and add your API keys!
uvicorn app.main:app --reload
```
Backend runs on [http://localhost:8000](http://localhost:8000).
Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs).

### 2. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```
Frontend runs on [http://localhost:5173](http://localhost:5173).

## 🤖 Multi-Agent Architecture

Piyog operates using a decentralized workforce of specialized AI agents orchestrated by a Manager.

| Agent | Responsibility |
| --- | --- |
| **Manager** | Orchestration & Strategy (The "Boss") |
| **Registrar** | Compliance & Govt. Filings |
| **Strategist** | Marketing & Growth |
| **Sourcing** | Materials & Quality |
| **Designer** | Apparel Design |
| **Engineer** | Hardware R&D |
| **Director** | Operations |

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Flow (Mind Map), Framer Motion.
- **Backend:** Python, FastAPI.
- **AI/Orchestration:** LangChain, LangGraph.
- **Providers:** Google Gemini, DeepSeek (Configurable).

## 📊 Features

- **Virtual HQ Dashboard:** Visual interactive mind-map of your AI workforce.
- **Class Scheduling:** (Coming Soon)
- **E-Commerce:** (Coming Soon) Shop for Piyog gear.

---
*Powered by DeepMind Antigravity*
