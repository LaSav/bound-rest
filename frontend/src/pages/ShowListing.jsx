import Spinner from '../components/Spinner';
import RequestItem from '../components/RequestItem';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getListing, getRequests } from '../features/listing/listingSlice';

function ShowListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { listing, requests, isLoading, isError, message } = useSelector(
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

      <section className='content'>
        {requests.length > 0 ? (
          <div className='requests'>
            <h2>You have {requests.length} requests to this Listing</h2>
            {requests.map((request) => (
              <RequestItem
                key={request._id}
                request={request}
                listing={listing}
              />
            ))}
          </div>
        ) : (
          <h3>You dont have any requests to this listing yet</h3>
        )}
      </section>
    </div>
  );
}

export default ShowListing;
