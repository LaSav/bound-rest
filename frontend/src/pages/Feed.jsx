import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFeed, reset } from '../features/feed/feedSlice';
import Spinner from '../components/Spinner';
import FeedItem from '../components/FeedItem';

function Feed() {
  const dispatch = useDispatch();

  const { listings, isLoading, isError, message } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getFeed());
  }, [isError, message, dispatch]);

  console.log(listings);

  if (isLoading) {
    return <Spinner />;
  }

  const content = listings.map((listing) => {
    console.log(listing);
    return <FeedItem key={listing._id} listing={listing} />;
  });

  return (
    <>
      <section className='heading'>
        <p>Find Listings by:</p>
      </section>
      <section className='content'>{content}</section>
    </>
  );
}

export default Feed;
