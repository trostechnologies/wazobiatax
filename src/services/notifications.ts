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

/* =======================
   TYPES
======================= */

export interface Notification {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    message: string;
    notification_type: string;
    is_read: boolean;
    action_url: string | null;
    metadata: Record<string, unknown>;
    user: string;
}

export interface NotificationsResponse {
    unread_count: number;
    notifications: Notification[];
}

/* =======================
   NOTIFICATIONS API
======================= */

/**
 * Fetches all notifications for the authenticated user.
 */
export const getNotifications = async (): Promise<NotificationsResponse> => {
    const response = await api.get<NotificationsResponse>('/api/notifications');
    return response.data;
};
