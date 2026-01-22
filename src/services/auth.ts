import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.wazobiatax.ng',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface RegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  tax_identification_number: string;
  password: string;
  business_name?: string;
}

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