import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { TabNavigation } from './components/common/TabNavigation';
import { SymptomSelector } from './components/Diagnosis/SymptomSelector';
import { DiagnosisResults } from './components/Diagnosis/DiagnosisResults';
import { HistoryList } from './components/History/HistoryList';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';

const API_BASE = 'https://your-backend-name.onrender.com/api';

function App() {
  const { user, login, register, logout } = useAuth();
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');

  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState(new Set());
  const [diagnosis, setDiagnosis] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('diagnose');
  const [symptomGroups, setSymptomGroups] = useState({});

  useEffect(() => {
    if (user) {
      fetchSymptoms();
      fetchHistory();
      fetchStats();
    }
  }, [user]);

  useEffect(() => {
    if (symptoms.length > 0) {
      // Group symptoms (same logic as before)
      const groups = {
        '🤒 Fever & Whole Body': [],
        '🧠 Head & Neurological': [],
        '🫁 Chest & Breathing': [],
        '👃 Nose & Throat': [],
        '🤢 Digestive': [],
        '🦴 Muscles & Joints': [],
        '🩸 Skin & Rash': [],
        '⚡ Other': []
      };
      symptoms.forEach(s => {
        const lower = s.toLowerCase();
        if (lower.includes('fever') || lower.includes('chills') || lower.includes('sweating') || lower.includes('fatigue')) 
          groups['🤒 Fever & Whole Body'].push(s);
        else if (lower.includes('headache') || lower.includes('confusion') || lower.includes('stiff neck') || lower.includes('sensitivity to light'))
          groups['🧠 Head & Neurological'].push(s);
        else if (lower.includes('cough') || lower.includes('breath') || lower.includes('chest') || lower.includes('phlegm'))
          groups['🫁 Chest & Breathing'].push(s);
        else if (lower.includes('nose') || lower.includes('throat') || lower.includes('sore throat') || lower.includes('runny') || lower.includes('sneezing'))
          groups['👃 Nose & Throat'].push(s);
        else if (lower.includes('nausea') || lower.includes('vomit') || lower.includes('abdominal') || lower.includes('diarrhea') || lower.includes('constipation'))
          groups['🤢 Digestive'].push(s);
        else if (lower.includes('muscle') || lower.includes('joint') || lower.includes('body aches'))
          groups['🦴 Muscles & Joints'].push(s);
        else if (lower.includes('rash') || lower.includes('rose spots') || lower.includes('red spots'))
          groups['🩸 Skin & Rash'].push(s);
        else
          groups['⚡ Other'].push(s);
      });
      Object.keys(groups).forEach(key => { if (groups[key].length === 0) delete groups[key]; });
      setSymptomGroups(groups);
    }
  }, [symptoms]);

  const fetchSymptoms = async () => {
    try {
      const res = await axios.get(`${API_BASE}/symptoms`);
      if (res.data.success) setSymptoms(res.data.symptoms);
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/history`);
      if (res.data.success) setHistory(res.data.history);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE}/stats`);
      if (res.data.success) setStats(res.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const toggleSymptom = (symptom) => {
    const newSelected = new Set(selectedSymptoms);
    if (newSelected.has(symptom)) newSelected.delete(symptom);
    else newSelected.add(symptom);
    setSelectedSymptoms(newSelected);
  };

  const selectAll = (symptomList) => {
    const newSelected = new Set(selectedSymptoms);
    symptomList.forEach(s => newSelected.add(s));
    setSelectedSymptoms(newSelected);
  };

  const clearAll = () => setSelectedSymptoms(new Set());

  const handleDiagnose = async () => {
    if (selectedSymptoms.size === 0) {
      alert('Please select at least one symptom');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/diagnose`, { symptoms: Array.from(selectedSymptoms) });
      if (res.data.success) {
        setDiagnosis(res.data.diagnosis);
        fetchHistory();
        fetchStats();
      }
    } catch (error) {
      console.error('Diagnosis error:', error);
      alert('Error performing diagnosis');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (username, password) => {
    const result = await login(username, password);
    if (!result.success) setAuthError(result.error);
  };

  const handleRegister = async (username, password) => {
    const result = await register(username, password);
    if (result.success) {
      setAuthMode('login');
      setAuthError('');
    } else {
      setAuthError(result.error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            MedExpert AI
          </h1>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => { setAuthMode('login'); setAuthError(''); }}
              className={`flex-1 py-2 rounded-lg font-medium ${authMode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Login
            </button>
            <button
              onClick={() => { setAuthMode('register'); setAuthError(''); }}
              className={`flex-1 py-2 rounded-lg font-medium ${authMode === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Register
            </button>
          </div>
          {authError && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">{authError}</div>}
          {authMode === 'login' ? (
            <LoginForm onLogin={handleLogin} error={authError} clearError={() => setAuthError('')} />
          ) : (
            <RegisterForm onRegister={handleRegister} error={authError} clearError={() => setAuthError('')} />
          )}
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'diagnose', label: 'Diagnose Symptoms', icon: '🔍' },
    { id: 'history', label: 'History', icon: '📋' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header user={user} stats={stats} onLogout={logout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'diagnose' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <SymptomSelector
              symptoms={symptoms}
              symptomGroups={symptomGroups}
              selectedSymptoms={selectedSymptoms}
              onToggleSymptom={toggleSymptom}
              onSelectAll={selectAll}
              onClearAll={clearAll}
              onDiagnose={handleDiagnose}
              loading={loading}
            />
            <DiagnosisResults diagnosis={diagnosis} />
          </div>
        )}
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Diagnoses</h2>
            <HistoryList history={history} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;