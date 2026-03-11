import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.wazobiatax.ng',
});

// Attach token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface TaxCalculationResponse {
    success: boolean;
    data: {
        total_output_vat: number;
        total_input_vat: number;
        net_vat: number;
        status: string;
    };
}

/**
 * Fetches tax calculation details.
 * Ideally, if the API supports it, we could pass individual entry details
 * to calculate tax for a specific ledger.
 */
export const getTaxCalculation = async () => {
    const response = await api.get<TaxCalculationResponse>('/api/calculate/tax');
    return response.data;
};
