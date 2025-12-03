import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import UserInformation from './pages/UserInformation';
import Dashboard from './pages/Dashboard';
import PersonalLibrary from './pages/PersonalLibrary';
import BorrowBookRequest from './pages/BorrowRequest';
import PenaltyTracking from './pages/PenaltyTracker';



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
        
     </Routes>
    </BrowserRouter>
  );
}

export default App;
  
