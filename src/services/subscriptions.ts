import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.wazobiatax.ng',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Plan {
    id: string;
    name: string;
    description: string;
    price: string;
    billing_interval: string;
}

export interface PlansResponse {
    message: string;
    data: Plan[];
}

export interface SubscribeResponse {
    message: string;
    authorization_url: string;
}

/**
 * Fetch available subscription plans
 */
export const getPlans = async (): Promise<PlansResponse> => {
    const response = await api.get<PlansResponse>('/api/plans');
    return response.data;
};

/**
 * Subscribe a user to a specific plan
 * Returns a Paystack authorization URL
 */
export const subscribeUser = async (planId: string): Promise<SubscribeResponse> => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No access token found. Please log in.');
    }

    const formData = new URLSearchParams();
    formData.append('plan_id', planId);

    const response = await api.post<SubscribeResponse>('/api/subscribe', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    return response.data;
};
