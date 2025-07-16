import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const Language = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <section className="pt-28 pb-20 bg-gradient-to-r from-indigo-50 to-violet-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-violet-700 mb-6">Learn a New Language</h1>
          <p className="text-lg text-gray-700 mb-8">
            Unlock global opportunities, connect with cultures, and boost brainpower—one word at a time.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Learn Languages?</h2>
            <p className="text-gray-600 mb-4">
              Speaking multiple languages opens doors to travel, jobs, friendships, and personal growth.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Enhance memory and focus</li>
              <li>Explore new cultures deeply</li>
              <li>Advance careers and study abroad</li>
              <li>Make international friends</li>
            </ul>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/3728084/pexels-photo-3728084.jpeg"
              alt="Language"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-violet-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-violet-800 mb-10">Step-by-Step Language Path</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Step 1: Pick Your Language',
                description: 'Choose a language that excites you or benefits your goals.',
              },
              {
                title: 'Step 2: Learn the Basics',
                description: 'Start with common phrases, pronunciation, and simple grammar.',
              },
              {
                title: 'Step 3: Practice Daily',
                description: 'Use flashcards, mobile apps, or notebooks to build vocabulary.',
              },
              {
                title: 'Step 4: Watch & Listen',
                description: 'Immerse through music, shows, podcasts, and native speakers.',
              },
              {
                title: 'Step 5: Speak & Write',
                description: 'Talk to others, record yourself, and write short sentences.',
              },
              {
                title: 'Step 6: Join Language Groups',
                description: 'Find partners or communities to stay consistent and grow fast.',
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-violet-700 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">What Language Learners Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Tanvi Joshi',
                quote: 'Learning French here felt so natural. I now understand movies and talk to new friends!',
              },
              {
                name: 'Arjun Reddy',
                quote: 'I picked Japanese for anime and now I’m preparing for JLPT exam. It’s exciting!',
              },
              {
                name: 'Mira Singh',
                quote: 'I now speak Spanish with my teammates at work. This platform made it possible.',
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-violet-100 p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
                <h4 className="text-lg font-semibold text-violet-800">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Start Learning a Language Today</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Learn anywhere, anytime. Communicate, connect, and expand your world.
        </p>
        <Link
          to="/signup"
          className="bg-white text-violet-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Language;
