import Spinner from '../components/Spinner';
// import UserProfile from '../components/UserProfile';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../features/user/userSlice';

function ShowUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading, isError, message } = useSelector(
    (state) => state.user
  );
  const { userId } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getUserById(userId));
  }, [user, navigate, isError, message, dispatch, userId]);

  return <div>{profile.name}</div>;
}

export default ShowUser;
