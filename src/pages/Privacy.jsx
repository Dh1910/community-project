import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = () => (
  <>
    <Header />
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p className="text-gray-700 mb-6">
        At <strong>Grow With Me</strong>, your privacy is very important to us.
        This Privacy Policy explains how we collect, use, and protect your
        personal data when you use our website and services.
      </p>

      {/* Section 1 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="text-gray-700 mb-4">
        We may collect the following information:
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
        <li>Personal details like your name, email address, and profile data.</li>
        <li>Posts, images, videos, and other content you share.</li>
        <li>Usage data such as pages visited, actions taken, and time spent on the platform.</li>
      </ul>

      {/* Section 2 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="text-gray-700 mb-4">
        Your data is used to:
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
        <li>Provide and improve our services.</li>
        <li>Display your posts and progress on your profile and community pages.</li>
        <li>Send important updates or notifications related to your account.</li>
        <li>Ensure platform security and prevent fraudulent activities.</li>
      </ul>

      {/* Section 3 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing of Information</h2>
      <p className="text-gray-700 mb-4">
        We do not sell or rent your personal information. We may share your data with trusted
        service providers (like Supabase for storage) only to operate the platform effectively.
      </p>

      {/* Section 4 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="text-gray-700 mb-4">
        We take appropriate measures to protect your personal data. However, no method of
        transmission over the Internet is 100% secure, and we cannot guarantee complete security.
      </p>

      {/* Section 5 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="text-gray-700 mb-4">
        You have the right to access, edit, or delete your personal information at any time
        from your profile dashboard. For assistance, contact us at
        <a href="mailto:support@growwithme.com" className="text-indigo-600 hover:underline">
          {" "}support@growwithme.com
        </a>.
      </p>

      {/* Section 6 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to this Privacy Policy</h2>
      <p className="text-gray-700 mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted
        here with the updated date.
      </p>

      {/* Section 7 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p className="text-gray-700 mb-4">
        If you have any questions about this Privacy Policy, please email us at
        <a href="mailto:support@growwithme.com" className="text-indigo-600 hover:underline">
          {" "}support@growwithme.com
        </a>.
      </p>
    </div>
    <Footer />
  </>
);

export default Privacy;
