import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListingForm from '../components/ListingForm';
import { getListings, reset } from '../features/listings/listingSlice';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { listings, isLoading, isError, message } = useSelector(
    (state) => state.listings
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    // if (!user.profileCompleted) {
    //   navigate('/edit-profile')
    // }

    dispatch(getListings());
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
      </section>
      <h2>Create a New Listing</h2>
      <ListingForm />
      <h2>Your Active Listings:</h2>
      <section className='content'>
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
    </>
  );
}

export default Dashboard;
