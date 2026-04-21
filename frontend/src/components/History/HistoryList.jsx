import React from 'react';
import { parseSymptoms, parseResults } from '../../utils/symptomParser';

export const HistoryList = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p>No diagnosis history yet</p>
        <p className="text-sm mt-1">Perform your first diagnosis to see it here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((record) => {
        const symptoms = parseSymptoms(record.symptoms);
        const results = parseResults(record.results);
        return (
          <div key={record.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm text-gray-500">
                {new Date(record.created_at).toLocaleString()}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">ID: {record.id}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Symptoms:</p>
                <div className="flex flex-wrap gap-1">
                  {symptoms.map((symptom, idx) => (
                    <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {symptom.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Top Diagnosis:</p>
                {results.diseases && results.diseases.length > 0 ? (
                  <div className="space-y-1">
                    {results.diseases.slice(0, 2).map((d, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="capitalize">{d.name.replace(/_/g, ' ')}</span>
                        <span className="font-medium">{Math.round(d.confidence)}%</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No diagnosis found</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};