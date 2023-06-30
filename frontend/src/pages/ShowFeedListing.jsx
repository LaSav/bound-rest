import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getFeedListing,
  requestListing,
} from '../features/feedListing/feedListingSlice';

function ShowFeedListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { listing, requested, isLoading, isError, message } = useSelector(
    (state) => state.feedListing
  );
  const { state } = useLocation();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getFeedListing(state.listing._id));
  }, [user, navigate, isError, message, dispatch]);

  // Check if user is creator of Listing
  console.log(state.listing.requests);
  console.log(listing.requests);
  if (requested === user._id || listing.requests?.includes(user._id)) {
    console.log('user is requested to this listing');
  }

  // Show user is requested to Listing

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>{state.listing.text}</h1>
      <h3>Looking for a {state.listing.requiredSkill} to join this project</h3>
      <button
        type='submit'
        onClick={() => dispatch(requestListing(state.listing._id))}
      >
        Request to Join this Project
      </button>
    </div>
  );
}

export default ShowFeedListing;
