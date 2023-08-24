export const loginRules = {
  email: {
    required: {
      value: true,
      message: "Campo obrigatório",
    },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "E-mail inválido",
    },
  },
  password: {
    required: {
      value: true,
      message: "Campo obrigatório",
    },
  },
};
