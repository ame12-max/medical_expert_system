import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SeverityBadge } from '../components/Diagnosis/SeverityBadge';
import { TreatmentPlan } from '../components/Diagnosis/TreatmentPlan';

export const DiagnosisDetails = () => {
  const location = useLocation();
  const { diagnosis } = location.state || {};

  if (!diagnosis || !diagnosis.diseases) {
    return (
      <div className="text-center py-12">
        <p>No diagnosis data available.</p>
        <Link to="/" className="text-blue-600 hover:underline">Go back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Complete Diagnosis Report</h1>
        <p className="text-gray-600 mb-6">
          Based on your symptoms, the expert system found the following possible conditions.
        </p>
        <div className="space-y-6">
          {diagnosis.diseases.map((disease, idx) => (
            <div key={idx} className="border rounded-lg p-5 hover:shadow-md transition">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                <h2 className="text-xl font-semibold text-gray-800 capitalize">
                  {disease.name.replace(/_/g, ' ')}
                </h2>
                <div className="flex gap-2">
                  <SeverityBadge severity={disease.severity} />
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {Math.round(disease.confidence)}% confidence
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: `${disease.confidence}%` }}
                />
              </div>
              <TreatmentPlan disease={disease} initialExpanded={true} />
              <div className="mt-3">
                <Link
                  to={`/treatments/${disease.name}`}
                  state={{ disease }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View full treatment guide →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-gray-700">
            ⚠️ This information is for educational purposes. Always consult a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
};