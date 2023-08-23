import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Listings() {
  const { listings, isLoading, isError, message } = useSelector(
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
      {listings.length > 0 ? (
        <Box>
          {listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
        </Box>
      ) : (
        <Typography variant='p'>You haven't made any Listings yet</Typography>
      )}
    </Stack>
  );
}

export default Listings;
