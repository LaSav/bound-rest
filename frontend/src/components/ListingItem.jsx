import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
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
        marginY={4}
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
