import React from 'react';
import { ConfidenceBadge } from './ConfidenceBadge';

export const DiagnosisResults = ({ diagnosis }) => {
  if (!diagnosis) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Diagnosis Results</h2>
        <div className="text-center py-12 text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p>Select symptoms and click "Analyze Symptoms"</p>
          <p className="text-sm mt-1">to get AI‑powered diagnosis</p>
        </div>
      </div>
    );
  }

  const hasResults = diagnosis.diseases && diagnosis.diseases.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Diagnosis Results</h2>
      {hasResults ? (
        <div className="space-y-4">
          {diagnosis.diseases.map((disease, idx) => (
            <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                  {disease.name.replace(/_/g, ' ')}
                </h3>
                <ConfidenceBadge confidence={disease.confidence} />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${disease.confidence}%` }}
                />
              </div>
              {idx === 0 && disease.confidence > 50 && (
                <div className="mt-3 text-sm text-green-700 bg-green-50 p-2 rounded">
                  ✅ Most likely diagnosis – consult a doctor for confirmation.
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-600">
            <strong>⚠️ Disclaimer:</strong> This is an AI‑assisted diagnostic tool. Always consult with a qualified healthcare professional for medical advice.
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No matching diseases found.</p>
          <p className="text-sm mt-2">Please consult a doctor for proper diagnosis.</p>
        </div>
      )}
    </div>
  );
};