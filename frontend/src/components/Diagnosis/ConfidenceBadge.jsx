import React from 'react';

export const ConfidenceBadge = ({ confidence }) => {
  const getColor = () => {
    if (confidence >= 70) return 'text-green-600 bg-green-100';
    if (confidence >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColor()}`}>
      {Math.round(confidence)}% confidence
    </span>
  );
};