import React from 'react';

export const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-3 px-1 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};