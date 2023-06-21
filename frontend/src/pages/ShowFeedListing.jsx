import { useLocation } from 'react-router-dom';

function ShowFeedListing() {
  const { state } = useLocation();
  return <div>{state.listing.text}</div>;
}

export default ShowFeedListing;
