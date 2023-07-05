import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getListing, getRequests } from '../features/listing/listingSlice';

function ShowListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { listing, requested, isLoading, isError, message } = useSelector(
    (state) => state.listing
  );
  const { listingId } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getListing(listingId));
    dispatch(getRequests(listingId));
  }, [user, navigate, isError, message, dispatch, listingId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>{listing.text}</h1>
      <p>You have {listing.requests?.length} requests to this Listing</p>
    </div>
  );
}

export default ShowListing;
