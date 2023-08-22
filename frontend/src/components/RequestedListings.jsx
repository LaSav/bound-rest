import { getRequested } from '../features/listings/listingSlice';
import FeedItem from './FeedItem';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function RequestedListings() {
  const dispatch = useDispatch();
  const { requestedListings, isLoading, isError, message } = useSelector(
    (state) => state.listings
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getRequested());
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Stack spacing={1}>
      <Typography variant='h5'>Requested to:</Typography>
      {requestedListings.length > 0 ? (
        <div className='requesteds'>
          {requestedListings.map((requestedListing) => (
            <FeedItem key={requestedListing._id} listing={requestedListing} />
          ))}
        </div>
      ) : (
        <h3>You haven't requested any Listings yet</h3>
      )}
    </Stack>
  );
}

export default RequestedListings;