import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import UserInformation from './pages/UserInformation';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import PersonalLibrary from './pages/PersonalLibrary';
// Admin pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import LendingPage from './pages/Admin/LendingPage';
import ProfileManagement from './pages/Admin/ProfileManagement';
import SalesTransaction from './pages/Admin/SalesTransaction';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="/userinformation" element={<UserInformation />} />
        <Route path="/library" element={<PersonalLibrary />} />
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/lending" element={<LendingPage />} />
        <Route path="/admin/profile-management" element={<ProfileManagement />} />
        <Route path="/admin/sales-transaction" element={<SalesTransaction />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
  