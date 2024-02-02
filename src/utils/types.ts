import { z } from 'zod';
import { authFormSchema } from '@/utils/validation';

export type AuthFormSchema = z.infer<typeof authFormSchema>;

export interface UserInfo {
    email: string;
    username: string;
}

export interface ProjectDocument {
    _id: string;
    name: string;
    description: string;
    collaborators: string[];
    files: string[];
    chat: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
}