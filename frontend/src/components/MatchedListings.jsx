import { getMatched } from '../features/listings/listingSlice';
import FeedItem from './FeedItem';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function MatchedListings({ toggleRequested }) {
  // const dispatch = useDispatch();
  const { matchedListings, isLoading, isError, message } = useSelector(
    (state) => state.listings
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    // dispatch(getMatched());
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Stack spacing={1}>
      <Box>
        <Typography variant='h5'>Matched With:</Typography>
        <Button variant='outlined' color='secondary' onClick={toggleRequested}>
          Requested To
        </Button>
      </Box>
      {matchedListings.length > 0 ? (
        <div className='requesteds'>
          {matchedListings.map((matchedListing) => (
            <FeedItem key={matchedListing._id} listing={matchedListing} />
          ))}
        </div>
      ) : (
        <h3>You haven't had any matches yet</h3>
      )}
    </Stack>
  );
}

export default MatchedListings;
