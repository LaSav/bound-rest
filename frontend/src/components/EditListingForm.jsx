import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateListing } from '../features/listing/listingSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';

function EditListingForm({ listing, toggleEdit }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    text: listing.text,
    requiredSkill: listing.requiredSkill,
  });

  const { text, requiredSkill } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      text,
      requiredSkill,
    };
    dispatch(updateListing({ id: listing._id, data: userData }));
    toggleEdit();
  };
  return (
    <>
      <Typography variant='h3' gutterBottom>
        Edit Listing
      </Typography>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label='Listing Description'
            variant='outlined'
            type='text'
            name='text'
            id='text'
            multiline
            rows={7}
            value={text}
            fullWidth
            onChange={onChange}
          />
          <Typography variant='h6' color='secondary'>
            Select the skill required for this listing
          </Typography>
          <Box width='50%'>
            <Select
              name='requiredSkill'
              id='requiredSkill'
              value={requiredSkill}
              label='Select the Skill required for this listing'
              onChange={onChange}
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
                color='warning'
                fullWidth
                variant='contained'
                onClick={toggleEdit}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </Stack>
      </form>
    </>
  );
}

export default EditListingForm;
