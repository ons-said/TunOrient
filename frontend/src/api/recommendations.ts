import api from './axios';

export interface BacGrades {
    [key: string]: number;
}

export interface RecommendationRequest {
    bac_type: string;
    bac_grades: BacGrades;
    governorate: string;
    preferences: string[];
    min_choices: number;
}

// Interface matching Backend ProgramRead schema
export interface RecommendedProgram {
    id: number;
    name: string;
    field?: string;
    degree?: string;
    institution?: {
        name: string;
        university?: {
            name: string;
            region?: string;
        };
    };
}

export interface Recommendation {
    id: number;
    student_id: number;
    program_id: number;
    fit_score?: number;
    likelihood?: string;
    decision?: string;
    created_at?: string;
    program?: RecommendedProgram;
}

export const recommendationsAPI = {
    generate: async (studentId: number, data: RecommendationRequest): Promise<Recommendation[]> => {
        const response = await api.post(`/recommendations/${studentId}`, data);
        return response.data.data.top_choices; // Adjust if backend changes
    },

    listForStudent: async (studentId: number): Promise<Recommendation[]> => {
        const response = await api.get(`/recommendations/student/${studentId}`);
        return response.data.data;
    }
};
