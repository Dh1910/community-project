import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const Cooking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <section className="pt-28 pb-20 bg-gradient-to-r from-yellow-50 to-orange-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-orange-700 mb-6">Master the Art of Cooking</h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover the joy of cooking—from beginner basics to delicious meals. Learn, cook, and share your creations.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Learn Cooking?</h2>
            <p className="text-gray-600 mb-4">
              Cooking is a life skill that brings creativity, health, and joy to every meal.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Save money and eat healthier</li>
              <li>Experiment with global flavors</li>
              <li>Build confidence in the kitchen</li>
              <li>Share food and love with others</li>
            </ul>
          </div>
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg"
              alt="Cooking"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-orange-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-orange-800 mb-10">Step-by-Step Cooking Journey</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Step 1: Understand Ingredients',
                description: 'Learn about spices, grains, vegetables, and how they work together.',
              },
              {
                title: 'Step 2: Master Basic Techniques',
                description: 'Practice chopping, sautéing, boiling, and baking safely.',
              },
              {
                title: 'Step 3: Follow Simple Recipes',
                description: 'Start with dishes like pasta, stir-fries, or one-pot meals.',
              },
              {
                title: 'Step 4: Explore Global Cuisine',
                description: 'Try making sushi, curries, or tacos to expand your skills.',
              },
              {
                title: 'Step 5: Plate Creatively',
                description: 'Learn food presentation to make your meals visually appealing.',
              },
              {
                title: 'Step 6: Share Your Food',
                description: 'Cook for friends and family or post your dishes online.',
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
          <h2 className="text-3xl font-bold text-gray-800 mb-10">What Home Chefs Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Divya Patel',
                quote: 'I never thought I could cook. Now I love preparing meals every day!',
              },
              {
                name: 'Rohan Kulkarni',
                quote: 'From noodles to full-course dinners, this roadmap made cooking fun.',
              },
              {
                name: 'Priya Ghosh',
                quote: 'I started a food blog thanks to my cooking progress and photos!',
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

      <section className="bg-gradient-to-r from-orange-600 to-yellow-400 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Start Cooking with Confidence</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Whether you're meal prepping or making a feast, the journey begins with your first dish.
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

export default Cooking;
