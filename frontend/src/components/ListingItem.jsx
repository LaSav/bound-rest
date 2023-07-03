import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteListing } from '../features/listings/listingSlice';

function ListingItem({ listing }) {
  const dispatch = useDispatch();
  return (
    <Link to={`/listings/${listing._id}`}>
      <div className='listing'>
        <h2>{listing.text}</h2>
        <h3>required skills: {listing.requiredSkill}</h3>
        <button
          className='close'
          onClick={() => dispatch(deleteListing(listing._id))}
        >
          Delete Listing
        </button>
      </div>
    </Link>
  );
}
export default ListingItem;
