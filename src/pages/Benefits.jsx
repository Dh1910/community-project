function Benefits() {
  const benefits = [
    {
      title: 'Weekly Timeline',
      description: 'Track your progress week by week with a visual timeline that shows your growth journey over time.',
      icon: 'ri-calendar-check-line',
    },
    {
      title: 'Connect with Learners',
      description: 'Find and follow others learning the same skills. Give and receive feedback, tips, and encouragement.',
      icon: 'ri-team-line',
    },
    {
      title: 'Celebrate Consistency',
      description: 'Build and maintain streaks that keep you motivated. Get notifications to stay on track with your goals.',
      icon: 'ri-fire-line',
    },
    {
      title: 'Earn Badges & Milestones',
      description: 'Unlock achievements as you progress. Celebrate your milestones and share them with the community.',
      icon: 'ri-award-line',
    },
    {
      title: 'Track Your Stats',
      description: 'View detailed analytics about your learning journey, including consistency, engagement, and growth over time.',
      icon: 'ri-bar-chart-line',
    },
    {
      title: 'Free to Use',
      description: 'All core features are completely free. Optional premium features available for advanced users.',
      icon: 'ri-gift-line',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Community Benefits</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Join thousands of learners who are achieving their goals through consistency and community
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map(benefit => (
            <div key={benefit.title} className="bg-white rounded-lg shadow-md p-6 flex items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mr-4 flex-shrink-0">
                <i className={`${benefit.icon} ri-lg text-primary`}></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;