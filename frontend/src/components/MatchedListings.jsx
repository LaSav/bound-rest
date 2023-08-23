import FeedItem from './FeedItem';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function MatchedListings({ toggleRequested }) {
  const { matchedListings, isLoading, isError, message } = useSelector(
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
          startIcon={<KeyboardArrowLeftIcon />}
          color='secondary'
          onClick={toggleRequested}
        >
          Matched
        </Button>
      </Box>
      {matchedListings.length > 0 ? (
        <Box>
          {matchedListings.map((matchedListing) => (
            <FeedItem key={matchedListing._id} listing={matchedListing} />
          ))}
        </Box>
      ) : (
        <h3>You haven't had any matches yet</h3>
      )}
    </Stack>
  );
}

export default MatchedListings;
