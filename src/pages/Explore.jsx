import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Creative Arts',
    'Technology',
    'Health & Fitness',
    'Languages',
    'Music',
    'Business',
    'Lifestyle',
  ];

  const skillCards = [
    {
      title: 'Web Development',
      category: 'Technology',
      learners: '32.1K',
      tags: ['High Demand'],
      image: 'https://readdy.ai/api/search-image?query=Modern%20web%20development%20workspace&width=600&height=400',
      mentors: 2,
    },
    {
      title: 'Creative Painting',
      category: 'Creative Arts',
      learners: '18.4K',
      tags: ['Beginner Friendly'],
      image: 'https://readdy.ai/api/search-image?query=creative%20painting&width=600&height=400',
      mentors: 1,
    },
    {
      title: 'Yoga & Fitness',
      category: 'Health & Fitness',
      learners: '25.9K',
      tags: ['All Levels'],
      image: 'https://readdy.ai/api/search-image?query=fitness%20training&width=600&height=400',
      mentors: 1,
    },
  ];

  const filteredSkills = activeCategory === 'All'
    ? skillCards
    : skillCards.filter(skill => skill.category === activeCategory);

  return (
    <>
      <Header />

      <section className="pt-24 pb-20 px-6 bg-white">
        <div className="container mx-auto">

          {/* Title + Search + Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Skills</h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Discover new skills to learn or continue your journey with existing ones.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search skills..."
                  className="pl-10 pr-4 py-2 w-64 rounded-button border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-button text-gray-700 hover:bg-gray-50 text-sm whitespace-nowrap">
                <i className="ri-filter-3-line"></i> Filter
                <i className="ri-arrow-down-s-line"></i>
              </button>
            </div>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${activeCategory === cat
                    ? 'bg-[#7c3aed] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredSkills.map((skill, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                <div className="h-48 relative overflow-hidden">
                  <img src={skill.image} alt={skill.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    <i className="ri-user-line mr-1"></i> {skill.learners} Learners
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {skill.category}
                    </span>
                    {skill.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-medium bg-orange-100 text-orange-800 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">Explore learning path and resources for {skill.title}.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[...Array(skill.mentors)].map((_, i) => (
                        <img
                          key={i}
                          src="https://readdy.ai/api/search-image?query=mentor&width=32&height=32"
                          alt="Mentor"
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <button className="text-primary hover:text-primary/80">
                      <i className="ri-arrow-right-line ri-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mb-20">
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-button hover:bg-gray-200 transition-all">
              Load More Skills <i className="ri-arrow-down-s-line"></i>
            </button>
          </div>

          {/* Choose Your Skill Path */}
          <section className="py-20 bg-gray-50">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Skill Path
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select from popular skills or discover something new. Each path offers structured tracking and a supportive community.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: 'ri-restaurant-line', color: 'orange', title: 'Cooking' },
                { icon: 'ri-guitar-line', color: 'blue', title: 'Guitar' },
                { icon: 'ri-code-s-slash-line', color: 'green', title: 'Coding' },
                { icon: 'ri-heart-pulse-line', color: 'purple', title: 'Fitness' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 transition-all hover:scale-105 cursor-pointer">
                  <div className={`w-16 h-16 flex items-center justify-center bg-${item.color}-100 rounded-full mb-6 mx-auto`}>
                    <i className={`${item.icon} ri-2x text-${item.color}-500`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{item.title}</h3>
                  <p className="text-gray-600 mb-4 text-center">Track your progress with structure and community.</p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <i className="ri-user-line mr-2"></i> 24,000+ active learners
                  </div>
                </div>
              ))}
            </div>

            {/* Explore More Button */}
            {/* Explore More Button */}
            <div className="text-center mt-12">
              <button className="text-[#7c3aed] font-medium flex items-center mx-auto hover:underline">
                Explore More Skills
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            </div>

            {/* ✅ Featured Creators - RIGHT BELOW Explore More */}
            <section className="py-20 bg-gray-50">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Creators</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Meet learners making impressive progress and inspiring others with their journeys.
                </p>
              </div>
              <div className="relative">
                <div className="flex overflow-x-auto gap-6 pb-2 hide-scrollbar">
                  {[
                    {
                      name: 'Emily Rodriguez',
                      skill: 'Guitar • 8 months',
                      milestone: 'Performed my first complete song at an open mic night!',
                      image: 'https://readdy.ai/api/search-image?query=creator1&width=100&height=100',
                      date: 'June 28, 2025',
                      color: 'blue',
                    },
                    {
                      name: 'Daniel Thompson',
                      skill: 'Cooking • 9 months',
                      milestone: 'Hosted my first dinner party with a 5-course meal!',
                      image: 'https://readdy.ai/api/search-image?query=creator4&width=100&height=100',
                      date: 'July 1, 2025',
                      color: 'orange',
                    },
                    {
                      name: 'Nisha Verma',
                      skill: 'Fitness • 6 months',
                      milestone: 'Lost 10kg and ran my first 5K marathon!',
                      image: 'https://readdy.ai/api/search-image?query=fitness%20girl&width=100&height=100',
                      date: 'May 20, 2025',
                      color: 'green',
                    },
                  ].map((creator, i) => (
                    <div key={i} className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md p-6 border border-gray-100">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                          <img src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                          <p className="text-sm text-gray-500">{creator.skill}</p>
                        </div>
                      </div>
                      <div className={`bg-${creator.color}-50 rounded p-3 mb-4`}>
                        <div className="flex items-center mb-2">
                          <span className={`text-xs font-medium bg-${creator.color}-100 text-${creator.color}-800 px-2 py-1 rounded-full`}>
                            Milestone
                          </span>
                          <span className="text-xs text-gray-500 ml-auto">{creator.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{creator.milestone}</p>
                      </div>
                      <p className="text-gray-600 italic text-sm">
                        "Tracking my progress kept me consistent and confident."
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-20">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Our Growing Community</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="bg-white rounded-lg p-8 shadow">
                    <i className="ri-user-heart-line text-3xl text-primary mb-4"></i>
                    <h3 className="text-4xl font-bold text-gray-900">248,763</h3>
                    <p className="text-gray-600">Community Members</p>
                  </div>
                  <div className="bg-white rounded-lg p-8 shadow">
                    <i className="ri-lightbulb-line text-3xl text-yellow-500 mb-4"></i>
                    <h3 className="text-4xl font-bold text-gray-900">87</h3>
                    <p className="text-gray-600">Skills Being Tracked</p>
                  </div>
                  <div className="bg-white rounded-lg p-8 shadow">
                    <i className="ri-trophy-line text-3xl text-green-500 mb-4"></i>
                    <h3 className="text-4xl font-bold text-gray-900">1,456,892</h3>
                    <p className="text-gray-600">Milestones Achieved</p>
                  </div>
                </div>
              </div>
            </section>



          </section>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Growth Journey?</h2>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Join our community of learners and start tracking your progress today. It's free to get started!
        </p>
        <div className="flex justify-center gap-4 flex-wrap mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 rounded-md bg-white text-gray-800 text-sm w-72 max-w-full"
          />
          <button className="bg-white text-[#7c3aed] font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition">
            Join Now
          </button>
        </div>
        <div className="flex justify-center items-center gap-6 text-sm text-white/80">
          <span>👤 248,763+ members</span>
          <span>⭐ 4.9/5 average rating</span>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Explore;
