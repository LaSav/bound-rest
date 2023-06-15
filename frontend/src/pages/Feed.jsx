import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeed, reset } from '../features/feed/feedSlice';
import Spinner from '../components/Spinner';

function Feed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listings, isLoading, isError, message } = useSelector(
    (state) => state.listings
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getFeed());
  }, [navigate, isError, message, dispatch]);

  return <div>Feed</div>;
}

export default Feed;
