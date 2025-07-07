function Creators({ name, skill, image, quote, days, streak, badges }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3 p-6 flex flex-col items-center justify-center bg-primary/5">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-primary font-medium">{skill}</p>
      </div>
      <div className="md:w-2/3 p-6">
        <p className="text-gray-700 mb-4">"{quote}"</p>
        <div className="flex items-center text-sm text-gray-500">
          <span className="flex items-center mr-4">
            <i className="ri-calendar-line mr-1"></i> {days} days
          </span>
          <span className="flex items-center mr-4">
            <i className="ri-fire-line mr-1 text-orange-500"></i> {streak} week streak
          </span>
          <span className="flex items-center">
            <i className="ri-medal-line mr-1 text-yellow-500"></i> {badges} badges
          </span>
        </div>
      </div>
    </div>
  );
}

export default Creators;