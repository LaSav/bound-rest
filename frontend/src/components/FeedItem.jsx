import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function FeedItem({ listing }) {
  return (
    <Link
      to={`/feed/${listing._id}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <Stack
        spacing={1}
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
        <Typography variant='p'>{listing.text}</Typography>

        <Typography variant='p'>
          looking for a: {listing.requiredSkill}
        </Typography>
        <Typography variant='p'>created by: {listing.user}</Typography>
      </Stack>
      <Divider />
    </Link>
  );
}

export default FeedItem;
