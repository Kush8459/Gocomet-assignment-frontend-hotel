/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function HotelCard({ hotel }) {
  const navigate = useNavigate();

  return (
    <div className="border border-gray-300 rounded-lg shadow-md w-full md:w-72 lg:w-[320px] p-4 overflow-hidden">
      <img
        src={hotel.image_url}
        alt={hotel.name}
        className="w-full md:w-72 lg:w-[320px] h-48 object-cover rounded-md"
      />
      <div className="flex flex-col mt-4 justify-between">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{hotel.name} </h3>
          <h5 className="text-sm font-medium">{hotel.rating} ⭐</h5>
        </div>

        <span className="text-sm text-gray-500">{hotel.city}</span>

        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-800 text-lg font-bold">
            {hotel.rooms.length > 0 && (
              <h4>{`₹ ${hotel.rooms[0].price} - ${
                hotel.rooms[hotel.rooms.length - 1].price
              }`}</h4>
            )}
          </div>
          <button
            onClick={() => navigate(`/hotels/${hotel.id}`)}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
