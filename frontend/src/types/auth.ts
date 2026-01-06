export interface User {
    id: number;
    email: string;
    role: string;
    is_active: boolean;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    role: string;
    academic_level?: string;
    bac_section?: string;
    bac_average?: number;
    bac_year?: number;
    governorate?: string;
}
