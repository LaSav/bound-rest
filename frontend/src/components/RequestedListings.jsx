import FeedItem from './FeedItem';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import KeyboardArrowrRightIcon from '@mui/icons-material/KeyboardArrowRight';

function RequestedListings({ toggleRequested }) {
  const { requestedListings, isLoading, isError, message } = useSelector(
    (state) => state.listings
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Stack spacing={1}>
      <Box>
        <Button
          endIcon={<KeyboardArrowrRightIcon />}
          color='secondary'
          onClick={toggleRequested}
        >
          Requested
        </Button>
      </Box>
      {requestedListings.length > 0 ? (
        <Box>
          {requestedListings.map((requestedListing) => (
            <FeedItem key={requestedListing._id} listing={requestedListing} />
          ))}
        </Box>
      ) : (
        <h3>You haven't requested any Listings yet</h3>
      )}
    </Stack>
  );
}

export default RequestedListings;
