import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { matchRequest } from '../features/listing/listingSlice';

function RequestItem({ request, listing }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate, dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(matchRequest({ id: listing._id, data: request._id }));
  };

  return (
    <div className='request'>
      <h3>{request.name}</h3>
      <h3>{request._id}</h3>
      <h3>{request.createdAt}</h3>
      <button className='match' onClick={(e) => handleClick(e)}>
        Match with User
      </button>
    </div>
  );
}
export default RequestItem;
