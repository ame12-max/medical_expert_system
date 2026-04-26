import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HistoryList } from '../components/History/HistoryList';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  const fetchHistory = async (currentLimit) => {
    try {
      const res = await axios.get(`${API_BASE}/history?limit=${currentLimit}`);
      if (res.data.success) {
        setHistory(res.data.history);
        setHasMore(res.data.history.length === currentLimit);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this diagnosis record permanently?')) {
      try {
        await axios.delete(`${API_BASE}/history/${id}`);
        // Refresh the current page view
        fetchHistory(limit);
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete record');
      }
    }
  };

  useEffect(() => {
    fetchHistory(limit);
  }, [limit]);

  const loadMore = () => setLimit(prev => prev + 20);

  if (loading) return <div className="text-center py-8">Loading history...</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Diagnosis History</h2>
      <HistoryList history={history} onDelete={handleDelete} />
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};