import React from 'react';

export const LoadingSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Diagnosis Results</h2>
    <div className="space-y-4 animate-pulse">
      <div className="h-24 bg-gray-200 rounded-lg"></div>
      <div className="h-24 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);