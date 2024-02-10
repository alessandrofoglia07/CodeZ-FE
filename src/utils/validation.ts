import { z } from 'zod';

// User validation

export const usernameLengthError = 'Username must be between 3 and 20 characters long';
export const passwordLengthError = 'Password must be between 8 and 20 characters long';

export const usernameSchema = z.string().min(3, usernameLengthError).max(20, usernameLengthError);
export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z.string().min(8, passwordLengthError).max(20, passwordLengthError);

export const authFormSchema = z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema
});

// Project validation

export const projectNameLengthErr = 'Name must be between 1 and 30 characters long';
export const projectDescriptionLengthErr = 'Description must be between 1 and 300 characters long';

export const projectNameSchema = z.string().min(1, projectNameLengthErr).max(30, projectNameLengthErr);
export const projectDescriptionSchema = z.string().min(1, projectDescriptionLengthErr).max(300, projectDescriptionLengthErr);
export const githubLinkSchema = z
    .string()
    .url('Invalid URL')
    .regex(/^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\.git$/, 'Link must be a GitHub repository');
