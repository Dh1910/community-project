import CalendarIcon from "../assets/icons/timeline.png";
import TeamIcon from "../assets/icons/timeline.png";
import FireIcon from "../assets/icons/timeline.png";
import AwardIcon from "../assets/icons/timeline.png";
import ChartIcon from "../assets/icons/timeline.png";
import GiftIcon from "../assets/icons/timeline.png";

function Benefits() {
  const features = [
    {
      title: "Weekly Timeline",
      description:
        "Track your progress week by week with a visual timeline that shows your growth journey over time.",
      icon: CalendarIcon ,
    },
    {
      title: "Connect with Learners",
      description:
        "Find and follow others learning the same skills. Give and receive feedback, tips, and encouragement.",
      icon: TeamIcon,
    },
    {
      title: "Celebrate Consistency",
      description:
        "Build and maintain streaks that keep you motivated. Get notifications to stay on track with your goals.",
      icon: FireIcon,
    },
    {
      title: "Earn Badges & Milestones",
      description:
        "Unlock achievements as you progress. Celebrate your milestones and share them with the community.",
      icon: AwardIcon,
    },
    {
      title: "Track Your Stats",
      description:
        "View detailed analytics about your learning journey, including consistency, engagement, and growth over time.",
      icon: ChartIcon,
    },
    {
      title: "Free to Use",
      description:
        "All core features are completely free. Optional premium features available for advanced users.",
      icon: GiftIcon,
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
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-lg shadow-md p-6 flex items-start"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mr-4 flex-shrink-0">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-8 h-8 text-purple-500"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
