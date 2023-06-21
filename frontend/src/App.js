import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Feed from './pages/Feed';
import ShowFeedListing from './pages/ShowFeedListing';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path={'/'} element={<Dashboard />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/feed'} element={<Feed />} />
            <Route path={'/feed/:id'} element={<ShowFeedListing />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}
export default App;
