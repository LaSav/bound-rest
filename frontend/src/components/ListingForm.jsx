import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createListing } from '../features/listings/listingSlice';

function ListingForm() {
  const [text, setText] = useState('');
  const [requiredSkill, setRequiredSkill] = useState('fullstack developer');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createListing({ text, requiredSkill }));
    setText('');
    setRequiredSkill('');
  };
  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Listing Description:</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='requiredSkill'>
            Enter the Skill required for this listing:
          </label>
          <select
            name='requiredSkill'
            id='requiredSkill'
            value={requiredSkill}
            onChange={(e) => setRequiredSkill(e.target.value)}
          >
            <option value='fullstack developer'>Fullstack developer</option>
            <option value='frontend developer'>Frontend developer</option>
            <option value='backend developer'>Backend developer</option>
            <option value='UX designer'>UX designer</option>
            <option value='copywriter'>Copywriter</option>
          </select>
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
