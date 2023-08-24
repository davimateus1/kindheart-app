import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'O campo e-mail é obrigatório' })
    .email({ message: 'E-mail inválido, insira o e-mail corretamente' }),
  password: z
    .string({ required_error: 'O campo senha é obrigatório' })
    .min(6, { message: 'A senha deve conter no mínimo 6 caracteres' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
