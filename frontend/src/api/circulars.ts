import api from './axios';

export interface Circular {
    id: number;
    title: string;
    academic_year?: string;
    publication_date: string;
    deadline_date?: string;
    description?: string;
}

export const circularsAPI = {
    getAll: async (): Promise<Circular[]> => {
        const response = await api.get<Circular[]>('/circulars/');
        return response.data;
    },

    getById: async (id: number): Promise<Circular> => {
        const response = await api.get<Circular>(`/circulars/${id}`);
        return response.data;
    },

    create: async (data: Omit<Circular, 'id'>): Promise<Circular> => {
        const response = await api.post<Circular>('/circulars/', data);
        return response.data;
    },

    update: async (id: number, data: Partial<Circular>): Promise<Circular> => {
        const response = await api.put<Circular>(`/circulars/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/circulars/${id}`);
    }
};
