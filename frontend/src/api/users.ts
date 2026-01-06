import api from './axios';

export const usersAPI = {
    getAllStudents: async (): Promise<any[]> => {
        // Backend endpoint to list users, filtered by role='student' if needed
        const response = await api.get('/students/');
        return response.data;
    }
    // Add other user management methods here if needed (ban, delete, etc.)
};
