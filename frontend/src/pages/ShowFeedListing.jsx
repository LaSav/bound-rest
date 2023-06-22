import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { requestListing } from '../features/feed/feedSlice';

function ShowFeedListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { isError, message } = useSelector((state) => state.feed);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    console.log(user);
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate, isError, message, dispatch]);

  const { state } = useLocation();
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
