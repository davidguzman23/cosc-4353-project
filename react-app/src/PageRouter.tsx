import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAs from './pages/LoginAs';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import VolunteerProfile from './pages/Profile';
import EventsManagement from './pages/EventsManagement';
import VolunteerHistory from './pages/VolunteerHistory';
import NoPage from './pages/NoPage';
import EventManagementForm from './components/EventManagementForm';
import VolunteerMatchingForm from './components/VolunteerMatchingForm';  // ✅ Import this
import Notificiations from './components/Notifications';

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
          <Route path="/event-management" element={<EventManagementForm />} />
          <Route path="/volunteer-matching" element={<VolunteerMatchingForm />} />  {/* ✅ Added this route */}
          <Route path="/notifications" element={<Notificiations />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        </div>
      </Router>
    );
  };
  
export default PageRouter;
