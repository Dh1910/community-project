import Header from '../components/Header';
import Footer from '../components/Footer';

const TOS = () => (
  <>
    <Header />
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>

      <p className="mb-4 text-gray-700">
        Welcome to <strong>Grow With Me</strong>! By accessing or using our
        website, services, and platform, you agree to the following Terms of
        Service. Please read these terms carefully before using our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4 text-gray-700">
        By creating an account or using any of our services, you acknowledge that
        you have read, understood, and agree to be bound by these Terms of
        Service, as well as our Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
      <p className="mb-4 text-gray-700">
        You are responsible for maintaining the confidentiality of your account
        credentials. You agree not to use our platform for any illegal or
        unauthorized purposes, and you must comply with all applicable laws and
        regulations.
      </p>


      <h2 className="text-xl font-semibold mt-6 mb-2">3. Content Ownership</h2>
      <p className="mb-4 text-gray-700">
        All content you create and upload, such as posts, images, and videos,
        remains your property. However, by posting on our platform, you grant
        <strong> Grow With Me</strong> a non-exclusive, worldwide, royalty-free
        license to use, display, and distribute your content for the purpose of
        operating and improving our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Prohibited Activities
      </h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
        <li>Uploading harmful or malicious content.</li>
        <li>Attempting to hack, exploit, or disrupt the platform.</li>
        <li>Using another user's account without permission.</li>
        <li>Spamming, harassment, or abusive behavior.</li>
      </ul>


      <h2 className="text-xl font-semibold mt-6 mb-2">5. Termination</h2>
      <p className="mb-4 text-gray-700">
        We reserve the right to suspend or terminate your account if you violate
        these Terms of Service, misuse the platform, or engage in activities that
        harm our community.
      </p>


      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Changes to Terms
      </h2>
      <p className="mb-4 text-gray-700">
        We may update these Terms of Service from time to time. Any changes will
        be posted on this page with the updated date. Your continued use of the
        platform means you accept these changes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p className="mb-4 text-gray-700">
        If you have any questions about these Terms, feel free to contact us at{" "}
        <a
          href="mailto:support@growwithme.com"
          className="text-indigo-600 hover:underline"
        >
          support@growwithme.com
        </a>
        .
      </p>
    </div>
    <Footer />
  </>
);

export default TOS;
