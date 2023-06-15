import { useDispatch } from 'react-redux';
import { deleteListing } from '../features/listings/listingSlice';

function ListingItem({ listing }) {
  const dispatch = useDispatch();
  return (
    <div className='listing'>
      <h2>{listing.text}</h2>
      <button
        className='close'
        onClick={() => dispatch(deleteListing(listing._id))}
      >
        Delete Listing
      </button>
    </div>
  );
}
export default ListingItem;
