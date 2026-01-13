import api from './axios';
import type { LoginCredentials, AuthResponse, User } from '../types/auth';

export interface RegisterPayload {
    email: string;
    password: string;
    role: string;
}

export const authAPI = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (data: RegisterPayload): Promise<User> => {
        // Only send what the backend expects
        const response = await api.post<User>('/auth/register', {
            email: data.email,
            password: data.password,
            role: data.role
        });
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};
