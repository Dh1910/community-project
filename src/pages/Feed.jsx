import { useEffect } from 'react';

function Feed() {
  const posts = [
    {
      user: 'Alex M.',
      skill: 'Coding',
      content: 'Just finished my first React project! 🎉 #GrowWithMe',
      image: 'https://readdy.ai/api/search-image?query=A%20screenshot%20of%20a%20React%20project%20on%20a%20laptop%20screen%2C%20showing%20clean%20code%20and%20a%20modern%20UI.%20The%20background%20is%20a%20desk%20with%20a%20coffee%20mug%20and%20a%20notepad%2C%20representing%20a%20coding%20achievement.%20The%20image%20is%20bright%20and%20motivational%2C%20suitable%20for%20a%20social%20feed%20on%20a%20skill-tracking%20website.&width=300&height=200&seq=feed1',
    },
    {
      user: 'Sarah L.',
      skill: 'Guitar',
      content: 'Learned a new chord progression today! Feeling accomplished. 🎸',
      image: 'https://readdy.ai/api/search-image?query=A%20close-up%20of%20a%20guitar%20being%20played%2C%20showing%20fingers%20on%20the%20fretboard%2C%20representing%20a%20guitar%20learning%20milestone.%20The%20background%20is%20blurred%20with%20a%20warm%20tone%2C%20focusing%20on%20the%20guitar.%20The%20image%20is%20inspiring%20and%20suitable%20for%20a%20social%20feed%20on%20a%20skill-tracking%20website.&width=300&height=200&seq=feed2',
    },
    {
      user: 'Mike R.',
      skill: 'Fitness',
      content: 'Hit a new personal record on my deadlift! 💪 #GrowWithMe',
      image: 'https://readdy.ai/api/search-image?query=A%20person%20lifting%20a%20barbell%20in%20a%20gym%2C%20representing%20a%20fitness%20achievement.%20The%20background%20shows%20gym%20equipment%20and%20a%20motivational%20atmosphere%20with%20bright%20lighting.%20The%20image%20is%20energetic%20and%20suitable%20for%20a%20social%20feed%20on%20a%20skill-tracking%20website.&width=300&height=200&seq=feed3',
    },
    {
      user: 'Emma T.',
      skill: 'Painting',
      content: 'My latest watercolor piece! Loving this journey. 🎨',
      image: 'https://readdy.ai/api/search-image?query=A%20colorful%20watercolor%20painting%20on%20an%20easel%2C%20representing%20an%20artistic%20achievement.%20The%20background%20includes%20art%20supplies%20like%20brushes%20and%20a%20palette%2C%20with%20a%20bright%20and%20creative%20vibe.%20The%20image%20is%20inspiring%20and%20suitable%20for%20a%20social%20feed%20on%20a%20skill-tracking%20website.&width=300&height=200&seq=feed4',
    },
  ];

  useEffect(() => {
    const scrollContainer = document.querySelector('.feed-scroll');
    const leftArrow = document.querySelector('.feed-left-arrow');
    const rightArrow = document.querySelector('.feed-right-arrow');

    if (window.innerWidth >= 768) {
      leftArrow.style.display = 'flex';
      rightArrow.style.display = 'flex';
    }

    const scrollLeft = () => {
      scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
      scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
    };

    leftArrow.addEventListener('click', scrollLeft);
    rightArrow.addEventListener('click', scrollRight);

    return () => {
      leftArrow.removeEventListener('click', scrollLeft);
      rightArrow.removeEventListener('click', scrollRight);
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
            {posts.map(post => (
              <div
                key={post.user + post.skill}
                className="snap-start flex-shrink-0 w-[300px] bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={`${post.user}'s ${post.skill} post`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{post.user}</h3>
                  <p className="text-gray-500 text-sm mb-2">{post.skill}</p>
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