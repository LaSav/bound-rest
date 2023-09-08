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
import Settings from './pages/Settings';
import ShowUser from './pages/ShowUser';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    background: {
      default: '#dee4e9',
    },
    primary: {
      main: '#dee4e9',
      dark: '#bec9d4',
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
          <CssBaseline />
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
              <Route path={'/settings'} element={<Settings />} />
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
      <ToastContainer />
    </>
  );
}
export default App;
