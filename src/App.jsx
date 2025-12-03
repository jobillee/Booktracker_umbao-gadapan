import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from "./pages/Borrower/LandingPage";
import UserInformation from './pages/Borrower/UserInformation';
import Dashboard from './pages/Borrower/Dashboard';
import PersonalLibrary from './pages/Borrower/PersonalLibrary';
import BorrowBookRequest from './pages/Borrower/BorrowRequest';
import PenaltyTracking from './pages/Borrower/PenaltyTracker';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SalesTransactionPage from './pages/Admin/SalesTransaction';



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userinformation" element={<UserInformation />} />
        <Route path="/personallibrary" element={<PersonalLibrary />} />
        <Route path="/borrowrequest" element={<BorrowBookRequest />} />
        <Route path="/penalty" element={<PenaltyTracking />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/salestransaction" element={<SalesTransactionPage />} />

     </Routes>
    </BrowserRouter>
  );
}

export default App;
  
