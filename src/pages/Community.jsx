import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import customIcon from '../assets/icons/custom.png';
import searchIcon from '../assets/icons/search.png';

function Community({ openModal, openDiscussionModal }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center mb-4">
                <a href="/explore" className="flex items-center text-gray-600 hover:text-primary">
                  <i className="ri-arrow-left-line mr-2"></i>
                  <span>Back to Skills</span>
                </a>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Hub</h1>
              <p className="text-lg text-gray-600 mb-8">Connect with fellow learners, share your progress, join discussions, and participate in challenges to accelerate your skill development journey.</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  className="bg-[#7c3aed] text-white px-5 py-3 rounded-md hover:bg-[#6b21a8] transition-all flex items-center"
                  onClick={openModal}
                >
                  <img src={customIcon} alt="custom" className="w-5 h-5 mr-2 invert" />
                  Create Post
                </button>
                <button
                  onClick={openDiscussionModal}
                  className="bg-white text-[#7c3aed] border border-[#7c3aed] px-5 py-3 rounded-md hover:bg-[#f3e8ff] transition-all flex items-center"
                >
                  <i className="ri-discuss-line mr-2"></i>
                  Start Discussion
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="relative">
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions, posts, or members..."
                    className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Web Development', 'Photography', 'Cooking', 'Fitness'].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium hover:bg-primary/20 cursor-pointer">
                    + More filters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Community Content Section (Moved Up) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Community Content</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Discussions Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Discussions</h3>
                <a href="#" className="text-[#7c3aed] text-sm hover:underline">View all</a>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">Best resources for learning React in 2025?</h4>
                  <p className="text-xs text-gray-500">Michael Reeves • 2 hours ago</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">How to stay motivated with daily yoga practice?</h4>
                  <p className="text-xs text-gray-500">Samantha Lee • 5 hours ago</p>
                </div>
              </div>
            </div>

            {/* Latest Posts Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Latest Posts</h3>
                <a href="#" className="text-[#7c3aed] text-sm hover:underline">View all</a>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">I completed my first 5K run today!</h4>
                  <p className="text-xs text-gray-500">Jessica Morgan • 3 hours ago</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">My journey learning Japanese - 6 month update</h4>
                  <p className="text-xs text-gray-500">Ryan Chen • 1 day ago</p>
                </div>
              </div>
            </div>

            {/* Community Challenges Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Community Challenges</h3>
                <a href="#" className="text-[#7c3aed] text-sm hover:underline">View all</a>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">30-Day Coding Challenge</h4>
                  <p className="text-xs text-gray-500">243 participants • Active</p>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">21-Day Meditation Streak</h4>
                  <p className="text-xs text-gray-500">89 participants • Upcoming</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
            {/* Community Forums Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Community Forums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'ri-code-line',
                color: 'bg-green-100 text-green-700',
                title: 'Technology',
                discussions: 428,
                members: '2.4K',
                newToday: 32,
                topics: [
                  'Best practices for React state management',
                  'Getting started with machine learning',
                  'Frontend vs backend: which path to choose?'
                ]
              },
              {
                icon: 'ri-paint-brush-line',
                color: 'bg-blue-100 text-blue-700',
                title: 'Creative Arts',
                discussions: 356,
                members: '1.8K',
                newToday: 18,
                topics: [
                  'Digital vs traditional art techniques',
                  'Photography composition tips for beginners',
                  'Finding your unique artistic style'
                ]
              },
              {
                icon: 'ri-heart-pulse-line',
                color: 'bg-purple-100 text-purple-700',
                title: 'Health & Fitness',
                discussions: 392,
                members: '2.1K',
                newToday: 24,
                topics: [
                  "Beginner's guide to strength training",
                  'Nutrition tips for active lifestyles',
                  'Yoga practices for stress reduction'
                ]
              },
              {
                icon: 'ri-translate-2',
                color: 'bg-red-100 text-red-600',
                title: 'Languages',
                discussions: 287,
                members: '1.6K',
                newToday: 15,
                topics: [
                  'Immersion vs structured learning',
                  'Best apps for daily language practice',
                  'Tips for mastering Japanese kanji'
                ]
              },
              {
                icon: 'ri-music-line',
                color: 'bg-indigo-100 text-indigo-700',
                title: 'Music',
                discussions: 264,
                members: '1.4K',
                newToday: 12,
                topics: [
                  'Guitar practice routines for beginners',
                  'Home recording studio setup advice',
                  'Music theory resources for self-learners'
                ]
              },
              {
                icon: 'ri-restaurant-line',
                color: 'bg-orange-100 text-orange-600',
                title: 'Cooking',
                discussions: 342,
                members: '1.9K',
                newToday: 20,
                topics: [
                  'Essential knife skills for home cooks',
                  'Meal prep strategies for busy weeks',
                  'Fermentation techniques for beginners'
                ]
              }
            ].map((forum, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${forum.color}`}>
                    <i className={`${forum.icon} text-lg`}></i>
                  </div>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {forum.newToday} new today
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{forum.title}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  <i className="ri-message-2-line mr-1"></i>{forum.discussions} discussions &nbsp;•&nbsp;
                  <i className="ri-user-3-line mr-1"></i>{forum.members} members
                </p>
                <hr className="my-2" />
                <div className="mb-4">
                  <p className="text-xs text-gray-400 font-medium mb-1">Recent Topics</p>
                  <ul className="text-sm list-disc pl-5 text-gray-700 space-y-1">
                    {forum.topics.map((t, idx) => <li key={idx}>{t}</li>)}
                  </ul>
                </div>
                <div className="text-right">
                  <a href="#" className="text-sm text-primary hover:underline">View Forum →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Activity Feed + Upcoming Events */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Activity Feed</h2>
                <div className="flex gap-2 text-xs">
                  {['All', 'Posts', 'Discussions', 'Achievements'].map((tag, idx) => (
                    <button
                      key={idx}
                      className={`px-3 py-1 rounded-full border text-gray-600 hover:bg-gray-100 ${tag === 'All' ? 'bg-[#f3e8ff] text-[#7c3aed] border-transparent' : 'border-gray-200'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <ul className="space-y-6 text-sm">
                <li>
                  <p><strong>Rebecca Chen</strong> started a new discussion</p>
                  <div className="bg-gray-50 p-4 rounded mt-2">
                    <p className="font-semibold mb-1">Tips for debugging complex JavaScript applications?</p>
                    <p className="text-gray-600">I'm working on a large React project and finding it challenging to track down some persistent bugs. What tools and strategies do you recommend?</p>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">15 minutes ago • Reply</div>
                </li>
                <li>
                  <p><strong>James Wilson</strong> achieved a milestone</p>
                  <div className="bg-purple-50 p-4 rounded mt-2">
                    <p className="font-semibold text-purple-600">🎯 100-Day Spanish Learning Streak</p>
                    <p className="text-gray-600">Consistently practiced Spanish for 100 days in a row!</p>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">2 hours ago • Congratulate</div>
                </li>
                <li>
                  <p><strong>Sophia Lee</strong> shared a new post</p>
                  <div className="bg-gray-50 p-4 rounded mt-2">
                    <p className="font-semibold">5 Meditation Techniques for Beginners</p>
                    <p className="text-gray-600">After teaching meditation for 3 years, I’ve compiled the most effective techniques for beginners...</p>
                    <div className="flex gap-2 mt-2">
                      {['Meditation', 'Mindfulness', 'Beginners'].map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">4 hours ago • Like • Comment</div>
                </li>
                <li>
                  <p><strong>Ryan Parker</strong> joined a challenge</p>
                  <div className="bg-blue-50 p-4 rounded mt-2">
                    <p className="font-semibold text-blue-600">💻 30-Day Coding Challenge</p>
                    <p className="text-gray-600">Building one small project every day for 30 days</p>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Yesterday at 8:45 PM • Join Challenge</div>
                </li>
              </ul>
              <div className="text-center mt-6">
                <button className="text-[#7c3aed] text-sm font-medium hover:underline">Load More Activities</button>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
                <a href="#" className="text-sm text-[#7c3aed] hover:underline">View Calendar</a>
              </div>
              <ul className="space-y-4 text-sm">
                {[
                  { date: 'JUL 12', title: 'Web Development Workshop', time: '7:00 PM - 8:30 PM', attendees: 56 },
                  { date: 'JUL 15', title: 'Photography Critique Session', time: '6:00 PM - 8:00 PM', attendees: 32 },
                  { date: 'JUL 18', title: 'Language Exchange Meetup', time: '5:30 PM - 7:30 PM', attendees: 48 },
                  { date: 'JUL 22', title: 'Cooking Challenge Kickoff', time: '7:00 PM - 8:00 PM', attendees: 64 },
                ].map((event, idx) => (
                  <li key={idx} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-xs bg-gray-100 rounded p-2 font-bold text-center">
                        <div className="text-[#7c3aed]">{event.date}</div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.time} • {event.attendees} attending</p>
                      </div>
                      <div className="ml-auto">
                        <button className="text-xs bg-[#7c3aed] text-white px-3 py-1 rounded-md hover:bg-[#6b21a8]">RSVP</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Join Community CTA Section */}
<section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-16 text-center">
  <h2 className="text-3xl font-bold mb-4">Join Our Thriving Community</h2>
  <p className="max-w-2xl mx-auto text-lg mb-6">
    Connect with fellow learners, share your progress, and accelerate your skill development through community support and collaboration.
  </p>
  <div className="flex justify-center gap-4 flex-wrap">
    <a
      href="/signup"
      className="bg-white text-[#7c3aed] font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
    >
      Create Your Account
    </a>
    <a
      href="/community"
      className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#7c3aed] transition"
    >
      Explore Community
    </a>
  </div>
</section>

      <Footer />
    </>
  );
}

export default Community;
