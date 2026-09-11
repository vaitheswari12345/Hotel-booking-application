import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Booking from "./Booking.jsx";
import Success from "./Success.jsx";
import MyBooking from "./MyBooking.jsx";
import './index.css';
import { useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import SearchResult from './SearchResult.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/success" element={<Success />} />
        <Route path="/mybooking" element={<MyBooking />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)