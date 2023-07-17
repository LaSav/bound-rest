import Spinner from '../components/Spinner';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, editUser, resetUser } from '../features/user/userSlice';

function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  console.log(profile);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    offeredSkill: 'fullstack developer',
    portfolio: '',
  });

  const { name, email, bio, offeredSkill, portfolio } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getUser());
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

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
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='offeredSkill'>Select a Skill</label>
            <select
              name='offeredSkill'
              id='offeredSkill'
              value={offeredSkill}
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
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditUser;
