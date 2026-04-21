export const parseSymptoms = (data) => {
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return data.split(',').map(s => s.trim());
    }
  }
  return [];
};

export const parseResults = (data) => {
  if (data && typeof data === 'object' && data.diseases) return data;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return { diseases: [] };
    }
  }
  return { diseases: [] };
};