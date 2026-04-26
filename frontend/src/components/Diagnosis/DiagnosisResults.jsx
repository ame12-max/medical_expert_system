import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeverityBadge } from './SeverityBadge';
import { TreatmentPlan } from './TreatmentPlan';
import { downloadPDF } from '../../utils/downloadPDF';

export const DiagnosisResults = ({ diagnosis }) => {
  const navigate = useNavigate();
  const pdfContentRef = useRef();
    const printId = 'diagnosis-report-content';


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
  const diseaseCount = diagnosis.diseases?.length || 0;

  // Show only first 3 diseases on the dashboard, plus a "See all" button
  const displayedDiseases = diseaseCount > 3 ? diagnosis.diseases.slice(0, 3) : diagnosis.diseases;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Diagnosis Results</h2>
        {hasResults && (
          <button
            onClick={() => downloadPDF(printId, 'MedExpert_AI_Diagnosis.pdf')}
            className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition"
          >
            🖨️ Print / Save as PDF
          </button>
        )}
      </div>
      <div id={printId}>
        {hasResults ? (
          <>
            <div className="space-y-4">
              {displayedDiseases.map((disease, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 capitalize">
                      {disease.name.replace(/_/g, ' ')}
                    </h3>
                    <div className="flex gap-2">
                      <SeverityBadge severity={disease.severity} />
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {Math.round(disease.confidence)}% confidence
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${disease.confidence}%` }}
                    />
                  </div>
                  <TreatmentPlan disease={disease} />
                  {idx === 0 && disease.confidence > 50 && (
                    <div className="mt-3 text-sm text-green-700 bg-green-50 p-2 rounded">
                      ✅ Most likely diagnosis – consult a doctor for confirmation.
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* See all diagnoses button if more than 3 */}
            {diseaseCount > 3 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => navigate('/diagnosis-details', { state: { diagnosis } })}
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  See all {diseaseCount} diagnoses →
                </button>
              </div>
            )}

            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-600">
              <strong>⚠️ Disclaimer:</strong> This is an AI‑assisted diagnostic tool. Always consult with a qualified healthcare professional for medical advice.
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No matching diseases found.</p>
            <p className="text-sm mt-2">Please consult a doctor for proper diagnosis.</p>
          </div>
        )}
      </div>
    </div>
  );
};