import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export const ChangePasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (newPassword.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_BASE}/change-password`, { currentPassword, newPassword });
      onSuccess('Password changed successfully');
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" placeholder="Current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded" required />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Update</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};