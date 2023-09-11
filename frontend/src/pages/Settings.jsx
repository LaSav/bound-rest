import { deleteUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleDelete = () => {
    dispatch(deleteUser());
    navigate('/');
  };

  return (
    <div>
      <h3>Delete Account?</h3>
      <button onClick={handleDelete}>Delete account</button>
    </div>
  );
}

export default Settings;
