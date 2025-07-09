function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-['Pacifico'] mb-4">Grow With Me</h3>
            <p className="text-gray-400">Empowering your growth journey through consistency and community.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul> 
          </div>
         
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; 2025 Grow With Me. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;