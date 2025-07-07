function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of learners and start tracking your skills today. It’s free, fun, and motivating!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="border border-white text-white px-8 py-3 !rounded-button text-lg font-medium hover:bg-white hover:text-blue-500 transition-all shadow-purple-500 shadow-lg">
            Sign Up Now
          </button>
          <button className="border border-white text-white px-8 py-3 !rounded-button text-lg font-medium hover:bg-white hover:text-blue-500 transition-all shadow-purple-500 shadow-lg ">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTA;