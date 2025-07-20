import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Grow With Me?",
      answer:
        "Grow With Me is a skill-tracking platform that helps you learn, track, and showcase your progress while connecting with a supportive community.",
    },
    {
      question: "Is Grow With Me free to use?",
      answer:
        "Yes, Grow With Me is free to use for all users. We also plan to introduce premium features in the future, but the core features will always remain free.",
    },
    {
      question: "How can I track my skill progress?",
      answer:
        "You can track progress by creating progress posts with details like skill, duration, mood, and captions. You can also upload media such as images or videos.",
    },
    {
      question: "What is the Explore page?",
      answer:
        "The Explore page allows you to discover trending journeys, new posts, and local growers. You can filter content by skill, duration, or mood.",
    },
    {
      question: "How do I follow other users?",
      answer:
        "You can follow other users by clicking the 'Follow' button on their profiles or posts. Their updates will appear in your feed.",
    },
    {
      question: "What are Communities?",
      answer:
        "Communities are groups of users learning similar skills or pursuing shared interests. You can join communities, create your own, and post updates there.",
    },
    {
      question: "How is my profile data stored?",
      answer:
        "Your profile data and posts are securely stored using Supabase, ensuring privacy and reliability. You can edit your profile anytime from the dashboard.",
    },
    {
      question: "Can I upload images or videos?",
      answer:
        "Yes, you can upload images and videos with your progress posts. All media files are stored in Supabase storage for easy access.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 cursor-pointer shadow hover:shadow-lg transition"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <span className="text-xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
