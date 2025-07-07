import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './pages/Header.jsx';
import HeroSection from './pages/HeroSection.jsx';
import Skills from './pages/Skills.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Community from './pages/Community.jsx';
import CreatePostModal from './components/CreatePostModal';
import StartDiscussionModal from './components/StartDiscussionModal';
import Login from './components/Login';
import Signup from './components/Signup';
import Users from './pages/Users.jsx';
import Feed from './pages/Feed.jsx';
import Benefits from './pages/Benefits.jsx';
import CTA from './pages/CTA.jsx';
import Footer from './pages/Footer.jsx';
import Explore from './pages/Explore.jsx';
import About from './pages/About.jsx';

function HomePage({ openModal, openLogin, openSignup }) {
  return (
    <>
      <Header onLogin={openLogin} onSignup={openSignup} />
      <HeroSection />
      <Skills />
      <HowItWorks />
      <Users />
      <Feed />
      <Benefits />
      <CTA />
      <Footer />
    </>
  );
}

function App() {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <Router>
      {/* Global Modals */}
      <CreatePostModal isOpen={showPostModal} onClose={() => setShowPostModal(false)} />
      <StartDiscussionModal isOpen={showDiscussionModal} onClose={() => setShowDiscussionModal(false)} />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <Signup isOpen={showSignup} onClose={() => setShowSignup(false)} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              openModal={() => setShowPostModal(true)}
              openLogin={() => setShowLogin(true)}
              openSignup={() => setShowSignup(true)}
            />
          }
        />
        <Route
          path="/explore"
          element={
            <Explore
              openModal={() => setShowPostModal(true)}
              openLogin={() => setShowLogin(true)}
              openSignup={() => setShowSignup(true)}
            />
          }
        />
        <Route
          path="/community"
          element={
            <Community
              openModal={() => setShowPostModal(true)}
              openDiscussionModal={() => setShowDiscussionModal(true)}
              openLogin={() => setShowLogin(true)}
              openSignup={() => setShowSignup(true)}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/cta" element={<CTA />} />
      </Routes>
    </Router>
  );
}

export default App;
