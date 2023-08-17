import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListings } from '../features/listings/listingSlice';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Listings() {
  const dispatch = useDispatch();

  const { listings, isLoading, isError, message } = useSelector(
    (state) => state.listings
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getListings());
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className='user-listings'>
      {listings.length > 0 ? (
        <div className='listings'>
          {listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <h3>You haven't made any Listings yet</h3>
      )}
    </section>
  );
}

export default Listings;
