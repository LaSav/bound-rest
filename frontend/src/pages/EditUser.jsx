import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, resetUser } from '../features/user/userSlice';
import UserForm from '../components/UserForm';

function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading, isComplete, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getUser());
  }, [user, navigate, dispatch]);

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
      <h1>EditUser</h1>
      <UserForm profile={(profile, isComplete, user)} />
    </>
  );
}

export default EditUser;
