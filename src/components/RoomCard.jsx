import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

function RoomCard({ room, hotel }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === room.image_urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room.image_urls.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white border border-gray-400 shadow-md rounded-lg p-3 relative">
      <div>
        <button
          onClick={handlePrevImage}
          className="text-3xl absolute left-5 top-[35%] transform -translate-y-1/2 text-black rounded-md focus:outline-none"
        >
          &#10094;
        </button>
        <img
          src={room.image_urls[currentImageIndex]}
          alt={`${room.name} ${currentImageIndex + 1}`}
          className="w-full h-52 rounded-lg"
        />
        <button
          onClick={handleNextImage}
          className="text-3xl absolute right-5 top-[35%] transform -translate-y-1/2 text-black rounded-md focus:outline-none"
        >
          &#10095;
        </button>
      </div>
      <div>
        <h3 className="text-lg font-bold mt-3">{room.name}</h3>

        <p className="text-gray-800 mt-4 font-bold">
          {`₹ ${room.price}`} <span className="font-normal">/ night</span>
        </p>
      </div>

      <div className="flex py-2 justify-between items-center mt-4">
        <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-100">
          View facilities
        </button>
        <Link
          to={`/hotels/${hotel.id}/${room.name
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}

RoomCard.propTypes = {
  room: PropTypes.shape({
    image_urls: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  hotel: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoomCard;
