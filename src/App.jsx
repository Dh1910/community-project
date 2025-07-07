import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import Skills from './components/Skills.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Community from './pages/Community.jsx';
import CreatePostModal from './pages/CreatePostModal.jsx';
import StartDiscussionModal from './pages/StartDiscussionModal.jsx';
import Login from './pages/Login.jsx';  // ✅ Used as modal AND route
import Signup from './pages/Signup.jsx'; // ✅ Used as modal AND route
import Users from './components/Users.jsx';
import Feed from './components/Feed.jsx';
import Benefits from './components/Benefits.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';
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
        {/* 🏠 Home Page */}
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

        {/* 🔍 Explore Skills */}
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

        {/* 🧑‍🤝‍🧑 Community Page */}
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

        {/* ✅ Login and Signup as Full Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
 <Route path="/about" element={<About />} />
      </Routes>

     
    </Router>
  );
}

export default App;
