import api from './axios';
import type { LoginCredentials, AuthResponse, User } from '../types/auth';

// Temporary type definitions here if they're not in a separate file yet
export interface RegisterPayload {
    email: string;
    password: string;
    role: string;
    // These fields are sent but might be ignored by current backend
    academic_level?: string;
    bac_section?: string;
    bac_average?: number;
    bac_year?: number;
    governorate?: string;
}

export const authAPI = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (data: RegisterPayload): Promise<User> => {
        // Construct the payload expected by the backend (subset of data)
        // We send everything, backend schemas usually ignore extra fields unless "extra = 'forbid'" is set in Pydantic
        const response = await api.post<User>('/auth/register', {
            email: data.email,
            password: data.password,
            role: data.role,
            // Sending profile data tentatively 
            academic_level: data.academic_level,
            bac_section: data.bac_section,
            bac_average: data.bac_average,
            bac_year: data.bac_year,
            governorate: data.governorate
        });
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};
