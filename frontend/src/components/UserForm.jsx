import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editUser } from '../features/user/userSlice';

function UserForm({ profile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
    offeredSkill: profile.offeredSkill,
    portfolio: profile.portfolio,
  });

  const { name, email, bio, offeredSkill, portfolio } = formData;

  const [disabled, setDisabled] = useState(true);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setDisabled(!disabled);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      bio,
      offeredSkill,
      portfolio,
    };
    dispatch(editUser(userData));
    navigate('/');
  };

  return (
    <>
      <section className='heading'>
        <h1>Edit your Profile</h1>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter Your Name'
              disabled={disabled}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter Your Email'
              disabled={disabled}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='bio'
              name='bio'
              value={bio}
              placeholder='Create a bio'
              disabled={disabled}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='offeredSkill'>Select a Skill</label>
            <select
              name='offeredSkill'
              id='offeredSkill'
              value={offeredSkill}
              disabled={disabled}
              onChange={onChange}
            >
              <option value='fullstack developer'>Fullstack developer</option>
              <option value='frontend developer'>Frontend developer</option>
              <option value='backend developer'>Backend developer</option>
              <option value='UX designer'>UX designer</option>
              <option value='copywriter'>Copywriter</option>
            </select>
          </div>
          <div className='form-group'>
            <input
              type='url'
              className='form-control'
              id='portfolio'
              name='portfolio'
              value={portfolio}
              placeholder='Enter your portfolio URL'
              disabled={disabled}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <p onClick={handleEdit}>Edit</p>
            <button type='submit' className='btn btn-block'>
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default UserForm;
