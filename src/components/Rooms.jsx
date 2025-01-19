import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RoomCard from "./RoomCard";
import { useParams } from "react-router-dom";

function Rooms({ details }) {
  const { id } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(
          `https://www.gocomet.com/api/assignment/hotels/${id}`
        );
        const data = await response.json();
        if (data.success) {
          setRoomDetails(data.hotel);
        }
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (!roomDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl text-center font-bold mb-4">{details}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roomDetails.rooms.map((room) => (
          <RoomCard key={room.id} room={room} hotel={roomDetails} />
        ))}
      </div>
      {details === "Available rooms" && (
        <div className="mt-10 px-5 border-4 rounded-md">
          <h3 className="text-2xl text-center font-semibold py-6">
            About {roomDetails.name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            <img
              src={roomDetails.image_url}
              alt="Room Image"
              className="p-2 h-96 w-full rounded-lg"
            />
            <p className="col-span-1 text-md">
              {roomDetails.description.length > 1000
                ? roomDetails.description.substring(0, 1000) + "..."
                : roomDetails.description}
            </p>
            {roomDetails.description.length > 1000 && (
              <p className="col-span-1 md:col-span-2 text-md py-2">
                {roomDetails.description.substring(1000)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
Rooms.propTypes = {
  details: PropTypes.string.isRequired,
};

export default Rooms;
