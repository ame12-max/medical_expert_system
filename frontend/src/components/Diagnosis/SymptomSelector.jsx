import React, { useState } from 'react';

export const SymptomSelector = ({
  symptoms,
  symptomGroups,
  selectedSymptoms,
  onToggleSymptom,
  onSelectAll,
  onClearAll,
  onDiagnose,
  loading
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSymptoms = symptoms.filter(s =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-gray-800">Select Your Symptoms</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onSelectAll(symptoms)}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
          >
            Select All
          </button>
          <button onClick={onClearAll} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
            Clear All
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search symptoms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-3 text-sm text-gray-600">
        Selected: <span className="font-semibold text-blue-600">{selectedSymptoms.size}</span> symptom{selectedSymptoms.size !== 1 ? 's' : ''}
      </div>

      <div className="max-h-96 overflow-y-auto pr-2">
        {searchTerm ? (
          <div className="grid grid-cols-2 gap-2">
            {filteredSymptoms.map((symptom) => (
              <label key={symptom} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSymptoms.has(symptom)}
                  onChange={() => onToggleSymptom(symptom)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <span className="text-gray-700 capitalize">{symptom.replace(/_/g, ' ')}</span>
              </label>
            ))}
          </div>
        ) : (
          Object.entries(symptomGroups).map(([groupName, groupSymptoms]) => (
            <div key={groupName} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">{groupName}</h3>
                <button
                  onClick={() => onSelectAll(groupSymptoms)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Select all
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {groupSymptoms.map((symptom) => (
                  <label key={symptom} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSymptoms.has(symptom)}
                      onChange={() => onToggleSymptom(symptom)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="text-gray-700 text-sm capitalize">{symptom.replace(/_/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onDiagnose}
          disabled={loading || selectedSymptoms.size === 0}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyzing...
            </span>
          ) : (
            'Analyze Symptoms'
          )}
        </button>
        <button
          onClick={onClearAll}
          className="px-6 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};