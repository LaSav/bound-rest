import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        <Button color='inherit'>
          <Link to='/feed' style={{ textDecoration: 'none', color: 'black' }}>
            Listings
          </Link>
        </Button>
        {user ? (
          <>
            <Button color='inherit'>
              <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                Dashboard
              </Link>
            </Button>
            <Button color='inherit'>
              <Link
                to='/settings'
                style={{ textDecoration: 'none', color: 'black' }}
              >
                Settings
              </Link>
            </Button>
            <div style={{ marginLeft: 'auto' }}>
              <Button color='inherit' onClick={onLogout}>
                Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginLeft: 'auto' }}>
              <Button color='inherit'>
                <Link
                  to='/login'
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Login
                </Link>
              </Button>
              <Button color='inherit'>
                <Link
                  to='/register'
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Register
                </Link>
              </Button>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
