import React from 'react';
import { Link } from 'react-router-dom';

export const Guide = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">📖 How to Use MedExpert AI</h1>
        <p className="text-gray-600 mb-6">
          Follow this step‑by‑step guide to get the most out of your AI‑powered medical diagnosis assistant.
        </p>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Create an account or log in</h2>
            <p className="text-gray-600">
              On the home page, click <strong>Register</strong> to create a new account (username and password). 
              If you already have an account, click <strong>Login</strong>.
            </p>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Select your symptoms</h2>
            <p className="text-gray-600">
              After logging in, you'll see a list of symptoms organised by body system (e.g., 
              “🤒 Fever & Whole Body”, “🧠 Head & Neurological”). Check the box next to each symptom you are experiencing.
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              <li>Use the <strong>search bar</strong> to quickly find a symptom.</li>
              <li>Click <strong>Select All</strong> to choose all symptoms, or <strong>Clear All</strong> to reset.</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Analyse your symptoms</h2>
            <p className="text-gray-600">
              Once you've selected your symptoms, click the <strong>Analyze Symptoms</strong> button. 
              The AI will process your input and show possible diseases with:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              <li><strong>Confidence score</strong> – how well your symptoms match each disease.</li>
              <li><strong>Severity level</strong> (mild, moderate, severe).</li>
              <li><strong>Recommended treatments</strong> – click to expand.</li>
              <li><strong>Precautions & prevention</strong> – click to expand.</li>
              <li><strong>View complete treatment guide</strong> – click to see the full treatment information.</li>
            </ul>
          </div>

          {/* Step 4 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">4. View full details</h2>
            <p className="text-gray-600">
              If more than three diseases match, you’ll see a <strong>“See all X diagnoses”</strong> button – 
              click it to open a complete report. Each disease also has a <strong>“View complete treatment guide”</strong> 
              link that takes you to a dedicated page with all treatments and precautions.
            </p>
          </div>

          {/* Step 5 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Check your history</h2>
            <p className="text-gray-600">
              Click the <strong>History</strong> tab to see all your past diagnoses, including the symptoms you selected 
              and the top‑matching disease. You can also view the full report of any past diagnosis.
            </p>
          </div>

          {/* Step 6 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Log out</h2>
            <p className="text-gray-600">
              When you're finished, click the <strong>Logout</strong> button at the top right corner.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 p-5 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">❓ Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-800">Q: Is this a real medical diagnosis?</p>
              <p className="text-gray-600">A: No. This is an educational tool that simulates a diagnostic expert system. Always consult a real doctor.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Q: How is the confidence score calculated?</p>
              <p className="text-gray-600">A: 70% based on matched symptoms, 30% on critical symptoms (e.g., high fever for malaria).</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Q: Can I change my password?</p>
              <p className="text-gray-600">A: Not yet – it's a planned feature.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Q: Who built this system?</p>
              <p className="text-gray-600">A: It was developed as a demonstration of an expert system using Prolog, React, and Node.js by <a href="https://amare-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Amare</a>.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-600 hover:underline">← Back to dashboard</Link>
        </div>
      </div>
    </div>
  );
};