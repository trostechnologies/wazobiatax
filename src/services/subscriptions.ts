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
    reference?: string;
    access_code?: string;
}

export interface UserSubscriptionResponse {
    has_subscription: boolean;
    subscription: {
        status: string;
        start_date: string;
        cancel_at_period_end: boolean;
    } | null;
    plan: {
        id: string;
        name: string;
        price: number;
        billing_interval: string;
    } | null;
    trial: {
        is_trial: boolean;
        trial_end: string | null;
    };
    billing: {
        current_period_start: string | null;
        next_billing_date: string | null;
        days_remaining: number | null;
    };
}

export interface Transaction {
    id: string;
    amount: string;
    status: string;
    paid_at: string;
    plan_name: string;
    period_start: string;
    period_end: string;
    plan_billing_interval: string;
    payment_provider: string;
    payment_method: string;
    reference: string;
}

export interface TransactionHistoryResponse {
    message: string;
    data: Transaction[];
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
export const subscribeUser = async (planId: string, callbackUrl?: string): Promise<SubscribeResponse> => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No access token found. Please log in.');
    }

    const payload: any = {
        plan_id: planId
    };

    if (callbackUrl) {
        payload.callback_url = callbackUrl;
        payload.redirect_url = callbackUrl;
        // Some backends expect it in metadata
        payload.metadata = JSON.stringify({
            callback_url: callbackUrl,
            cancel_action: window.location.origin + '/subscription-plans'
        });
    }

    const encodedCallback = callbackUrl ? encodeURIComponent(callbackUrl) : '';
    const url = `/api/subscribe${callbackUrl ? `?callback_url=${encodedCallback}&redirect_url=${encodedCallback}` : ''}`;

    const response = await api.post<SubscribeResponse>(url, payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data;
};

/**
 * Get current user's subscription details
 */
export const getUserSubscription = async (): Promise<UserSubscriptionResponse> => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No access token found. Please log in.');
    }

    const response = await api.get<UserSubscriptionResponse>('/api/subscribe', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    return response.data;
};

/**
 * Get user's transaction history
 */
export const getTransactionHistory = async (): Promise<TransactionHistoryResponse> => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No access token found. Please log in.');
    }

    const response = await api.get<TransactionHistoryResponse>('/api/transaction-history', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    return response.data;
};
/**
 * Upgrade or downgrade a user's subscription plan
 */
export const changePlan = async (planId: string): Promise<{ message: string }> => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No access token found. Please log in.');
    }

    const formData = new URLSearchParams();
    formData.append('plan_id', planId);

    const response = await api.post<{ message: string }>('/api/subscription/change-plan', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    return response.data;
};
