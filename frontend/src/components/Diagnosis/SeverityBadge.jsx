import React from 'react';

export const SeverityBadge = ({ severity }) => {
  const getSeverityColor = () => {
    switch (severity?.toLowerCase()) {
      case 'severe':
        return 'bg-red-100 text-red-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'mild':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = () => {
    switch (severity?.toLowerCase()) {
      case 'severe':
        return '🔴';
      case 'moderate':
        return '🟡';
      case 'mild':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor()}`}>
      {getSeverityIcon()} {severity || 'Unknown'}
    </span>
  );
};