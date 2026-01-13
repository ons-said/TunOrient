import api from './axios';

export interface ProgramScore {
    section: string;
    score2024: number;
}

export interface Program {
    id: number;
    code: string;
    name: string;
    institution: string;
    university: string;
    city: string;
    domain: string;
    type: string;
    parcours?: string;
    formula?: string;
    conditions?: string;
    requiresTest?: boolean;
    reorientation_allowed?: boolean;
    scores: ProgramScore[];
}

export const programsAPI = {
    getAll: async (): Promise<Program[]> => {
        try {
            const response = await api.get('/programs');
            // Transform backend data to frontend model if necessary
            // For now, if backend returns empty or incompatible data, the consumer should handle it
            const data = response.data;

            // Transform & Validation to prevent crashes
            return data.map((item: any) => ({
                id: item.id,
                code: String(item.id), // Fallback code
                name: item.name,
                institution: item.institution?.name || "Unknown Institution",
                university: item.institution?.university?.name || "Unknown University",
                city: item.institution?.university?.region || "Tunis", // Region serves as City
                domain: item.field || "General",
                type: item.degree || "Licence",
                scores: item.last_admitted_score ? [{
                    section: item.bac_section || "General",
                    score2024: Number(item.last_admitted_score)
                }] : [],
                // Pass through other fields as needed or mock them
                requiresTest: false, // Default
                reorientation_allowed: item.reorientation_allowed,
                formula: item.score_formula || "FG",
                conditions: item.additional_conditions || "-"
            }));
        } catch (error) {
            console.error("Failed to fetch programs", error);
            throw error;
        }
    },

    getReorientationPrograms: async (): Promise<Program[]> => {
        try {
            const response = await api.get('/programs/reorientation/list');
            const data = response.data;
            console.log("DEBUG: getReorientationPrograms response:", data);

            if (!Array.isArray(data)) {
                console.error("DEBUG: response data is not an array:", data);
                return [];
            }

            return data.map((item: any) => ({
                id: item.id,
                code: String(item.id),
                name: item.name,
                institution: item.institution?.name || "Unknown Institution",
                university: item.institution?.university?.name || "Unknown University",
                city: item.institution?.university?.region || "Tunis",
                domain: item.field || "General",
                type: item.degree || "Licence",
                scores: item.last_admitted_score ? [{
                    section: item.bac_section || "General",
                    score2024: Number(item.last_admitted_score)
                }] : [],
                requiresTest: false,
                reorientation_allowed: item.reorientation_allowed,
                formula: item.score_formula || "FG",
                conditions: item.additional_conditions || "-"
            }));
        } catch (error) {
            console.error("Failed to fetch reorientation programs", error);
            throw error;
        }
    },

    create: async (data: any): Promise<Program> => {
        // Backend expects specific format, adjust as needed
        const response = await api.post<Program>('/programs/', data);
        return response.data;
    },

    update: async (id: number, data: any): Promise<Program> => {
        const response = await api.put<Program>(`/programs/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/programs/${id}`);
    }
};
