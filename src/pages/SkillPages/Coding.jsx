import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const Coding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-r from-blue-50 to-indigo-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-6">Master the Art of Coding</h1>
          <p className="text-lg text-gray-700 mb-8">
            Dive into programming with hands-on practice, expert resources, and a supportive community. Whether you're a beginner or aiming to go pro, this is your space to grow.
          </p>
        </div>
      </section>

      {/* Why Learn Coding */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Learn Coding?</h2>
            <p className="text-gray-600 mb-4">
              Coding is a foundational skill in the digital age. From websites and apps to AI and automation, coding powers the technology around us.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Unlock high-paying tech careers</li>
              <li>Build your own apps, games, and websites</li>
              <li>Enhance problem-solving and logical thinking</li>
              <li>Contribute to open-source and global projects</li>
            </ul>
          </div>
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2015/09/09/21/12/monitor-933392_1280.jpg"
              alt="Coding"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Step by Step Roadmap */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-800 mb-10">Step-by-Step Learning Path</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Step 1: Learn HTML, CSS & JS',
                description: 'Understand how websites are built and styled. Start with basic web development.',
              },
              {
                title: 'Step 2: Choose a Programming Language',
                description: 'Start with Python, JavaScript, or C++. Learn syntax, logic, and control structures.',
              },
              {
                title: 'Step 3: Build Projects',
                description: 'Create calculators, weather apps, or portfolios to practice your knowledge.',
              },
              {
                title: 'Step 4: Learn Git & GitHub',
                description: 'Understand version control and how to collaborate with other developers.',
              },
              {
                title: 'Step 5: Explore Frameworks',
                description: 'Learn React, Node.js, Flask, or Django to create dynamic web applications.',
              },
              {
                title: 'Step 6: Apply for Internships',
                description: 'Gain real-world experience through internships or freelance projects.',
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">What Learners Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                quote:
                  'I started with zero knowledge and now I can build complete web apps thanks to the community and roadmap!',
              },
              {
                name: 'Ravi Desai',
                quote:
                  'The step-by-step approach helped me land my first freelance gig. Highly recommend to all beginners.',
              },
              {
                name: 'Anjali Patel',
                quote:
                  'The encouragement from the community and consistent practice transformed my confidence in coding.',
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-indigo-50 p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
                <h4 className="text-lg font-semibold text-indigo-800">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Start Your Coding Journey Today</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Practice daily, share your progress, and connect with fellow coders to grow consistently.
        </p>
        <Link
          to="/signup"
          className="bg-white text-indigo-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Coding;
