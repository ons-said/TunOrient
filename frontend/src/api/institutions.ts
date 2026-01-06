import api from './axios';

export interface University {
    id: number;
    name: string;
    region: string;
    description?: string;
    website?: string;
}

export interface Institution {
    id: number;
    name: string;
    university_id: number;
    university?: University; // Nested object
    // address?: string;     // Removed as not in backend
    // description?: string; // Removed as not in backend
    // website?: string;     // Removed as not in backend
}

export const institutionsAPI = {
    // Universities
    getAllUniversities: async (): Promise<University[]> => {
        const response = await api.get<University[]>('/universities/');
        return response.data;
    },
    createUniversity: async (data: Omit<University, 'id'>): Promise<University> => {
        const response = await api.post<University>('/universities/', data);
        return response.data;
    },
    updateUniversity: async (id: number, data: Partial<University>): Promise<University> => {
        const response = await api.put<University>(`/universities/${id}`, data);
        return response.data;
    },
    deleteUniversity: async (id: number): Promise<void> => {
        await api.delete(`/universities/${id}`);
    },

    // Institutions
    getAllInstitutions: async (): Promise<Institution[]> => {
        const response = await api.get<Institution[]>('/institutions/');
        return response.data;
    },
    createInstitution: async (data: Omit<Institution, 'id'>): Promise<Institution> => {
        const response = await api.post<Institution>('/institutions/', data);
        return response.data;
    },
    updateInstitution: async (id: number, data: Partial<Institution>): Promise<Institution> => {
        const response = await api.put<Institution>(`/institutions/${id}`, data);
        return response.data;
    },
    deleteInstitution: async (id: number): Promise<void> => {
        await api.delete(`/institutions/${id}`);
    }
};
