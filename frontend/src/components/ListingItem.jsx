import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';

function ListingItem({ listing }) {
  return (
    <Link
      to={`/listings/${listing._id}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <Box
        elevation={0}
        sx={{
          backgroundColor: 'primary.main',
          '&:hover': {
            color: 'secondary.main',
          },
        }}
        marginY={3}
        pr={3}
      >
        <Typography variant='h6'>{listing.text}</Typography>

        <Typography variant='h7'>
          required skills: {listing.requiredSkill}
        </Typography>
      </Box>
      <Divider />
    </Link>
  );
}
export default ListingItem;
