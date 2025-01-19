import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookingComponent() {
  const { id, roomName } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(
          `https://www.gocomet.com/api/assignment/hotels/${id}`
        );
        const data = await response.json();
        if (data.success) {
          setHotelDetails(data.hotel);
          const foundRoom = data.hotel.rooms.find(
            (room) => room.name.replace(/\s+/g, "-").toLowerCase() === roomName
          );
          setRoomDetails(foundRoom);
        }
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id, roomName]);

  if (!hotelDetails || !roomDetails) {
    return <div>Loading...</div>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === roomDetails.image_urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? roomDetails.image_urls.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className=" max-w-7xl mx-auto p-4 shadow-2xl mt-3">
      <div className="flex gap-2 flex-col md:flex-row justify-between">
        <div className="relative md:w-1/2 rounded p-0 md:p-5 m-auto">
          <button
            onClick={handlePrevImage}
            className="text-5xl absolute left-10 top-[50%] transform -translate-y-1/2 text-black rounded-md focus:outline-none"
          >
            &#10094;
          </button>
          <img
            src={roomDetails.image_urls[currentImageIndex]}
            alt={`${roomDetails.name} ${currentImageIndex + 1}`}
            className="w-full object-cover md:h-[450px] h-[300px] rounded-lg"
          />
          <button
            onClick={handleNextImage}
            className="text-5xl absolute right-10 top-[50%] transform -translate-y-1/2 text-black rounded-md focus:outline-none"
          >
            &#10095;
          </button>
        </div>
        <div className="md:w-1/2 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">{`${hotelDetails.name} -> ${roomDetails.name}`}</h2>
          <p className="mb-4 mt-10 text-2xl font-bold">
            {`₹ ${roomDetails.price} `}
            <span className="text-lg font-normal">/ night</span>
          </p>
          <div className="mt-10">
            <div className="pb-4 flex flex-row items-center justify-between">
              <label>Check-in:</label>
              <input type="date" className="form-input p-1 border rounded" />
            </div>
            <div className="py-4 flex items-center justify-between">
              <label>Check-out:</label>
              <input type="date" className="form-input p-1 border rounded" />
            </div>
            {[...Array(2)].map((_, index) => (
              <div className="mt-8" key={index}>
                <label className="text-lg font-medium" htmlFor="">
                  Person {index + 1} :{" "}
                </label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-input p-1 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Age"
                    className="form-input p-1 border rounded"
                  />
                  <select className="form-select p-1 border rounded">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
            ))}
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-7 rounded">
              Book Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingComponent;
