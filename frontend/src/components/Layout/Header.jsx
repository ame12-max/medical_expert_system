import React from 'react';

export const Header = ({ user, stats, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MedExpert AI
            </h1>
            <p className="text-gray-600 mt-1">Welcome, {user?.username}!</p>
          </div>
          <div className="flex gap-4 items-center">
            {stats && (
              <div className="flex gap-4 text-sm">
                <div className="bg-blue-50 rounded-lg px-4 py-2">
                  <span className="text-gray-600">Today</span>
                  <span className="ml-2 font-bold text-blue-600">{stats.todayDiagnoses}</span>
                </div>
                <div className="bg-purple-50 rounded-lg px-4 py-2">
                  <span className="text-gray-600">Total</span>
                  <span className="ml-2 font-bold text-purple-600">{stats.totalDiagnoses}</span>
                </div>
              </div>
            )}
            <button
              onClick={onLogout}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};