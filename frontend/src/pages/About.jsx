import React from 'react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">About MedExpert AI</h1>
      <p className="text-gray-600 mb-4">
        MedExpert AI is a production‑ready medical diagnosis assistant that combines a 
        <strong> Prolog expert system</strong> with a modern React frontend and Node.js backend.
      </p>
      <p className="text-gray-600 mb-4">
        The Prolog knowledge base contains 20+ diseases with their symptoms, critical symptoms,
        treatment plans, precautions, and severity levels. When you submit your symptoms, the system
        calculates a weighted confidence score for each disease and returns the most relevant results.
      </p>
      <p className="text-gray-600 mb-4">
        Built with ❤️ using <strong>React, Vite, Tailwind CSS, Node.js, Express, MySQL, and SWI‑Prolog</strong>.
        Deployed on Vercel (frontend) and Render (backend + MySQL).
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Disclaimer:</strong> This tool is for educational and demonstration purposes only. 
        It does not replace professional medical advice. Always consult a qualified healthcare provider.
      </p>
      <div className="flex gap-4 mt-6">
        <Link to="/guide" className="text-blue-600 hover:underline">📖 View usage guide</Link>
        <Link to="/" className="text-blue-600 hover:underline">← Back to dashboard</Link>
      </div>
    </div>
  );
};