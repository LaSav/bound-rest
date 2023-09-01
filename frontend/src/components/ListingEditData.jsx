import RequestItem from '../components/RequestItem';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { deleteListing } from '../features/listing/listingSlice';
import Typography from '@mui/material/Typography';

function ListingEditData({ listing, requests, toggleEdit }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteListing(listing._id));
  };

  return (
    <div>
      <h1>{listing.text}</h1>
      <h2>{listing.requiredSkill}</h2>

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
        <Button color='secondary' onClick={toggleEdit}>
          Edit
        </Button>
        <Button color='warning' onClick={handleDelete}>
          Delete Listing
        </Button>
      </section>
    </div>
  );
}

export default ListingEditData;
