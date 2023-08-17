import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createListing } from '../features/listings/listingSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Add from '@mui/icons-material/Add';

function ListingForm() {
  const [text, setText] = useState('');
  const [requiredSkill, setRequiredSkill] = useState('fullstack developer');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createListing({ text, requiredSkill }));
    setText('');
    setRequiredSkill('');
  };
  return (
    <form noValidate autoComplete='off' onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          label='Listing Description'
          type='text'
          name='text'
          id='text'
          multiline
          rows={7}
          value={text}
          fullWidth
          onChange={(e) => setText(e.target.value)}
        />
        <Typography variant='h6' color='secondary'>
          Select the skill required for this listing
        </Typography>
        <Stack direction='row' spacing={2}>
          <Box width='50%'>
            <Select
              name='requiredSkill'
              id='requiredSkill'
              value={requiredSkill}
              label='Select the Skill required for this listing'
              onChange={(e) => setRequiredSkill(e.target.value)}
              fullWidth
            >
              <MenuItem value='fullstack developer'>
                Fullstack developer
              </MenuItem>
              <MenuItem value='frontend developer'>Frontend developer</MenuItem>
              <MenuItem value='backend developer'>Backend developer</MenuItem>
              <MenuItem value='UX designer'>UX designer</MenuItem>
              <MenuItem value='copywriter'>Copywriter</MenuItem>
            </Select>
          </Box>
          <Box width='50%'>
            <Button
              type='submit'
              variant='outlined'
              color='secondary'
              fullWidth
              startIcon={<Add />}
              sx={{
                height: '56px',
              }}
            >
              Add Listing
            </Button>
          </Box>
        </Stack>
      </Stack>
    </form>
  );
}

export default ListingForm;
