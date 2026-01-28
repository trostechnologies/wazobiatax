import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.wazobiatax.ng',
});

// 🔐 Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface AddLedgerPayload {
  amount: number;
  ledger_type: 'income' | 'expense';
  date: string; // YYYY-MM-DD
  category: string;
  description: string;
}

export const addLedgerEntry = async (payload: AddLedgerPayload) => {
  const formData = new FormData();

  formData.append('amount', String(payload.amount));
  formData.append('ledger_type', payload.ledger_type);
  formData.append('date', payload.date);
  formData.append('category', payload.category);
  formData.append('description', payload.description);

  const response = await api.post('/api/ledger/entry', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getLedgerRecords = async () => {
    const token = localStorage.getItem('token');
  
    const response = await fetch('/api/ledger/entry', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || 'Failed to fetch ledger records');
    }
  
    return response.json();
  };
  
