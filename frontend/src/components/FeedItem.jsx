import { Link } from 'react-router-dom';
function FeedItem({ listing }) {
  return (
    <Link to={`/feed/${listing._id}`} state={{ listing: listing }}>
      <div className='listing'>
        <h2>{listing.text}</h2>
        <h3>required skill: {listing.requiredSkill}</h3>
        <h4>Created by: {listing.user}</h4>
      </div>
    </Link>
  );
}

export default FeedItem;
