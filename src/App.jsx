import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import UserInformation from './pages/UserInformation';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="/userinformation" element={<UserInformation />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
  