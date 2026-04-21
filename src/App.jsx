import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Home from './pages/Home';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Navbar from './component/Navbar';

/**
 * App Component
 * We use BrowserRouter to enable multi-page navigation.
 * Navbar is placed outside <Routes> so it persists across all pages.
 */
function App() {
  return (
    <Router>
      <div className="app-container bg-[#0a0a0a] min-h-screen selection:bg-orange-500 selection:text-black">
        {/* Global Navigation */}
        <Navbar />

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          
          {/* 404 Redirect - Optional: Sends user back home if link is broken */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;