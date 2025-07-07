import React from 'react';
import Header from '../components/Header';
import FooterSection from '../components/Footer';
import backgroundImg from '../assets/image/background.png';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <>
            <Header />
            <div className="pt-24 bg-white font-inter">

                <section
                    className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${backgroundImg})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/30"></div>
                    <div className="container px-4 py-20 md:py-32 relative z-10 ml-20">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                                Our Mission is Your Growth
                            </h1>
                            <p className="text-xl text-gray-700 mb-8">
                                We're building a community where consistency is celebrated and every small step toward mastery is recognized.
                            </p>
                            <Link
                                to="/"
                                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-purple-700 shadow-lg transition duration-300"
                            >
                                Back to Home
                            </Link>

                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <p className="text-lg text-gray-600">
                                Grow With Me was born from a simple observation: the journey to mastery is often lonely and filled with plateaus. We wanted to create a space where people could document their progress, celebrate small wins, and find community in the pursuit of growth.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission & Values */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Our Mission & Values</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            We believe in the power of consistent practice, supportive community, and celebrating progress over perfection.
                        </p>
                        <div className="bg-primary/10 text-primary px-8 py-4 rounded-lg max-w-2xl mx-auto text-xl font-medium italic">
                            "To empower individuals to master any skill through consistency, community support, and celebration of incremental progress."
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
                        <p className="text-lg text-gray-600 mb-12">
                            The passionate people behind Grow With Me who are dedicated to helping you achieve your goals.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden group">
                                <img
                                    src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20confident%20male%20tech%20founder..."
                                    alt="Michael Reynolds"
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold">Michael Reynolds</h3>
                                    <p className="text-primary font-medium mb-2">Founder & CEO</p>
                                    <p className="text-gray-600">
                                        Former music teacher who struggled to track his students' progress. Passionate about helping others build consistent learning habits.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
                        <p className="text-lg text-gray-600 mb-12">
                            Since our launch, we've helped thousands of people develop skills and build consistent learning habits.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                                <p className="text-lg font-medium">Active Users</p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                                <p className="text-lg font-medium">Skill Categories</p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                                <p className="text-lg font-medium">Progress Posts</p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="text-4xl font-bold text-primary mb-2">87%</div>
                                <p className="text-lg font-medium">Improved Consistency</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Start Your Journey Section */}
                <section className="py-16 bg-[#7C3AED] text-white text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Community</h2>
                        <p className="text-lg mb-8">
                            Be part of a movement that celebrates consistency, progress, and the<br />
                            joy of learning something new.
                        </p>
                        <Link
                            to="/"
                            className="bg-white text-[#7C3AED] px-6 py-3 rounded-md text-lg font-semibold shadow hover:bg-gray-100 transition"
                        >
                            Start Your Growth Journey→
                        </Link>
                    </div>
                </section>
            </div>
            <FooterSection />
        </>
    );
};

export default About;
