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

  let content;
  if (user._id === listing.user) {
    content = <h3 style={{ color: 'orange' }}>You created this listing</h3>;
  } else if (requested === user._id || listing.requests?.includes(user._id)) {
    content = (
      <h3 style={{ color: 'orange' }}>
        You have requested to join this listing
      </h3>
    );
  } else {
    content = (
      <button
        type='submit'
        onClick={() => dispatch(requestListing(listing._id))}
      >
        Request to Join this Project
      </button>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>{listing.text}</h1>
      <h3>Looking for a {listing.requiredSkill} to join this project</h3>
      {content}
    </div>
  );
}

export default ShowFeedListing;
