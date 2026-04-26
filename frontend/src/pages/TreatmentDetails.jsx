import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

export const TreatmentDetails = () => {
  const { diseaseName } = useParams();
  const location = useLocation();
  const disease = location.state?.disease || null;

  // If no disease passed, we could fetch from backend, but for now show fallback
  if (!disease) {
    return (
      <div className="text-center py-12">
        <p>Disease information not available.</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to dashboard</Link>
      </div>
    );
  }

  const displayName = disease.name.replace(/_/g, ' ');
  const treatments = disease.treatments || [];
  const precautions = disease.precautions || [];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to diagnosis</Link>
        <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">{displayName}</h1>
        <div className="flex items-center gap-3 mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            disease.severity === 'severe' ? 'bg-red-100 text-red-800' :
            disease.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {disease.severity?.toUpperCase()} severity
          </span>
          <span className="text-gray-500">Confidence: {Math.round(disease.confidence)}%</span>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">💊 Treatment Plan</h2>
          {treatments.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {treatments.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No specific treatment information available.</p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">🛡️ Precautions & Prevention</h2>
          {precautions.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {precautions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No specific precautions available.</p>
          )}
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">🚨 When to see a doctor</h3>
          <p className="text-sm text-gray-700">
            If symptoms worsen, persist for more than a few days, or if you experience difficulty breathing,
            severe pain, or confusion, seek immediate medical attention.
          </p>
        </div>
      </div>
    </div>
  );
};