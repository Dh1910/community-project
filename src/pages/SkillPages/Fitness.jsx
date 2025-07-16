import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const Fitness = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <section className="pt-28 pb-20 bg-gradient-to-r from-green-50 to-green-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-green-700 mb-6">Transform Your Fitness Journey</h1>
          <p className="text-lg text-gray-700 mb-8">
            Build strength, improve endurance, and feel better every day. Start where you are and grow at your pace.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Get Fit?</h2>
            <p className="text-gray-600 mb-4">
              Fitness improves your physical and mental health, confidence, and energy for daily life.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Boost strength and stamina</li>
              <li>Reduce stress and improve sleep</li>
              <li>Enhance posture and mobility</li>
              <li>Feel more energized and focused</li>
            </ul>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/39671/physiotherapy-weight-training-dumbbell-exercise-balls-39671.jpeg"
              alt="Fitness"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-green-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-10">Step-by-Step Fitness Plan</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Step 1: Set Your Goal',
                description: 'Decide whether you want to lose weight, gain muscle, or improve endurance.',
              },
              {
                title: 'Step 2: Build a Routine',
                description: 'Plan workouts that include strength, cardio, flexibility, and recovery.',
              },
              {
                title: 'Step 3: Track Progress',
                description: 'Record your reps, sets, distance, or weight changes weekly.',
              },
              {
                title: 'Step 4: Eat for Performance',
                description: 'Focus on balanced meals with proteins, carbs, and fats.',
              },
              {
                title: 'Step 5: Rest & Recover',
                description: 'Get 7–9 hours of sleep and schedule rest days to rebuild.',
              },
              {
                title: 'Step 6: Stay Motivated',
                description: 'Join challenges, follow trainers, and reward yourself for consistency.',
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-green-700 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">What Fit Learners Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Aditya Singh',
                quote: 'This platform helped me stay committed. I feel stronger and happier every week.',
              },
              {
                name: 'Sneha Mehta',
                quote: 'I finally stuck to a fitness plan thanks to the community and tracking system.',
              },
              {
                name: 'Mohit Rao',
                quote: 'Every step was clear, and now I enjoy working out more than ever!',
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-green-100 p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
                <h4 className="text-lg font-semibold text-green-800">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-600 to-green-400 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Start Your Fitness Journey</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Build healthy habits, track your progress, and transform your lifestyle starting today.
        </p>
        <Link
          to="/signup"
          className="bg-white text-green-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Fitness;
