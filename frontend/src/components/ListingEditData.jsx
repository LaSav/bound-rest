import RequestItem from '../components/RequestItem';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from '@mui/material';
import { deleteListing } from '../features/listing/listingSlice';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function ListingEditData({ listing, requests, toggleEdit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { deleteMessage } = useSelector((state) => state.listing);

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    dispatch(deleteListing(listing._id));
    navigate('/');
  };

  return (
    <div>
      {showConfirmation && (
        <div className='delete-confirmation'>
          <p>Are you sure you want to delete this listing?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      )}
      {deleteMessage ? (
        <div className='success-message'>{deleteMessage}</div>
      ) : (
        <div className='edit-listing-container'>
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
      )}
    </div>
  );
}

export default ListingEditData;
