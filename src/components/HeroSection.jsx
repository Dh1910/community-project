import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function HeroSection() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Check if user is logged in
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setIsLoggedIn(true);
      }
    };
    getSession();
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard"); // ✅ redirect logged-in users
    } else {
      navigate("/signup"); // ✅ redirect new users
    }
  };

  return (
    <section
      className={`w-full py-16 relative overflow-hidden transition-opacity duration-700 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=A%20modern%2C%20bright%2C%20and%20inspiring%20background%20for%20a%20skill-tracking%20website.%20The%20image%20shows%20a%20gradient%20from%20light%20purple%20to%20soft%20orange%2C%20with%20subtle%20abstract%20shapes%20representing%20growth%20and%20progress.%20The%20left%20side%20has%20more%20empty%20space%20for%20text%2C%20while%20the%20right%20side%20features%20stylized%20icons%20of%20various%20skills%20like%20coding%2C%20music%2C%20fitness%2C%20and%20art%20arranged%20in%20an%20aesthetically%20pleasing%20pattern.%20The%20overall%20style%20is%20clean%2C%20minimalist%2C%20and%20motivational%2C%20perfect%20for%20a%20personal%20development%20platform.&width=1920&height=800&seq=hero1&orientation=landscape')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/30"></div>
      <div className="container ml-3 mx-auto px-4 py-20 md:py-32 relative">
        <div className="max-w-4xl">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 transform transition-all duration-700 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Grow a Skill. Share Your Journey.
          </h1>

          <p
            className={`ml-2 whitespace-pre-line text-xl md:text-2xl text-gray-700 mb-8 transform transition-all duration-700 delay-200 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } w-[600px] mx-auto`}
          >
            Stay consistent, celebrate milestones, and inspire others on your path to mastery.
          </p>

          <button
            onClick={handleButtonClick}
            className={`bg-[#7c3aed] text-white px-8 py-3 rounded-md text-lg font-medium 
              hover:bg-[#7c3aed]/80 transition-all shadow-lg whitespace-nowrap 
              transform duration-300 ${
                show ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
          >
            Start Your Growth Journey
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
