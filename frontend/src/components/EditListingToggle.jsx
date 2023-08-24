import ListingEditData from './ListingEditData';
import EditListingForm from './EditListingForm';
import { useState } from 'react';
import { Container } from '@mui/material';

function EditListingToggle({ listing, requests }) {
  const [showListingEditData, setShowListingEditData] = useState(true);

  const toggleEdit = () => {
    setShowListingEditData(!showListingEditData);
  };

  return (
    <div>
      {showListingEditData ? (
        <ListingEditData
          listing={listing}
          requests={requests}
          // isLoading={isLoading}
          toggleEdit={toggleEdit}
        />
      ) : (
        <EditListingForm
          listing={listing}
          // isLoading={isLoading}
          toggleEdit={toggleEdit}
        />
      )}
    </div>
  );
}

export default EditListingToggle;
