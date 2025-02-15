import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LoginAs from './pages/LoginAs';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './LoginPage';
import VolunteerProfile from './pages/VolunteerProfile';
import AdminProfile from './pages/AdminProfile';
import EventsManagement from './pages/EventsManagement';

const PageRouter = () => {
    return (
      <Router>
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/volunteer-profile">Volunteer Profile</Link>
              </li>
            </ul>
          </nav> */}
  
        <Routes>
          <Route index element={<LoginAs />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/sign-up-page" element={<SignUpPage />} />
          <Route path="/volunteer-profile" element={<VolunteerProfile />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/events-management" element={<EventsManagement />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        </div>
      </Router>
    );
  };
  
  export default PageRouter;
