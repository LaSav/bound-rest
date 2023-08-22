import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Container maxWidth='sm'>
        <Typography variant='h4'>Login</Typography>

        <form noValidate autoComplete='off' onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              label='Email'
              fullWidth
              onChange={onChange}
            />
            <TextField
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              label='Password'
              fullWidth
              onChange={onChange}
            />
            <Button
              type='submit'
              variant='outlined'
              color='secondary'
              fullWidth
            >
              Login
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default Login;
