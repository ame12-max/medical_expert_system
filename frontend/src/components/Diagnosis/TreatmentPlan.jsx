import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const TreatmentPlan = ({ disease, initialExpanded = false }) => {
  const [treatmentsExpanded, setTreatmentsExpanded] = useState(initialExpanded);
  const [precautionsExpanded, setPrecautionsExpanded] = useState(initialExpanded);

  const hasTreatments = disease.treatments && disease.treatments.length > 0;
  const hasPrecautions = disease.precautions && disease.precautions.length > 0;

  if (!hasTreatments && !hasPrecautions) return null;

  return (
    <div className="mt-3 space-y-2">
      {hasTreatments && (
        <div className="border-t pt-2">
          <button
            onClick={() => setTreatmentsExpanded(!treatmentsExpanded)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            {treatmentsExpanded ? '▼' : '▶'} Recommended Treatments
          </button>
          {treatmentsExpanded && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                {disease.treatments.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {hasPrecautions && (
        <div>
          <button
            onClick={() => setPrecautionsExpanded(!precautionsExpanded)}
            className="text-sm text-yellow-700 hover:text-yellow-900 font-medium flex items-center gap-1"
          >
            {precautionsExpanded ? '▼' : '▶'} Precautions & Prevention
          </button>
          {precautionsExpanded && (
            <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                {disease.precautions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {/* Link to full treatment details page */}
      <div className="mt-2">
        <Link
          to={`/treatments/${disease.name}`}
          state={{ disease }}
          className="text-xs text-purple-600 hover:text-purple-800 font-medium"
        >
          View complete treatment guide &raquo;
        </Link>
      </div>
    </div>
  );
};