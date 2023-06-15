import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createListing } from '../features/listings/listingSlice';

function ListingForm() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createListing({ text }));
    setText('');
  };
  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Listing</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Listing
          </button>
        </div>
      </form>
    </section>
  );
}

export default ListingForm;
