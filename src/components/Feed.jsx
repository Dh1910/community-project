import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // supabase client import

function Feed() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          id,
          content,
          image_url,
          skill,
          created_at,
          profiles(full_name, avatar_url)
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error.message);
      } else if (data) {
        const formatted = data.map((post) => ({
          user: post.profiles?.full_name || "Anonymous",
          skill: post.skill || "General",
          content: post.content,
          image: post.image_url,
          avatar: post.profiles?.avatar_url || "/default.png",
        }));

        setPosts(formatted);
      }
    };

    fetchPosts();
  }, []);

  // Scroll arrows effect
  useEffect(() => {
    const scrollContainer = document.querySelector(".feed-scroll");
    const leftArrow = document.querySelector(".feed-left-arrow");
    const rightArrow = document.querySelector(".feed-right-arrow");

    if (window.innerWidth >= 768) {
      leftArrow.style.display = "flex";
      rightArrow.style.display = "flex";
    }

    const scrollLeft = () => {
      scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
      scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
    };

    leftArrow.addEventListener("click", scrollLeft);
    rightArrow.addEventListener("click", scrollRight);

    return () => {
      leftArrow.removeEventListener("click", scrollLeft);
      rightArrow.removeEventListener("click", scrollRight);
    };
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl font-bold text-center mb-4">Community Feed</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          See what others are sharing about their growth journey
        </p>
        <div className="relative">
          <button className="feed-left-arrow hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-white w-10 h-10 rounded-full items-center justify-center z-10">
            <i className="ri-arrow-left-s-line ri-lg"></i>
          </button>
          <div className="feed-scroll flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6">
            {posts.map((post, index) => (
              <div
                key={index}
                className="snap-start flex-shrink-0 w-[300px] bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={`${post.user}'s ${post.skill} post`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  {/* Profile info with avatar */}
                  <div className="flex items-center mb-3">
                    <img
                      src={post.avatar}
                      alt={post.user}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <h3 className="text-lg font-semibold">{post.user}</h3>
                  </div>

                  <p className="text-[#7c3aed] font-bold text-sm mb-2">{post.skill}</p>
                  <p className="text-gray-600">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="feed-right-arrow hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-white w-10 h-10 rounded-full items-center justify-center z-10">
            <i className="ri-arrow-right-s-line ri-lg"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Feed;
