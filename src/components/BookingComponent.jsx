import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeedbackModal from "./FeedbackModal";

function BookingComponent() {
  const { id, roomName } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [guestDetails, setGuestDetails] = useState([
    { name: "", age: "", gender: "Male" },
  ]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState("success");

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

  const handleInputChange = (index, field, value) => {
    const updatedGuests = guestDetails.map((guest, idx) =>
      idx === index ? { ...guest, [field]: value } : guest
    );
    setGuestDetails(updatedGuests);
  };

  const validateAndBookRoom = () => {
    if (
      !checkIn ||
      !checkOut ||
      guestDetails.some(
        (guest) =>
          !guest.name || !guest.age || guest.age > 110 || guest.age === 0
      )
    ) {
      setFeedbackMessage("Please fill in all fields correctly.");
      setFeedbackType("error");
      setShowFeedback(true);
      return;
    }

    setFeedbackMessage("Room booked successfully!");
    setFeedbackType("success");
    setShowFeedback(true);
  };

  const addPerson = () => {
    setGuestDetails([...guestDetails, { name: "", age: "", gender: "Male" }]);
  };

  const removePerson = (index) => {
    if (guestDetails.length > 1) {
      // Ensures there are always at least two guests
      const updatedGuests = guestDetails.filter((_, idx) => idx !== index);
      setGuestDetails(updatedGuests);
    }
  };

  if (!hotelDetails || !roomDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 shadow-2xl mt-3">
      <div className="flex gap-2 flex-col md:flex-row justify-between">
        <div className="relative top-0 md:w-1/2 rounded p-0 md:p-5 m-auto">
          <button
            onClick={() =>
              setCurrentImageIndex((prevIndex) =>
                prevIndex === 0
                  ? roomDetails.image_urls.length - 1
                  : prevIndex - 1
              )
            }
            className="text-5xl absolute left-10 top-[50%] transform -translate-y-1/2 text-black rounded-md focus:outline-none"
          >
            &#10094;
          </button>
          <img
            src={roomDetails.image_urls[currentImageIndex]}
            alt={`${roomDetails.name} view ${currentImageIndex + 1}`}
            className="w-full object-cover md:h-[450px] h-[300px] rounded-lg"
          />
          <button
            onClick={() =>
              setCurrentImageIndex((prevIndex) =>
                prevIndex === roomDetails.image_urls.length - 1
                  ? 0
                  : prevIndex + 1
              )
            }
            className="text-5xl absolute right-10 top-[50%] transform -translate-y-1/2 text-black rounded-md focus:outline-none"
          >
            &#10095;
          </button>
        </div>
        <div className="md:w-1/2 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">
            {hotelDetails.name} {roomDetails.name}
          </h2>
          <p className="mb-4 mt-10 text-2xl font-bold">
            {`₹ ${roomDetails.price} `}
            <span className="text-lg font-normal">/ night</span>
          </p>
          <div className="pb-4 flex flex-row items-center justify-between">
            <label>Check-in:</label>
            <input
              type="date"
              className="form-input p-1 border rounded"
              onChange={(e) => setCheckIn(e.target.value)}
              value={checkIn}
            />
          </div>
          <div className="py-4 flex items-center justify-between">
            <label>Check-out:</label>
            <input
              type="date"
              className="form-input p-1 border rounded"
              onChange={(e) => setCheckOut(e.target.value)}
              value={checkOut}
            />
          </div>
          {guestDetails.map((guest, index) => (
            <div className="mt-8" key={index}>
              <label className="text-lg font-medium" htmlFor="">
                Person {index + 1} :{" "}
              </label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-input p-1 border rounded"
                  value={guest.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Age"
                  className="form-input p-1 border rounded"
                  onChange={(e) =>
                    handleInputChange(index, "age", e.target.value)
                  }
                  required
                />
                <select
                  className="form-select p-1 border rounded"
                  value={guest.gender}
                  onChange={(e) =>
                    handleInputChange(index, "gender", e.target.value)
                  }
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
                {index > 0 && (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => removePerson(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            onClick={addPerson}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
          >
            Add Another Person
          </button>
          <button
            onClick={validateAndBookRoom}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Book Room
          </button>
          {showFeedback && (
            <FeedbackModal
              message={feedbackMessage}
              setShowFeedback={setShowFeedback}
              type={feedbackType}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingComponent;
