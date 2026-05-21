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

export interface ComplianceBreakdownItem {
    score: number;
    max_score: number;
    ledger_entries_last_30_days?: number;
}

export interface ComplianceBreakdown {
    registration_taxid: ComplianceBreakdownItem;
    record_keeping: ComplianceBreakdownItem;
    returns_filing: ComplianceBreakdownItem;
    timeliness_deadlines: ComplianceBreakdownItem;
    education_awareness: ComplianceBreakdownItem;
}

export interface ComplianceActionItem {
    title: string;
    priority: 'high' | 'medium' | 'low';
}

export interface ComplianceSummary {
    total_ledger_records: number;
    active_subscription: boolean;
}

export interface ComplianceDashboardResponse {
    compliance_score: number;
    compliance_status: string;
    trend_percentage: number;
    needs_attention: boolean;
    breakdown: ComplianceBreakdown;
    action_items: ComplianceActionItem[];
    summary: ComplianceSummary;
}

/* =======================
   COMPLIANCE API
======================= */

/**
 * Fetches the compliance dashboard metrics.
 */
export const getComplianceDashboard = async (): Promise<ComplianceDashboardResponse> => {
    const response = await api.get<ComplianceDashboardResponse>('/api/compliance/dashboard');
    return response.data;
};
