import { getRequested } from '../features/listings/listingSlice';
import ListingItem from './ListingItem';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    <section className='user-listings'>
      {requestedListings.length > 0 ? (
        <div className='requesteds'>
          {requestedListings.map((requestedListing) => (
            <ListingItem
              key={requestedListing._id}
              listing={requestedListing}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't requested any Listings yet</h3>
      )}
    </section>
  );
}

export default RequestedListings;
