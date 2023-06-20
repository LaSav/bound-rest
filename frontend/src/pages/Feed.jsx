import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFeed, reset } from '../features/feed/feedSlice';
import Spinner from '../components/Spinner';
import FeedItem from '../components/FeedItem';

function Feed() {
  const dispatch = useDispatch();

  const { listings, isLoading, isError, message } = useSelector(
    (state) => state.feed
  );

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getFeed());
  }, [isError, message, dispatch]);

  const filteredListings = listings.filter((listing) => {
    return listing.requiredSkill
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  console.log(filteredListings);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const content = filteredListings.map((listing) => {
    console.log(listing);
    return <FeedItem key={listing._id} listing={listing} />;
  });

  return (
    <>
      <section className='heading'>
        <label htmlFor='searchTerm'>Find Listings for:</label>
        <select
          name='searchTerm'
          id='searchTerm'
          value={searchTerm}
          onChange={handleSearch}
        >
          <option value='fullstack developer'>Fullstack developer</option>
          <option value='frontend developer'>Frontend developer</option>
          <option value='backend developer'>Backend developer</option>
          <option value='UX designer'>UX designer</option>
          <option value='copywriter'>Copywriter</option>
        </select>
      </section>
      <section className='content'>{content}</section>
    </>
  );
}

export default Feed;
