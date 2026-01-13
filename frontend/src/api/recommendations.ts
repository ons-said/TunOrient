import api from './axios';

export interface RecommendationQuestionnaire {
    formule_globale: number;
    interests: string[];
    preferred_fields: string[];
    preferred_regions: string[];
    study_style: string;
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
    generate: async (studentId: number, data: RecommendationQuestionnaire): Promise<Recommendation[]> => {
        const response = await api.post(`/recommendations/${studentId}`, data);
        // If backend returns recommendations in response.data.data.top_choices
        return response.data.data.top_choices; // or adjust to the correct array path
    },

    listForStudent: async (studentId: number): Promise<Recommendation[]> => {
        const response = await api.get(`/recommendations/student/${studentId}`);
        // If backend returns recommendations in response.data.data
        return response.data.data;
    }
};
