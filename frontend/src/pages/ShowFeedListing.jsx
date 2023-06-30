import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const { listingId } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getFeedListing(listingId));
  }, [user, navigate, isError, message, dispatch, listingId]);

  // Check if user is creator of Listing, remove button

  if (user._id === listing.user) {
    console.log('You are the creator of this listing');
  }
  // Show user is already requested to Listing, remove button (show unrequest button)
  console.log(listing.requests);
  if (requested === user._id || listing.requests?.includes(user._id)) {
    console.log('user is requested to this listing');
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>{listing.text}</h1>
      <h3>Looking for a {listing.requiredSkill} to join this project</h3>
      <button
        type='submit'
        onClick={() => dispatch(requestListing(listing._id))}
      >
        Request to Join this Project
      </button>
    </div>
  );
}

export default ShowFeedListing;
