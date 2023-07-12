import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { matchRequest } from '../features/listing/listingSlice';
import Spinner from './Spinner';

function RequestItem({ request, listing }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { matched, isLoading, isError, message } = useSelector(
    (state) => state.listing
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
  }, [user, isError, message, navigate, dispatch]);

  const handleMatch = (e) => {
    e.preventDefault();
    dispatch(matchRequest({ id: listing._id, data: request._id }));
  };

  let content;
  if (matched === request._id || listing.matches?.includes(request._id)) {
    content = <h3 style={{ color: 'green' }}>Matched</h3>;
  } else {
    content = (
      <button className='match' type='button' onClick={(e) => handleMatch(e)}>
        Match with User
      </button>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='request'>
      <h3>{request.name}</h3>
      <h3>{request._id}</h3>
      <h3>{request.createdAt}</h3>
      {content}
    </div>
  );
}
export default RequestItem;
