import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const Painting = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-r from-pink-50 to-purple-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-6">Express Yourself Through Painting</h1>
          <p className="text-lg text-gray-700 mb-8">
            Unleash your creativity and bring color to your world. Learn techniques, styles, and grow your skills brush by brush.
          </p>
        </div>
      </section>

      {/* Why Learn Painting */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Learn Painting?</h2>
            <p className="text-gray-600 mb-4">
              Painting helps relieve stress, enhances focus, and allows personal expression like no other art form.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Discover your unique style</li>
              <li>Practice mindfulness through brushwork</li>
              <li>Create beautiful art for yourself or others</li>
              <li>Build a portfolio or decorate your space</li>
            </ul>
          </div>
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2017/11/07/18/40/brushes-2927793_1280.jpg"
              alt="Painting"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Step by Step Roadmap */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-purple-800 mb-10">Step-by-Step Learning Path</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Step 1: Choose Your Medium',
                description: 'Decide between watercolor, acrylics, oils, or digital painting to begin.',
              },
              {
                title: 'Step 2: Basic Techniques',
                description: 'Learn brush types, color theory, shading, and blending basics.',
              },
              {
                title: 'Step 3: Recreate Masterpieces',
                description: 'Practice by replicating famous artworks to sharpen your control.',
              },
              {
                title: 'Step 4: Paint Your Own Ideas',
                description: 'Start creating original pieces from imagination or reference.',
              },
              {
                title: 'Step 5: Share Your Art',
                description: 'Post progress and finished paintings to get feedback and motivation.',
              },
              {
                title: 'Step 6: Exhibit or Sell',
                description: 'Participate in online exhibitions or list your art for sale.',
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">What Artists Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Neha Kapoor',
                quote: 'I never thought I could paint. But step-by-step guidance made me fall in love with it!',
              },
              {
                name: 'Siddharth Mehra',
                quote: 'I painted my first landscape within a week of joining. It’s been therapeutic.',
              },
              {
                name: 'Isha Verma',
                quote: 'Sharing my artwork and getting feedback helped me grow faster than ever.',
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-purple-50 p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
                <h4 className="text-lg font-semibold text-purple-800">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Begin Your Painting Journey</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Whether it’s watercolors or oils, we’re here to help you develop your art and confidence.
        </p>
        <Link
          to="/signup"
          className="bg-white text-purple-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Painting;