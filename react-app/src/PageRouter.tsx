import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
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
          <Route path="/" element={<LoginPage />} />
          <Route path="/volunteer-profile" element={<VolunteerProfile />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/events-management" element={<EventsManagement />} />
        </Routes>
        </div>
      </Router>
    );
  };
  
  export default PageRouter;