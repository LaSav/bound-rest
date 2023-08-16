import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Feed from './pages/Feed';
import ShowFeedListing from './pages/ShowFeedListing';
import ShowListing from './pages/ShowListing';
import EditUser from './pages/EditUser';
import ShowUser from './pages/ShowUser';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#dee4e9',
    },
    secondary: {
      main: '#607e96',
    },
  },
});

function App() {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <div className='container'>
            <Header />
            <Routes>
              <Route path={'/'} element={<Dashboard />} />
              <Route path={'/register'} element={<Register />} />
              <Route path={'/login'} element={<Login />} />
              <Route path={'/feed'} element={<Feed />} />
              <Route path={'/feed/:listingId'} element={<ShowFeedListing />} />
              <Route path={'/listings/:listingId'} element={<ShowListing />} />
              <Route path={'/users/:userId'} element={<ShowUser />} />
              <Route path={'/edit-profile'} element={<EditUser />} />
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
      <ToastContainer />
    </>
  );
}
export default App;
