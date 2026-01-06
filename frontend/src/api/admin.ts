import api from './axios';
import type { User } from '../types/auth'; // Reusing User type

export interface AdminUserCreate {
    email: string;
    password: string;
    role: string;
}

export interface AdminUserUpdate {
    email?: string;
    role?: string;
    is_active?: boolean;
    password?: string;
}

export const adminAPI = {
    getAllUsers: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/admin/users');
        return response.data;
    },

    createUser: async (data: AdminUserCreate): Promise<User> => {
        const response = await api.post<User>('/admin/users', data);
        return response.data;
    },

    updateUser: async (id: number, data: AdminUserUpdate): Promise<User> => {
        const response = await api.put<User>(`/admin/users/${id}`, data);
        return response.data;
    },

    deleteUser: async (id: number): Promise<void> => {
        await api.delete(`/admin/users/${id}`);
    }
};
