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

export interface UpdateLedgerPayload {
  title?: string;
  ledger_type: 'income' | 'expense';
  amount?: number;
  category?: string;
  description?: string;
  date?: string;
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
  const response = await api.get('/api/ledger/entry');
  return response.data;
};
  
export const updateLedgerEntry = async (
  ledgerId: string,
  payload: UpdateLedgerPayload
) => {
  const response = await api.patch(
    `/api/ledger/entry/${ledgerId}`,
    payload
  );
  return response.data;
};

export const deleteLedgerEntry = async (id: string) => {
  const token = localStorage.getItem("accessToken");

  const response = await api.delete(
    `/api/ledger/entry/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
