import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteListing } from '../features/listings/listingSlice';

function ListingItem({ listing }) {
  const dispatch = useDispatch();
  return (
    <div className='listing'>
      <Link to={`/listings/${listing._id}`}>
        <h2>{listing.text}</h2>
      </Link>

      <h3>required skills: {listing.requiredSkill}</h3>
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
