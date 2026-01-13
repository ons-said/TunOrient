import api from './axios';

export interface StudentProfilePayload {
    academic_level: string;
    bac_type: string;
    bac_average: number;
    bac_year?: number;
    governorate?: string;
}

export const studentsAPI = {
    createProfile: async (data: StudentProfilePayload) => {
        const response = await api.post('/students/', data);
        return response.data;
    }
};