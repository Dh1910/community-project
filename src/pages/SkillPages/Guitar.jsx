import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const Guitar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <section className="pt-28 pb-20 bg-gradient-to-r from-yellow-50 to-orange-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-orange-700 mb-6">Play the Guitar Like a Pro</h1>
          <p className="text-lg text-gray-700 mb-8">
            Learn chords, strumming, and songs from scratch. Whether you're a beginner or advancing, this is your jam space.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Learn Guitar?</h2>
            <p className="text-gray-600 mb-4">
              Playing the guitar enhances your musical expression, relieves stress, and connects you to a creative community.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Express yourself through music</li>
              <li>Build rhythm, coordination, and creativity</li>
              <li>Perform for others or just for yourself</li>
              <li>Join bands or create your own sound</li>
            </ul>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/165971/pexels-photo-165971.jpeg"
              alt="Guitar"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-orange-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-orange-800 mb-10">Step-by-Step Guitar Learning Path</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Step 1: Learn Guitar Basics',
                description: 'Get familiar with strings, tuning, posture, and basic terminology.',
              },
              {
                title: 'Step 2: Practice Open Chords',
                description: 'Learn major and minor open chords, the foundation of most songs.',
              },
              {
                title: 'Step 3: Strumming & Rhythm',
                description: 'Improve timing with down-up patterns and metronome play.',
              },
              {
                title: 'Step 4: Play Easy Songs',
                description: 'Use your chords to play full songs and gain confidence.',
              },
              {
                title: 'Step 5: Learn Barre Chords & Scales',
                description: 'Expand your sound and reach any key or melody.',
              },
              {
                title: 'Step 6: Record & Share',
                description: 'Capture your music and share your progress with the world.',
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-orange-700 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">What Guitarists Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Nikhil Verma',
                quote: 'The roadmap helped me stay consistent and play songs in just a few weeks.',
              },
              {
                name: 'Meena Joshi',
                quote: 'I always wanted to play for my family. Now I do, thanks to the community!',
              },
              {
                name: 'Aarav Sinha',
                quote: 'This site made learning the guitar feel fun and achievable.',
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-orange-100 p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
                <h4 className="text-lg font-semibold text-orange-800">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Start Playing Guitar Today</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Make music, feel joy, and grow your skill one string at a time.
        </p>
        <Link
          to="/signup"
          className="bg-white text-orange-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Guitar;
