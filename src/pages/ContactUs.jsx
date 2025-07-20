const ContactUs = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      {/* Intro */}
      <p className="text-gray-700 mb-6 text-center">
        We’d love to hear from you! Whether you have questions about our platform,
        need technical support, or have feedback, feel free to reach out to us.
      </p>

      {/* Contact Info */}
      <div className="bg-gray-100 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Contact Details</h2>
        <p className="mb-2">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:support@growwithme.com"
            className="text-indigo-600 hover:underline"
          >
            support@growwithme.com
          </a>
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> +91 98765 43210
        </p>
        <p className="mb-2">
          <strong>Address:</strong> 123 Skill Street, Learning City, India
        </p>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Your Message</label>
            <textarea
              rows="4"
              placeholder="Type your message here"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
