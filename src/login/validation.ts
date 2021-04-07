import { FormValues } from '.';

export const validate = (values: FormValues) => {
  const errors: FormValues = {};
  if (!values.username) {
    errors.username = 'Usuário obrigatório';
  }
  if (!values.password) {
    errors.password = 'Senha obrigatória';
  }
  return errors;
};
