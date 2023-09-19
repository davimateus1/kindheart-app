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

export const registerSchema = z.object({
  firstName: z.string({ required_error: 'O campo nome é obrigatório' }),
  lastName: z.string({ required_error: 'O campo sobrenome é obrigatório' }),
  birthDate: z.string({ required_error: 'O campo data de nascimento é obrigatório' }),
  cpf: z
    .string({ required_error: 'O campo CPF é obrigatório' })
    .min(14, { message: 'O CPF deve conter 11 caracteres' }),
  email: z.string({ required_error: 'O campo e-mail é obrigatório' }).email({
    message: 'E-mail inválido, insira o e-mail corretamente',
  }),
  password: z.string({ required_error: 'O campo senha é obrigatório' }).min(6, {
    message: 'A senha deve conter no mínimo 6 caracteres',
  }),
  image: z.string().optional(),
  personalPhone: z.string({ required_error: 'O campo telefone pessoal é obrigatório' }).min(15, {
    message: 'O telefone deve conter 11 caracteres',
  }),
  emergencyPhone: z
    .string({ required_error: 'O campo telefone de emergência é obrigatório' })
    .min(15, {
      message: 'O telefone deve conter 11 caracteres',
    }),
  address: z.string({ required_error: 'O campo endereço é obrigatório' }).min(20, {
    message: 'Informe um endereço mais completo (ex: Rua, número, bairro, cidade, estado)',
  }),
  gender: z.enum(['MALE', 'FEMALE', 'NOT_INFORM']),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const codeSchema = z.object({
  code: z.string({ required_error: 'O código é obrigatório' }).min(6, {
    message: 'O código deve conter 6 caracteres',
  }),
});

export type CodeSchema = z.infer<typeof codeSchema>;
