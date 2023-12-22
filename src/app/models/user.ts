export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    authdata?: string;
    token?: string;
    avatarUrl?: string;
    role?: string;
    fullname?: string;
}
