import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const Photography = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <section className="pt-28 pb-20 bg-gradient-to-r from-gray-50 to-blue-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-6">Capture the World Through Your Lens</h1>
          <p className="text-lg text-gray-700 mb-8">
            Learn to shoot stunning photos, understand lighting, and tell stories visually with confidence.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Learn Photography?</h2>
            <p className="text-gray-600 mb-4">
              Photography helps you see beauty in everyday moments and preserve memories creatively.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Express emotion through visuals</li>
              <li>Master composition and lighting</li>
              <li>Build a portfolio or personal blog</li>
              <li>Capture moments that matter</li>
            </ul>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg"
              alt="Photography"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">Step-by-Step Photography Path</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Step 1: Know Your Gear',
                description: 'Understand your camera, lenses, and settings (ISO, aperture, shutter speed).',
              },
              {
                title: 'Step 2: Learn Composition',
                description: 'Study rule of thirds, leading lines, and framing techniques.',
              },
              {
                title: 'Step 3: Practice Lighting',
                description: 'Use natural or artificial light to create mood and clarity.',
              },
              {
                title: 'Step 4: Shoot Daily',
                description: 'Experiment with themes like portraits, landscapes, or still life.',
              },
              {
                title: 'Step 5: Edit & Enhance',
                description: 'Use tools like Lightroom or Snapseed to improve your photos.',
              },
              {
                title: 'Step 6: Share & Get Feedback',
                description: 'Join photo communities and post on social media to grow.',
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">What Photographers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Kunal Bhatia',
                quote: 'Photography became my creative escape. The roadmap kept me focused.',
              },
              {
                name: 'Pooja Naik',
                quote: 'I finally understood manual settings. Now I shoot confidently in all conditions.',
              },
              {
                name: 'Ayan Khan',
                quote: 'I’ve built a beautiful portfolio thanks to this structured path!',
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-blue-100 p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
                <h4 className="text-lg font-semibold text-blue-800">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-sky-400 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Start Your Photography Journey</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Learn, shoot, share, and grow your passion for capturing the world one photo at a time.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Photography;
