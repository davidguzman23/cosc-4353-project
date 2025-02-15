import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LoginAs from './pages/LoginAs';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import VolunteerProfile from './pages/Profile';
import EventsManagement from './pages/EventsManagement';
import VolunteerHistory from './pages/VolunteerHistory';
import NoPage from './pages/NoPage';

const PageRouter = () => {
    return (
      <Router>
        <div>
        <Routes>
          <Route index element={<LoginAs />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/sign-up-page" element={<SignUpPage />} />
          <Route path="/volunteer-profile" element={<VolunteerProfile />} />
          <Route path="/events-management" element={<EventsManagement />} />
          <Route path="/volunteer-history" element={<VolunteerHistory />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        </div>
      </Router>
    );
  };
  
  export default PageRouter;
