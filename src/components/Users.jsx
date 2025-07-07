function Users() {
  const creators = [
    {
      name: 'Emily Chen',
      skill: 'Guitar',
      quote:
        "I've been trying to learn guitar for years, but never stuck with it. Tracking my progress weekly on Grow With Me has kept me accountable. 6 months in and I can play full songs now!",
      days: 187,
      streak: 26,
      badges: 8,
      image: 'https://i.pravatar.cc/100?img=5',
    },
    {
      name: 'Marcus Johnson',
      skill: 'Cooking',
      quote:
        "The community feedback has been incredible. I went from burning everything to hosting dinner parties! The weekly format helps me try new recipes without feeling overwhelmed.",
      days: 243,
      streak: 34,
      badges: 12,
      image: 'https://i.pravatar.cc/100?img=10',
    },
    {
      name: 'Sophia Williams',
      skill: 'Yoga',
      quote:
        "I love how the platform celebrates consistency over perfection. Seeing my progress timeline keeps me motivated. I’ve gone from barely touching my toes to full inversions!",
      days: 312,
      streak: 44,
      badges: 15,
      image: 'https://i.pravatar.cc/100?img=20',
    },
    {
      name: 'David Kim',
      skill: 'Coding',
      quote:
        "From complete beginner to building my own apps in 9 months! The weekly format helped me break down a huge goal into manageable chunks. The supportive community kept me going.",
      days: 278,
      streak: 39,
      badges: 11,
      image: 'https://i.pravatar.cc/100?img=12',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Featured Creators</h2>
        <p className="text-gray-600 text-center mb-10">
          Get inspired by real people making real progress on their skill journeys
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {creators.map((creator, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md flex p-6 gap-4 items-center">
              {/* Profile Image */}
              <img
                src={creator.image}
                alt={creator.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              {/* Text Block */}
              <div>
                <p className="text-gray-700 text-sm mb-3 italic">"{creator.quote}"</p>
                <h3 className="font-semibold">{creator.name}</h3>
                <p className="text-sm text-[#7c3aed] font-medium">{creator.skill}</p>
                <div className="text-xs text-gray-500 mt-1 flex gap-3">
                  <span>📆 {creator.days} days</span>
                  <span>🔥 {creator.streak} week streak</span>
                  <span>🏅 {creator.badges} badges</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Users;
