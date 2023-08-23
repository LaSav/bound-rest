import RequestedListings from './RequestedListings';
import MatchedListings from './MatchedListings';
import { useState } from 'react';

function RequestedToggle() {
  const [showRequested, setShowRequested] = useState(true);

  const toggleRequested = () => {
    setShowRequested(!showRequested);
  };

  return (
    <div>
      {showRequested ? (
        <RequestedListings toggleRequested={toggleRequested} />
      ) : (
        <MatchedListings toggleRequested={toggleRequested} />
      )}
    </div>
  );
}

export default RequestedToggle;
