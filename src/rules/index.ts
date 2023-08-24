export const loginRules = {
  email: {
    required: {
      value: true,
      message: 'O campo e-mail é obrigatório',
    },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'E-mail inválido, insira o e-mail corretamente',
    },
  },
  password: {
    required: {
      value: true,
      message: 'O campo senha é obrigatório',
    },
  },
};
