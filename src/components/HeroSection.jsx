import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import heroImg from "../assets/image/hero-bg.png";

function HeroSection() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) setIsLoggedIn(true);
    };
    getSession();
  }, []);

  const handleButtonClick = () => {
    navigate(isLoggedIn ? "/dashboard" : "/signup");
  };

  return (
    <section
      className={`w-full h-screen relative overflow-hidden flex items-center justify-center transition-opacity duration-700 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔥 SUPER DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* 🔥 CONTENT (CENTERED) */}
      <div className="relative text-center px-4 max-w-3xl">
        {/* Heading */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight text-white transition-all duration-700 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Grow a Skill.{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Share Your Journey
          </span>
        </h1>

        {/* Description */}
        <p
          className={`text-base sm:text-lg md:text-xl text-white/95 mb-8 transition-all duration-700 delay-200 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Stay consistent, celebrate milestones, and inspire others on your path to mastery.
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
            show ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <button
            onClick={handleButtonClick}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition shadow-lg"
          >
            Start Journey 🚀
          </button>

          <button
            onClick={() => navigate("/explore")}
            className="border border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-black transition"
          >
            Explore Skills
          </button>
        </div>
      </div>

      
    </section>
  );
}

export default HeroSection;