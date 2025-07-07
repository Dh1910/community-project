function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Pick a Skill',
      description: 'Choose from popular skills or create your own custom growth journey to begin tracking.',
      icon: 'ri-compass-line',
    },
    {
      number: '2',
      title: 'Post Progress',
      description: 'Share your journey with text, images, or videos to document your growth over time.',
      icon: 'ri-upload-2-line',
    },
    {
      number: '3',
      title: 'Earn & Grow',
      description: 'Track streaks, earn badges, and celebrate milestones as you improve your skills.',
      icon: 'ri-medal-line',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">How It Works</h2>
        <p className="text-gray-600 mb-12">
          Track your progress, build consistency, and connect with others on the same journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-between transition hover:shadow-lg"
            >
              {/* Top number circle */}
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4" style={{ backgroundColor: '#7c3aed', color: '#fff' }}>
                <span className="text-lg font-bold">{step.number}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6">{step.description}</p>

              {/* Bottom icon */}
              <i className={`${step.icon} text-[26px]`} style={{ color: '#7c3aed' }}></i>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
}

export default HowItWorks;
