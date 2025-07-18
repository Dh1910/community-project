import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import Skills from './components/Skills.jsx';
import ScrollToTop from './components/ScrollToTop';
import CTA from './components/CTA.jsx';
import Users from './components/Users.jsx';
import Feed from './components/Feed.jsx';
import Benefits from './components/Benefits.jsx';
import Footer from './components/Footer.jsx';

import HowItWorks from './pages/HowItWorks.jsx';
import Community from './pages/Community.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Explore from './pages/Explore.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import ProfileSummary from './pages/ProfileSummary.jsx';
import FAQ from './pages/FAQ.jsx';
import Privacy from './pages/Privacy.jsx';
import TOS from './pages/TOS.jsx';
import CreatePostModal from './pages/CreatePostModal.jsx';
import StartDiscussionModal from './pages/StartDiscussionModal.jsx';
import CreateCommunity from './pages/CreateCommunity.jsx';

import Coding from './pages/SkillPages/Coding.jsx';
import Guitar from './pages/SkillPages/Guitar.jsx';
import Cooking from './pages/SkillPages/Cooking.jsx';
import Fitness from './pages/SkillPages/Fitness.jsx';
import Language from './pages/SkillPages/Language.jsx';
import Painting from './pages/SkillPages/Painting.jsx';
import Photography from './pages/SkillPages/Photography.jsx';
import CustomSkill from './pages/SkillPages/CustomSkill.jsx';

import CommentSection from './pages/CommentSection.jsx';



function HomePage({ openModal, openLogin, openSignup }) {
  return (
    <>
      <Header onLogin={openLogin} onSignup={openSignup} />
      <HeroSection />
      <Skills />
      <Users />
      <Feed />
      <Benefits />
      <CTA />
      <Footer />
      <ScrollToTop />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/community" element={<Community />} />
        <Route path="/createpostmodal" element={<CreatePostModal />} />
        <Route path="/start-discussion-modal" element={<StartDiscussionModal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-summary" element={<ProfileSummary />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<TOS />} />
        <Route path="/create-community" element={<CreateCommunity />} />
        <Route path="/skills" element={<Skills />} />


        {/* Skill Pages */}
        <Route path="/skill/coding" element={<Coding />} />
        <Route path="/skill/guitar" element={<Guitar />} />
        <Route path="/skill/cooking" element={<Cooking />} />
        <Route path="/skill/fitness" element={<Fitness />} />
        <Route path="/skill/language" element={<Language />} />
        <Route path="/skill/painting" element={<Painting />} />
        <Route path="/skill/photography" element={<Photography />} />
        <Route path="/skill/custom" element={<CustomSkill />} />
        <Route path="/coding-community" element={<Navigate to="/skill/coding" />} />

        <Route path="/commentsection" element={<CommentSection />} />

      </Routes>
    </Router>
  );
}

export default App;
