🏥 MedExpert AI – Medical Diagnosis Expert System
A production‑ready medical diagnosis assistant that combines Prolog’s logical inference engine with a modern React + Node.js web interface. The system uses a weighted symptom‑matching algorithm to suggest possible diseases and stores all diagnoses in a MySQL database, supporting multiple users with JWT authentication.

📋 Table of Contents
✨ Features

🏗️ Tech Stack

📁 Project Structure

🚀 Quick Start (Local Development)

Prerequisites

Backend Setup

Frontend Setup

MySQL Database Setup

☁️ Deployment

Backend – Render

Frontend – Vercel

📖 API Documentation

🧠 How the Diagnosis Works

🤝 Contributing

📄 License

✨ Features
Expert System – Prolog knowledge base with 10+ diseases and weighted symptom scoring.

User Authentication – JWT‑based login/registration, each user sees their own history.

Interactive UI – Symptom checklists with search, categories, and bulk selection.

Confidence Scoring – Each disease gets a percentage based on matched symptoms + critical symptoms.

Diagnosis History – All past diagnoses are stored and viewable per user.

Production Ready – Deployed on Render (backend + MySQL) and Vercel (frontend).

🏗️ Tech Stack
Layer	Technology
Frontend	React 18 + Vite + Tailwind CSS 4
Backend	Node.js + Express + SWI‑Prolog (inference engine)
Database	MySQL (with JSON support)
Auth	JWT + bcrypt
Deployment	Render (backend + MySQL) + Vercel (frontend)
📁 Project Structure
text
medical-diagnosis-system/
├── backend/
│   ├── knowledge.pl          # Prolog disease knowledge base
│   ├── index.js              # Express server + API endpoints
│   ├── package.json
│   ├── .env                  # Environment variables (DB, JWT secret)
│   └── Dockerfile            # For Render deployment
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom React hooks (useAuth)
│   │   ├── utils/            # Helper functions
│   │   ├── App.jsx           # Main app component
│   │   └── index.css         # Tailwind imports
│   ├── package.json
│   └── vite.config.js
└── database.sql              # MySQL schema
🚀 Quick Start (Local Development)
Prerequisites
Node.js v18 or higher

SWI‑Prolog – Download

MySQL – local or cloud instance

Git

Backend Setup
bash
cd backend
npm install
cp .env.example .env   # create .env with your DB credentials
.env example:

env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=medical_diagnosis
JWT_SECRET=your_super_secret_key
PROLOG_PATH=swipl
KNOWLEDGE_BASE_PATH=./knowledge.pl
bash
npm start   # or npm run dev (with nodemon)
Frontend Setup
bash
cd frontend
npm install
npm run dev   # starts on http://localhost:3000
MySQL Database Setup
Run the following SQL commands (e.g., using phpMyAdmin or MySQL CLI):

sql
CREATE DATABASE medical_diagnosis;
USE medical_diagnosis;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE diagnoses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    symptoms JSON NOT NULL,
    results JSON NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
💡 The backend will automatically add the user_id column if missing (see ensureDatabaseSchema).

☁️ Deployment
Backend – Render
Push your backend/ folder to a GitHub repository.

Log into Render → New → Web Service.

Connect your repo, set Environment to Docker.

Add environment variables (same as .env).

Click Create Web Service.

The included Dockerfile installs SWI‑Prolog automatically.

Frontend – Vercel
Push your frontend/ folder to GitHub.

Log into Vercel → Add New → Project.

Import the repo, set Framework Preset to Vite.

Add environment variable:
VITE_API_BASE = https://your-backend.onrender.com/api

Deploy.

Your app is now live!

📖 API Documentation
All endpoints return JSON. Protected routes require a Bearer <token> in the Authorization header.

Method	Endpoint	Auth	Description
POST	/api/register	No	Create a new user
POST	/api/login	No	Login, returns JWT
GET	/api/symptoms	No	List all possible symptoms
POST	/api/diagnose	Yes	Submit symptoms, get diagnosis
GET	/api/history	Yes	User’s past diagnoses
GET	/api/stats	Yes	Count of user’s diagnoses
GET	/api/health	No	Health check
Example: Diagnose
Request:

json
POST /api/diagnose
Authorization: Bearer <token>
{
  "symptoms": ["fever", "headache", "chills"]
}
Response:

json
{
  "success": true,
  "diagnosis": {
    "diseases": [
      { "name": "malaria", "confidence": 100 },
      { "name": "flu_influenza", "confidence": 45 }
    ]
  }
}
🧠 How the Diagnosis Works
The Prolog knowledge base defines for each disease:

All symptoms (e.g., [fever, headache, chills])

Critical symptoms (must be present for high confidence)

The scoring algorithm:

text
score = (matched_all / total_all) × 70 + (matched_critical / total_critical) × 30
Only diseases with a score ≥ 15% are returned, sorted highest first.

You can extend the knowledge base by editing backend/knowledge.pl:

prolog
disease_symptoms(new_disease,
    [symptom1, symptom2, symptom3],
    [critical1, critical2]).
🤝 Contributing
Contributions are welcome! Please:

Fork the repository.

Create a feature branch.

Commit your changes.

Open a Pull Request.

For major changes, open an issue first to discuss.

📄 License
MIT © [Your Name] – Free for academic and commercial use.

🙏 Acknowledgements
SWI‑Prolog – inference engine

Render – hosting

Vercel – frontend deployment

Tailwind CSS – styling

Made with ❤️ for better healthcare diagnostics.
Always consult a real doctor – this tool is for educational purposes only.