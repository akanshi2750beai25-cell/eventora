import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Context
import { useEvents } from './context/EventContext';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Toast from './components/Toast/Toast';

// Pages
import Home from './pages/Home/Home';
import Explore from './pages/Explore/Explore';
import Categories from './pages/Categories/Categories';
import EventDetails from './pages/EventDetails/EventDetails';
import Booking from './pages/Booking/Booking';
import Ticket from './pages/Ticket/Ticket';
import MyBookings from './pages/MyBookings/MyBookings';
import Wishlist from './pages/Wishlist/Wishlist';
import Profile from './pages/Profile/Profile';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
  const { toast } = useEvents();

  return (
    <div className="app-layout">
      <Navbar />
      <main id="main-content" className="main-viewport">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/ticket/:id" element={<Ticket />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast toast={toast} />
    </div>
  );
}
