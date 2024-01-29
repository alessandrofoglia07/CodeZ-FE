import { z } from 'zod';
import { authFormSchema } from '@/utils/validation';

export type AuthFormSchema = z.infer<typeof authFormSchema>;
