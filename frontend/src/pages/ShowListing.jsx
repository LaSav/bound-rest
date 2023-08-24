import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getListing, getRequests } from '../features/listing/listingSlice';
import EditListingToggle from '../components/EditListingToggle';
import { Container } from '@mui/material';

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
    <Container maxWidth='sm'>
      <EditListingToggle listing={listing} requests={requests} />
    </Container>
  );
}

export default ShowListing;
