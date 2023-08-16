import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createListing } from '../features/listings/listingSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    <Box>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <Box width='80%' margin={2}>
          <TextField
            label='Listing Description'
            type='text'
            name='text'
            id='text'
            multiline
            rows={5}
            value={text}
            fullWidth
            onChange={(e) => setText(e.target.value)}
          />
        </Box>
        <Box width='40%' margin={2}>
          <Typography variant='h6' color='secondary'>
            Select the skill required for this listing
          </Typography>
          <Select
            name='requiredSkill'
            id='requiredSkill'
            value={requiredSkill}
            label='Select the Skill required for this listing'
            fullWidth
            onChange={(e) => setRequiredSkill(e.target.value)}
          >
            <MenuItem value='fullstack developer'>Fullstack developer</MenuItem>
            <MenuItem value='frontend developer'>Frontend developer</MenuItem>
            <MenuItem value='backend developer'>Backend developer</MenuItem>
            <MenuItem value='UX designer'>UX designer</MenuItem>
            <MenuItem value='copywriter'>Copywriter</MenuItem>
          </Select>
        </Box>
        <Box margin={2}>
          <Button type='submit' variant='outlined' color='secondary'>
            Add Listing
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ListingForm;
