import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editUser } from '../features/user/userSlice';
import Spinner from './Spinner';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';

function UserForm({ profile, isLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
    offeredSkill: profile.offeredSkill,
    portfolio: profile.portfolio,
  });

  const { name, email, bio, offeredSkill, portfolio } = formData;

  const [disabled, setDisabled] = useState(true);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setDisabled(!disabled);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      bio,
      offeredSkill,
      portfolio,
    };
    dispatch(editUser(userData));
    navigate('/');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography variant='h6'>Edit your Profile</Typography>

      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={name}
            label='Name'
            disabled={disabled}
            onChange={onChange}
          />
          <TextField
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            label='Email'
            disabled={disabled}
            onChange={onChange}
          />
          <TextField
            type='text'
            className='form-control'
            id='bio'
            name='bio'
            value={bio}
            label='Bio'
            multiline
            rows={3}
            disabled={disabled}
            onChange={onChange}
          />
          <Typography variant='h6' htmlFor='offeredSkill'>
            Select a Skill
          </Typography>
          <Select
            name='offeredSkill'
            id='offeredSkill'
            label='Select your skill'
            value={offeredSkill}
            disabled={disabled}
            onChange={onChange}
          >
            <MenuItem value='fullstack developer'>Fullstack developer</MenuItem>
            <MenuItem value='frontend developer'>Frontend developer</MenuItem>
            <MenuItem value='backend developer'>Backend developer</MenuItem>
            <MenuItem value='UX designer'>UX designer</MenuItem>
            <MenuItem value='copywriter'>Copywriter</MenuItem>
          </Select>
          <TextField
            type='url'
            className='form-control'
            id='portfolio'
            name='portfolio'
            value={portfolio}
            label='Portfolio URL'
            disabled={disabled}
            onChange={onChange}
            size='small'
          />
          <Stack direction='row' spacing={2}>
            <Box width='50%'>
              <Button
                fullWidth
                endIcon={<DoneIcon />}
                variant='contained'
                color='success'
                type='submit'
              >
                Save
              </Button>
            </Box>
            <Box width='50%'>
              <Button
                color='secondary'
                fullWidth
                variant='contained'
                onClick={handleEdit}
              >
                Edit
              </Button>
            </Box>
          </Stack>
        </Stack>
      </form>
    </>
  );
}

export default UserForm;
