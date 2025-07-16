// CustomSkill.jsx

import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const CustomSkill = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-r from-gray-50 to-gray-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Create Your Own Skill Journey</h1>
          <p className="text-lg text-gray-700 mb-8">
            Can’t find your skill? Design your personal growth path, define your own steps, and share your progress with others.
          </p>
        </div>
      </section>

      {/* Why Create a Custom Skill? */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Create Your Own Skill?</h2>
            <p className="text-gray-600 mb-4">
              Whether it’s beatboxing, gardening, editing, or public speaking — your skill is unique and deserves a spotlight.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Track unconventional skills and hobbies</li>
              <li>Stay motivated through daily entries</li>
              <li>Inspire others by sharing your unique path</li>
              <li>Own your journey with full customization</li>
            </ul>
          </div>
          <div>
            <img
              src="https://th.bing.com/th/id/OIP.Wd0_OZ_YlMa3Fgscnxz_qwHaE8"
              alt="Custom Skill"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Custom Roadmap Preview */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Might Look</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Step 1: Define Your Skill',
                description: 'Give your skill a name and goal. What do you want to learn or master?',
              },
              {
                title: 'Step 2: Add Steps',
                description: 'Break down your goal into 3–6 clear, manageable steps.',
              },
              {
                title: 'Step 3: Post Updates',
                description: 'Add progress logs with images, videos, or notes as you go.',
              },
              {
                title: 'Step 4: Stay Consistent',
                description: 'Track your streaks, reflect, and stay motivated.',
              },
              {
                title: 'Step 5: Share Your Journey',
                description: 'Let the world see how you grow and maybe inspire someone new.',
              },
              {
                title: 'Step 6: Evolve It',
                description: 'Update your custom skill as you level up or explore new angles.',
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">What Custom Creators Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Zoya Sheikh',
                quote: 'I created a custom skill for calligraphy and it kept me engaged daily!',
              },
              {
                name: 'Rajan Bhatt',
                quote: 'Tracking my gardening progress was so fun — now I have a whole photo journal.',
              },
              {
                name: 'Tanvi Jain',
                quote: 'I love how flexible this is. I even made a skill for my poetry writing!',
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
                <h4 className="text-lg font-semibold text-gray-800">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-gray-700 to-gray-900 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Create Your Custom Skill Now</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Make your own rules, track your passion your way, and inspire others along the journey.
        </p>
        <Link
          to="/signup"
          className="bg-white text-gray-800 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default CustomSkill;