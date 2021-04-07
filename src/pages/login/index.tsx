import { useState } from 'react';
import { Field, withTypes } from 'react-final-form';
import { useLocation } from 'react-router-dom';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { Notification, useLogin, useNotify } from 'react-admin';

import styles from './styles.module.scss';
import { validate } from './validation';

const renderInput = ({
  meta: { touched, error } = { touched: false, error: undefined },
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

export interface FormValues {
  username?: string;
  password?: string;
}

const { Form } = withTypes<FormValues>();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const login = useLogin();
  const location = useLocation<{ nextPathname: string } | null>();

  const onSubmit = (auth: FormValues) => {
    setLoading(true);
    login(auth, location.state ? location.state.nextPathname : '/')
      .catch((error: Error) => {
        notify(error.message, 'warning');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.container}>
            <Card className={styles.card}>
              <div className={styles.avatar}>
                <Avatar>
                  <LockIcon />
                </Avatar>
              </div>

              <div className={styles.hint}>Faça seu logon</div>

              <div className={styles.formContainer}>
                <div className={styles.inputContainer}>
                  <Field
                    autoFocus
                    name="username"
                    // @ts-ignore
                    component={renderInput}
                    label="Usuário"
                    disabled={loading}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Field
                    name="password"
                    // @ts-ignore
                    component={renderInput}
                    label="Senha"
                    type="password"
                    disabled={loading}
                  />
                </div>
              </div>

              <CardActions className={styles.signInButtonContainer}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                  fullWidth
                >
                  {loading && <CircularProgress size={25} thickness={2} />}
                  Entrar
                </Button>
              </CardActions>
            </Card>
            <Notification />
          </div>
        </form>
      )}
    />
  );
};

export default Login;
