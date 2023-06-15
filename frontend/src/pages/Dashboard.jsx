import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListingForm from '../components/ListingForm';
import { getListings, reset } from '../features/listings/listingSlice';
import Spinner from '../components/Spinner';

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

    dispatch(getListings());
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Listings Dashboard</p>
      </section>
      <ListingForm />
    </>
  );
}

export default Dashboard;
