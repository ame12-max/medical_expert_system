import React from 'react';
import { SymptomSelector } from '../components/Diagnosis/SymptomSelector';
import { DiagnosisResults } from '../components/Diagnosis/DiagnosisResults';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

export const Dashboard = ({
  symptoms,
  symptomGroups,
  selectedSymptoms,
  onToggleSymptom,
  onSelectAll,
  onClearAll,
  onDiagnose,
  loading,
  diagnosis
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <SymptomSelector
        symptoms={symptoms}
        symptomGroups={symptomGroups}
        selectedSymptoms={selectedSymptoms}
        onToggleSymptom={onToggleSymptom}
        onSelectAll={onSelectAll}
        onClearAll={onClearAll}
        onDiagnose={onDiagnose}
        loading={loading}
      />
      {loading ? <LoadingSkeleton /> : <DiagnosisResults diagnosis={diagnosis} />}
    </div>
  );
};