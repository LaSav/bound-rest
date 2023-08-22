import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Container maxWidth='sm'>
        <Typography variant='h4'>Register</Typography>
        <Typography variant='h5'>Create an account</Typography>
        <form noValidate autoComplete='off' onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              label='Enter Your Name'
              fullWidth
              onChange={onChange}
            />
            <TextField
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              label='Enter Your Email'
              fullWidth
              onChange={onChange}
            />
            <TextField
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              label='Create a Password'
              fullWidth
              onChange={onChange}
            />
            <TextField
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              label='Confirm Password'
              fullWidth
              onChange={onChange}
            />
            <Button color='secondary' variant='outlined' type='submit'>
              Create Account
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default Register;
