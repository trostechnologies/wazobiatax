import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.wazobiatax.ng',
  headers: {
    'Content-Type': 'application/json',
  },
});

/* =======================
   TYPES
======================= */

export interface RegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  tax_identification_number: string;
  password: string;
  business_name?: string;
}

export interface UserProfile {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_image: string | null;
  tax_identification_number: string;
  business_name: string | null;
}

/* =======================
   AUTH / USER APIs
======================= */

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post('/api/register/user', payload);
  return response.data;
};

export const verifyEmailOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('purpose', 'email_verification');
  formData.append('otp', otp);

  const response = await api.post('/api/auth/verify-otp', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/* =======================
   GET USER PROFILE
======================= */

export const getUserProfile = async () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('No access token found');
  }

  const response = await api.get<{
    message: string;
    data: UserProfile;
  }>('/api/auth/user-details', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};